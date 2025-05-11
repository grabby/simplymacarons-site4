import { Resend } from 'resend';
import { format } from 'date-fns';
import { Order } from '../shared/schema';

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY environment variable is not set. Email functionality won't work.");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const BUSINESS_EMAIL = 'simplymacaronsyyj@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev'; // Default Resend sender - no verification needed

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  flavorId?: number;
  shellColor?: { name: string; value: string };
  fillingColor?: { name: string; value: string };
}

export interface EnhancedOrder extends Order {
  items: OrderItem[];
}

/**
 * Formats currency value to display as dollars.
 */
function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * Safely formats a date using date-fns.
 */
function formatOrderDate(dateValue: Date | string | null | undefined): string {
  if (!dateValue) {
    return new Date().toLocaleDateString(); // Fallback to current date if no value
  }
  
  try {
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    if (isNaN(date.getTime())) {
      return new Date().toLocaleDateString(); // Fallback to current date if invalid
    }
    return format(date, "PPP");
  } catch (error) {
    console.error("Error formatting order date:", error);
    return new Date().toLocaleDateString(); // Fallback to current date
  }
}

/**
 * Formats a pickup date and time string.
 */
function formatPickupDateTime(date: string | null | undefined, time: string | null | undefined): string {
  if (!date || !time) return "To be arranged via email";
  
  try {
    // Make sure the date is valid
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return "To be arranged via email";
    }
    
    const formattedDate = format(dateObj, "PPPP");
    
    // Convert from 24-hour to 12-hour format
    const hour = parseInt(time.split(':')[0], 10);
    const minute = time.split(':')[1] || "00";
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    
    return `${formattedDate} at ${formattedHour}:${minute} ${ampm}`;
  } catch (error) {
    console.error("Error formatting date/time:", error);
    return `${date} at ${time}`;
  }
}

/**
 * Generates HTML for the order items table.
 */
function generateItemsTable(order: EnhancedOrder): string {
  let tableRows = '';

  order.items.forEach(item => {
    const itemTotal = item.price * item.quantity;
    const itemName = item.name;
    
    let colorInfo = '';
    if (item.shellColor || item.fillingColor) {
      const shellInfo = item.shellColor ? `Shell: ${item.shellColor.name}` : '';
      const fillingInfo = item.fillingColor ? `Filling: ${item.fillingColor.name}` : '';
      
      if (shellInfo && fillingInfo) {
        colorInfo = `(${shellInfo} / ${fillingInfo})`;
      } else {
        colorInfo = `(${shellInfo}${fillingInfo})`;
      }
    }
    
    tableRows += `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${itemName} ${colorInfo}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(item.price)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(itemTotal)}</td>
      </tr>
    `;
  });

  return `
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <thead>
        <tr style="background-color: #f9f9f9;">
          <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee;">Item</th>
          <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">Quantity</th>
          <th style="padding: 10px; text-align: right; border-bottom: 2px solid #eee;">Price</th>
          <th style="padding: 10px; text-align: right; border-bottom: 2px solid #eee;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
      <tfoot>
        <tr style="font-weight: bold;">
          <td colspan="3" style="padding: 10px; text-align: right; border-top: 2px solid #eee;">Total</td>
          <td style="padding: 10px; text-align: right; border-top: 2px solid #eee;">${formatCurrency(order.total)}</td>
        </tr>
      </tfoot>
    </table>
  `;
}

/**
 * Generates an HTML email for customer order confirmation.
 */
function generateCustomerEmail(order: EnhancedOrder): string {
  const currentDate = new Date().toLocaleDateString();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Simply Macarons</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 25px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777; }
        h1 { color: #e91e63; }
        h2 { color: #333; font-size: 18px; margin-bottom: 10px; }
        .pickup-info { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px; }
        @media only screen and (max-width: 600px) {
          .container { padding: 10px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You For Your Order!</h1>
          <p>Hello ${order.firstName},</p>
          <p>We've received your order from Simply Macarons and are working on it with care.</p>
        </div>
        
        <div class="section">
          <h2>Order Summary</h2>
          <p><strong>Order Number:</strong> ${order.orderNumber}</p>
          <p><strong>Order Date:</strong> ${currentDate}</p>
          
          ${generateItemsTable(order)}
        </div>
        
        <div class="section">
          <h2>Pickup Details</h2>
          <div class="pickup-info">
            <p><strong>Simply Macarons</strong></p>
            <p>Victoria, BC 🇨🇦</p>
            <p>We will contact you via email to arrange a convenient pickup date and time.</p>
            <p>Payment due upon pickup via cash, e-transfer, or credit card</p>
          </div>
        </div>
        
        ${order.specialInstructions ? `
        <div class="section">
          <h2>Special Instructions</h2>
          <p>${order.specialInstructions}</p>
        </div>
        ` : ''}
        
        <div class="footer">
          <p>If you have any questions about your order, please contact us at ${BUSINESS_EMAIL}</p>
          <p>© ${new Date().getFullYear()} Simply Macarons. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates an HTML email notification for the business.
 */
function generateBusinessEmail(order: EnhancedOrder): string {
  const currentDate = new Date().toLocaleDateString();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order - Simply Macarons</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { margin-bottom: 30px; }
        .section { margin-bottom: 25px; }
        h1 { color: #e91e63; }
        h2 { color: #333; font-size: 18px; margin-bottom: 10px; }
        .customer-info { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; }
        @media only screen and (max-width: 600px) {
          .container { padding: 10px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Order Received</h1>
          <p>A new order has been placed on your website.</p>
        </div>
        
        <div class="section">
          <h2>Order Details</h2>
          <p><strong>Order Number:</strong> ${order.orderNumber}</p>
          <p><strong>Order Date:</strong> ${currentDate}</p>
          <p><strong>Pickup Date:</strong> To be arranged via email</p>
          
          <h2>Customer Information</h2>
          <div class="customer-info">
            <p><strong>Name:</strong> ${order.firstName} ${order.lastName}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
          </div>
        </div>
        
        <div class="section">
          <h2>Order Summary</h2>
          ${generateItemsTable(order)}
        </div>
        
        ${order.specialInstructions ? `
        <div class="section">
          <h2>Special Instructions</h2>
          <p>${order.specialInstructions}</p>
        </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;
}

/**
 * Sends order confirmation emails to both the customer and the business.
 */
export async function sendOrderEmails(order: EnhancedOrder): Promise<void> {
  try {
    // Only proceed if Resend API key is set
    if (!process.env.RESEND_API_KEY) {
      console.warn("Skipping email sending: RESEND_API_KEY is not set");
      return;
    }
    
    console.log(`Starting to send emails for order #${order.orderNumber} to ${order.email}`);
    
    // Add basic validation for email addresses
    if (!order.email || !order.email.includes('@')) {
      console.error(`Invalid customer email address: ${order.email}`);
      return;
    }

    // Send email to customer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: order.email,
      replyTo: BUSINESS_EMAIL,
      subject: `Your Simply Macarons Order #${order.orderNumber}`,
      html: generateCustomerEmail(order)
    });

    // Send notification to business
    await resend.emails.send({
      from: FROM_EMAIL,
      to: BUSINESS_EMAIL,
      replyTo: order.email,
      subject: `New Order #${order.orderNumber} - Simply Macarons`,
      html: generateBusinessEmail(order)
    });

    console.log(`Successfully sent order confirmation emails for order #${order.orderNumber}`);
  } catch (error) {
    console.error('Error sending order confirmation emails:', error);
  }
}
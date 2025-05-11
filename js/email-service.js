/**
 * Email service for sending order confirmations using Resend API
 * 
 * Important: This implementation will not work in a pure client-side environment
 * because it would expose the API key. In a production environment, you should:
 * 1. Create a serverless function (e.g., Netlify, Vercel, AWS Lambda) 
 * 2. Use that function to make the API call with the secret key
 * 3. Call that function from the client
 * 
 * This file is just a placeholder to show where email functionality would go.
 */

// This is just a placeholder to show how the email would be structured
async function sendOrderConfirmationEmail(order) {
  try {
    console.log("Sending order confirmation email...");
    console.log("Email would be sent to:", order.email);
    
    // In a real implementation, you would call your serverless function here
    // Example: 
    // const response = await fetch('https://your-serverless-function.com/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(order)
    // });
    
    // For now, just show a success message
    return {
      success: true,
      message: `Order confirmation would be sent to ${order.email}`
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Could not send email confirmation"
    };
  }
}

/**
 * Formats a HTML email for order confirmation
 */
function generateOrderConfirmationEmail(order) {
  const itemRows = order.items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">$${(item.price / 100).toFixed(2)}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">$${((item.price * item.quantity) / 100).toFixed(2)}</td>
    </tr>
  `).join('');

  const totalItems = order.items.reduce((total, item) => total + item.quantity, 0);
  const hasDiscount = totalItems >= 50;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Simply Macarons</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 20px; }
        .logo { max-width: 150px; }
        .order-info { margin-bottom: 20px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table th { background-color: #f8fafc; text-align: left; padding: 8px; }
        .discount { color: #10b981; font-weight: bold; text-align: center; margin: 10px 0; }
        .footer { text-align: center; font-size: 12px; color: #64748b; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
          <p>Thank you for your order!</p>
        </div>
        
        <div class="order-info">
          <p><strong>Order Number:</strong> ${order.orderNumber}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-CA')}</p>
          <p><strong>Name:</strong> ${order.firstName} ${order.lastName}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          <p><strong>Phone:</strong> ${order.phone}</p>
          
          ${order.deliveryOption === 'pickup' ? `
            <p><strong>Pickup Date:</strong> ${order.pickupDate || 'To be arranged'}</p>
            <p><strong>Pickup Time:</strong> ${order.pickupTime || 'To be arranged'}</p>
          ` : `
            <p><strong>Delivery Address:</strong> ${order.deliveryAddress}, ${order.deliveryCity}, ${order.deliveryPostalCode}</p>
          `}
          
          ${order.specialInstructions ? `
            <p><strong>Special Instructions:</strong> ${order.specialInstructions}</p>
          ` : ''}
        </div>
        
        <h2>Order Summary</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Item</th>
              <th style="text-align: center;">Quantity</th>
              <th style="text-align: right;">Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>
        
        ${hasDiscount ? `
          <div class="discount">
            10% discount applied for orders of 50+ macarons!
          </div>
        ` : ''}
        
        <p style="text-align: right; font-weight: bold; font-size: 18px;">
          Total: $${(order.total / 100).toFixed(2)}
        </p>
        
        <p>Payment will be collected upon pickup or delivery.</p>
        
        <div class="footer">
          <p>Simply Macarons<br>
          Victoria, BC 🇨🇦<br>
          <a href="mailto:simplymacaronsyyj@gmail.com">simplymacaronsyyj@gmail.com</a><br>
          <a href="https://simplymacarons.ca">simplymacarons.ca</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
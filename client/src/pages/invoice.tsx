import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@shared/schema";
import { useEffect } from "react";
import { Printer, ChevronLeft, CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";

// Enhanced Order type for TypeScript
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  flavorId?: number;
  shellColor?: { name: string; value: string };
  fillingColor?: { name: string; value: string };
}

interface EnhancedOrder extends Order {
  items: OrderItem[];
}

interface InvoiceProps {
  orderNumber?: string;
}

const Invoice = ({ orderNumber: propOrderNumber }: InvoiceProps) => {
  // Use either prop or param orderNumber
  const params = useParams();
  const orderNumber = propOrderNumber || params.orderNumber;
  
  // Fetch order details
  const { data: order, isLoading, error } = useQuery<EnhancedOrder>({
    queryKey: [`/api/orders/${orderNumber}`],
    enabled: !!orderNumber,
  });

  // SEO configuration
  const seoTitle = orderNumber 
    ? `Order #${orderNumber} | Simply Macarons` 
    : "Order Invoice | Simply Macarons";
  const seoDescription = "Thank you for your macaron order. Your invoice contains order details, payment information, and pickup/delivery instructions.";
  const seoKeywords = "macaron order invoice, macaron receipt, order confirmation, simply macarons order, victoria bakery order";

  // Format pickup date and time
  const formatPickupDateTime = (date: string | null | undefined, time: string | null | undefined) => {
    if (!date || !time) return "To be arranged via email";
    
    try {
      const formattedDate = format(new Date(date), "PPPP");
      
      // Convert from 24-hour to 12-hour format
      const hour = parseInt(time.split(':')[0], 10);
      const minute = time.split(':')[1] || "00";
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      
      return `${formattedDate} at ${formattedHour}:${minute} ${ampm}`;
    } catch (error) {
      console.error("Error formatting pickup date:", error);
      return "To be arranged via email";
    }
  };

  // Print invoice
  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--accent))]"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Order Not Found</h3>
              <p className="text-gray-600 mb-6">We couldn't find the order you're looking for. It may have been removed or the order number is incorrect.</p>
              <Link to="/flavors">
                <Button>Browse Flavors</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
      />
      <div className="max-w-3xl mx-auto">
        {/* Success message */}
        <div className="bg-green-50 p-6 rounded-xl text-center mb-8 print:hidden">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="font-display text-2xl font-bold">Order Confirmed!</h3>
          <p className="text-gray-600 mt-2">Your order has been received and is being processed.</p>
          <p className="text-gray-600 mt-2">An order confirmation has been sent to your email.</p>
        </div>
        
        {/* Invoice Card */}
        <Card className="mb-8 border-gray-200 shadow-md print:shadow-none">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-gray-100">
              <div>
                <h1 className="font-display text-2xl font-bold">Simply Macarons</h1>
                <p className="text-sm text-gray-500">Order Confirmation & Invoice</p>
              </div>
              <div className="mt-4 sm:mt-0 print:hidden">
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print Invoice
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-sm text-gray-500 mb-2">ORDER INFORMATION</h3>
                <p className="mb-1"><span className="font-medium">Order Number:</span> {order.orderNumber}</p>
                <p className="mb-1"><span className="font-medium">Order Date:</span> {format(new Date(order.createdAt), "PPP")}</p>
                <p><span className="font-medium">Pickup Date:</span> {formatPickupDateTime(order.pickupDate, order.pickupTime)}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm text-gray-500 mb-2">CUSTOMER INFORMATION</h3>
                <p className="mb-1"><span className="font-medium">Name:</span> {order.firstName} {order.lastName}</p>
                <p className="mb-1"><span className="font-medium">Email:</span> {order.email}</p>
                <p><span className="font-medium">Phone:</span> {order.phone}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold text-sm text-gray-500 mb-4">ORDER SUMMARY</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Item</th>
                      <th className="px-4 py-3 text-center font-medium">Quantity</th>
                      <th className="px-4 py-3 text-center font-medium">Price</th>
                      <th className="px-4 py-3 text-right font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-left">
                          <div>
                            {item.name}
                            {/* Display color info if available */}
                            {(item.shellColor || item.fillingColor) && (
                              <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
                                {item.shellColor && (
                                  <div className="flex items-center">
                                    <div 
                                      className="w-3 h-3 rounded-full mr-1"
                                      style={{ backgroundColor: item.shellColor.value }}
                                    ></div>
                                    <span>{item.shellColor.name}</span>
                                  </div>
                                )}
                                {item.shellColor && item.fillingColor && (
                                  <span>/</span>
                                )}
                                {item.fillingColor && (
                                  <div className="flex items-center">
                                    <div 
                                      className="w-3 h-3 rounded-full mr-1"
                                      style={{ backgroundColor: item.fillingColor.value }}
                                    ></div>
                                    <span>{item.fillingColor.name}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">{item.quantity}</td>
                        <td className="px-4 py-3 text-center">${(item.price / 100).toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">${((item.price * item.quantity) / 100).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 font-medium">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-right">Total</td>
                      <td className="px-4 py-3 text-right">${(order.total / 100).toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            {order.specialInstructions && (
              <div className="mb-8">
                <h3 className="font-semibold text-sm text-gray-500 mb-2">SPECIAL INSTRUCTIONS</h3>
                <p className="text-sm bg-gray-50 p-4 rounded-lg">{order.specialInstructions}</p>
              </div>
            )}
            
            <div className="bg-[hsl(var(--primary-light))] p-4 rounded-lg text-sm">
              <h3 className="font-medium mb-2">Pickup Information</h3>
              <p className="mb-1">Simply Macarons</p>
              <p className="mb-1">Victoria, BC 🇨🇦</p>
              <p className="mb-1">Payment due upon pickup via cash, e-transfer, or credit card</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="print:hidden text-center">
          <Link to="/flavors">
            <Button variant="outline" className="mx-2">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Flavors
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

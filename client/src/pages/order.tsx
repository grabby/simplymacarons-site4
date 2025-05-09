import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/lib/cartContext";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays, isAfter } from "date-fns";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createOrderSchema } from "@shared/schema";
import { Link } from "wouter";
import { CalendarIcon, Store } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Create a form schema based on the order schema
const formSchema = createOrderSchema;

const Order = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set page title
  useEffect(() => {
    document.title = "Order Macarons | Sweet Delights";
  }, []);

  // Create form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      pickupDate: "",
      pickupTime: "",
      specialInstructions: "",
      items: items
    },
  });

  // Calculate minimum pickup date (48 hours from now)
  const minPickupDate = addDays(new Date(), 2);

  // Update form values when cart items change
  useEffect(() => {
    // Transform cart items to match the orderItemSchema
    const orderItems = items.map(item => ({
      flavorId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    form.setValue("items", orderItems);
  }, [items, form]);

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Check if cart has minimum items
    if (getTotalItems() < 12) {
      toast({
        title: "Minimum order not met",
        description: "Please add at least 12 macarons to your order",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await apiRequest("POST", "/api/orders", data);
      const order = await response.json();
      
      // Clear the cart
      clearCart();
      
      // Redirect to invoice page
      setLocation(`/invoice/${order.orderNumber}`);
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "Order submission failed",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Place Your Order</h2>
          <p className="max-w-2xl mx-auto">Fill out the form below to place your order for pickup. We require a minimum of 48 hours notice for all orders.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h3 className="font-display text-xl font-semibold mb-4">Order Summary</h3>
              
              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--primary))]">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </div>
                  <p>Your cart is empty</p>
                  <Link to="/flavors" className="inline-block mt-3 text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-dark))] font-medium">
                    Browse our flavors
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between py-2 text-sm">
                      <div>
                        <span>{item.quantity} × {item.name}</span>
                      </div>
                      <div className="font-medium">${((item.price / 100) * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                  
                  <div className="pt-4 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total ({getTotalItems()} macarons)</span>
                      <span>${(getTotalPrice() / 100).toFixed(2)}</span>
                    </div>
                    
                    {getTotalItems() < 12 && (
                      <div className="mt-2 text-[hsl(var(--destructive))] text-xs">
                        You need at least {12 - getTotalItems()} more macarons to meet the minimum order requirement.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Pickup Information */}
            <div className="bg-[hsl(var(--primary-light))] p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Store className="text-[hsl(var(--accent))] mr-3 h-5 w-5" />
                <h3 className="font-display text-lg font-semibold">Pickup Information</h3>
              </div>
              <p className="text-sm mb-3">All orders are available for pickup at our bakery location:</p>
              <address className="not-italic text-sm mb-4">
                <strong>Sweet Delights Bakery</strong><br />
                123 Main Street<br />
                Macaron City, MC 12345<br />
                <a href="tel:5551234567" className="text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-dark))]">(555) 123-4567</a>
              </address>
              
              <div className="text-sm">
                <strong>Pickup Hours:</strong>
                <ul className="mt-1">
                  <li>Tuesday - Friday: 10am - 6pm</li>
                  <li>Saturday: 9am - 4pm</li>
                  <li>Sunday - Monday: Closed</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-display text-xl font-semibold mb-6">Customer Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pickupDate"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Pickup Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => {
                              if (date) {
                                field.onChange(format(date, "yyyy-MM-dd"));
                              }
                            }}
                            disabled={(date) => !isAfter(date, minPickupDate)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="mt-1 text-xs text-gray-500">Please select a date at least 48 hours from now.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pickupTime"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Pickup Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specialInstructions"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Special Instructions</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any special requests or instructions for your order" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting || getTotalItems() < 12}
                  className="w-full py-3 px-4 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white font-medium rounded-md transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting ? "Processing..." : "Complete Order"}
                </Button>
                
                {getTotalItems() < 12 && (
                  <p className="mt-2 text-center text-sm text-[hsl(var(--destructive))]">
                    Please add at least 12 macarons to complete your order
                  </p>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;

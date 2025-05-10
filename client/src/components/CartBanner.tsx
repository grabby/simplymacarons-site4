import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronUp, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';

const CartBanner = () => {
  const { items, getTotalPrice, getTotalItems } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  
  // Get current location to hide banner on order page
  const [location] = useLocation();
  
  // Format price to display in dollars
  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };
  
  // Calculate macarons needed for discount
  const totalMacarons = getTotalItems();
  const macaronsToDiscount = Math.max(0, 50 - totalMacarons);
  const qualifiesForDiscount = totalMacarons >= 50;
  
  // Hide banner when cart is empty or on order page
  if (totalItems === 0 || location === '/order') {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <AnimatePresence>
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white border-t border-gray-200 shadow-lg"
        >
          {/* Cart summary bar */}
          <div 
            className="container mx-auto px-4 py-3 flex items-center justify-between cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2 text-[hsl(var(--accent))]" />
              <span className="font-medium">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
              </span>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3">
                <span className="font-bold text-[hsl(var(--accent))]">
                  ${formatPrice(totalPrice)}
                </span>
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                className="p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronUp className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
          
          {/* Discount message */}
          {!qualifiesForDiscount && (
            <div className="bg-[hsl(var(--secondary-light))] py-2 px-4 text-center text-sm">
              Add {macaronsToDiscount} more macarons to get 10% off your order!
            </div>
          )}
          
          {/* Expanded cart details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="container mx-auto px-4 py-4">
                  <div className="mb-4 max-h-48 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">
                            {item.quantity} x ${formatPrice(item.price)}
                            {/* Display color info if available */}
                            {(item.shellColor || item.fillingColor) && (
                              <div className="flex items-center mt-1 space-x-2">
                                {item.shellColor && (
                                  <div className="flex items-center">
                                    <div 
                                      className="w-3 h-3 rounded-full mr-1"
                                      style={{ backgroundColor: item.shellColor.value }}
                                    ></div>
                                    <span className="text-xs">{item.shellColor.name}</span>
                                  </div>
                                )}
                                {item.shellColor && item.fillingColor && (
                                  <span className="text-xs">/</span>
                                )}
                                {item.fillingColor && (
                                  <div className="flex items-center">
                                    <div 
                                      className="w-3 h-3 rounded-full mr-1"
                                      style={{ backgroundColor: item.fillingColor.value }}
                                    ></div>
                                    <span className="text-xs">{item.fillingColor.name}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="font-medium">
                          ${formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Total and checkout button */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <div>
                      <div className="text-sm text-gray-500">Total</div>
                      <div className="font-bold text-lg">
                        ${formatPrice(totalPrice)}
                      </div>
                      {qualifiesForDiscount && (
                        <div className="text-xs text-green-600">
                          10% discount applied!
                        </div>
                      )}
                    </div>
                    <Link href="/order">
                      <Button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))]">
                        Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CartBanner;
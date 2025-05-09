import { useCart } from "@/lib/cartContext";
import { Link } from "wouter";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-50"
            onClick={onClose}
          />
          
          {/* Cart panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="p-4 bg-[hsl(var(--primary))] border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-display text-xl font-semibold">Your Cart</h2>
              <button onClick={onClose} className="text-[hsl(var(--mocha))] hover:text-[hsl(var(--accent))]">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-[hsl(var(--primary))]" />
                  <p>Your cart is empty</p>
                  <Link to="/flavors" onClick={onClose} className="inline-block mt-3 text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-dark))] font-medium">
                    Browse our flavors
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start py-3 border-b border-gray-100">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex items-center mt-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="text-xs bg-gray-200 hover:bg-gray-300 disabled:opacity-50 h-6 w-6 rounded-l-md flex items-center justify-center"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs bg-gray-100 h-6 px-2 flex items-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-xs bg-gray-200 hover:bg-gray-300 h-6 w-6 rounded-r-md flex items-center justify-center"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[hsl(var(--accent))] font-medium">
                          ${((item.price / 100) * item.quantity).toFixed(2)}
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-gray-500 hover:text-[hsl(var(--destructive))] mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 p-4 bg-[hsl(var(--cream))]">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-semibold">${(getTotalPrice() / 100).toFixed(2)}</span>
              </div>
              <Link 
                to="/order" 
                className={`block w-full py-3 px-4 ${
                  items.length < 12 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))]'
                } text-white text-center rounded-md transition-colors font-medium`}
                onClick={items.length >= 12 ? onClose : (e) => e.preventDefault()}
              >
                {items.length < 12 
                  ? `Add ${12 - items.length} more for minimum order` 
                  : 'Proceed to Order'}
              </Link>
              {items.length > 0 && items.length < 12 && (
                <p className="text-xs text-center mt-2 text-gray-500">
                  Minimum order is 12 macarons
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;

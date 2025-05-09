import { createContext, useContext, ReactNode } from "react";
import { useCartStore, type CartItem, type CartStore } from "./cart";

// Create the cart context
const CartContext = createContext<CartStore | null>(null);

// Create the cart provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext.Provider value={useCartStore()}>
      {children}
    </CartContext.Provider>
  );
};

// Create the cart hook
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
};

// Re-export types
export type { CartItem, CartStore };
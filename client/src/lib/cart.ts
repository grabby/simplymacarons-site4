import { create } from "zustand";

// Define the cart item type
export interface CartItem {
  id: number;
  name: string;
  price: number; // in cents
  quantity: number;
  shellColor?: { name: string; value: string };
  fillingColor?: { name: string; value: string };
}

// Define the cart store type
export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

// Create the cart store
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  // Add an item to the cart
  addItem: (item: CartItem) => {
    set((state) => {
      // Check if the item already exists in the cart
      const existingItem = state.items.find((i) => i.id === item.id);
      
      if (existingItem) {
        // Update the quantity
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      } else {
        // Add new item
        return {
          items: [...state.items, item],
        };
      }
    });
  },
  
  // Update the quantity of an item
  updateQuantity: (id: number, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },
  
  // Remove an item from the cart
  removeItem: (id: number) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  
  // Clear the cart
  clearCart: () => {
    set({ items: [] });
  },
  
  // Calculate the total price with discount for orders of 50+ macarons
  getTotalPrice: () => {
    const items = get().items;
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Apply 10% discount ($1.80 per macaron instead of $2.00) for orders of 50+
    if (totalQuantity >= 50) {
      return items.reduce(
        (total, item) => total + Math.floor(item.price * 0.9) * item.quantity,
        0
      );
    }
    
    // Regular price for orders under 50 macarons
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
  
  // Calculate the total number of items
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));

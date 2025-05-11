import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/lib/cartContext";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { InfoIcon, CheckIcon, Minus, Plus, Star, Heart } from "lucide-react";
import { Flavor } from "@shared/schema";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const Flavors = () => {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  
  // Helper functions to check if a flavor is in a special category
  const isTopFive = (flavor: Flavor) => flavor.tags?.includes("Top 5");
  const isKidFavourite = (flavor: Flavor) => flavor.tags?.includes("Kid Favourite");
  
  const seoTitle = "Delicious Macaron Flavours";
  const seoDescription = "Explore our premium macaron flavours crafted in Victoria, BC. From Earl Grey and Pistachio to Crème Brûlée and Fuzzy Peach, find your perfect treat. Minimum order of 12 per flavour.";
  const seoKeywords = "macaron flavours, earl grey macaron, pistachio macaron, crème brûlée macaron, fuzzy peach macaron, victoria macarons, custom macarons, premium macarons, top macaron flavours, kid favourite macarons";

  // Fetch flavors from the server
  const { data: flavors, isLoading, error } = useQuery<Flavor[]>({
    queryKey: ["/api/flavours"],
  });

  const handleQuantityChange = (flavorId: number, delta: number) => {
    setQuantities(prev => {
      // Get current quantity or default to minimum of 12
      const currentQty = prev[flavorId] || 12;
      
      // Calculate new quantity, ensuring it doesn't go below 12
      const newQty = Math.max(12, currentQty + delta);
      
      return {
        ...prev,
        [flavorId]: newQty
      };
    });
  };

  const handleAddToCart = (flavor: Flavor) => {
    // Get quantity for this flavor (default to 12 if not set)
    const quantity = quantities[flavor.id] || 12;
    
    // Fixed price of $24.00 (2400 cents) for a box of 12, then regular price for additional
    const boxPrice = 2400 / 12; // 200 cents per macaron
    
    addItem({
      id: flavor.id,
      name: `${flavor.name} Box`,
      price: boxPrice, 
      quantity
    });
    
    // Reset quantity after adding to cart
    setQuantities(prev => ({
      ...prev,
      [flavor.id]: 12
    }));
    
    toast({
      title: "Added to cart",
      description: `Added ${flavor.name} Box (${quantity} macarons) to your cart`,
      variant: "default",
      className: "bottom-0 right-0 absolute mb-20 mr-4",
    });
  };

  return (
    <section className="py-12 bg-[hsl(var(--primary-light))]">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        ogImage="/attached_assets/cremebrulee.png"
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Delicious Flavors</h2>
          <p className="max-w-2xl mx-auto">Explore our selection of handcrafted macarons, each made with premium ingredients and filled with delicious ganaches and buttercreams.</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md p-4 h-80 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-[hsl(var(--destructive))]">
              Error loading flavors. Please try again later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {flavors?.map((flavor) => (
              <motion.div
                key={flavor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img 
                    src={flavor.imageUrl} 
                    alt={`${flavor.name} Macarons`} 
                    className="w-full h-48 object-cover" 
                  />
                  
                  {/* Top 5 Ribbon */}
                  {isTopFive(flavor) && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-black font-bold py-1 px-3 transform rotate-0 shadow-md flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-current" /> 
                      <span className="text-xs">Top 5</span>
                    </div>
                  )}
                  
                  {/* Kid Favourite Badge */}
                  {isKidFavourite(flavor) && (
                    <div className="absolute top-0 left-0 bg-pink-500 text-white font-bold py-1 px-3 rounded-br-lg shadow-md flex items-center">
                      <Heart className="h-3 w-3 mr-1 fill-current" /> 
                      <span className="text-xs">Kid Favourite!</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl font-semibold">{flavor.name} Box</h3>
                    <span className="text-[hsl(var(--accent))] font-medium">$24.00</span>
                  </div>
                  <p className="text-sm mb-4">{flavor.description}</p>
                  
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span>Quantity: <strong>{quantities[flavor.id] || 12}</strong></span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="h-7 w-7 rounded-full p-0" 
                        onClick={() => handleQuantityChange(flavor.id, -1)}
                        disabled={(quantities[flavor.id] || 12) <= 12}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-7 w-7 rounded-full p-0"
                        onClick={() => handleQuantityChange(flavor.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-7 p-0 px-2 text-xs"
                        onClick={() => handleQuantityChange(flavor.id, 12)}
                      >
                        +12
                      </Button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCart(flavor)}
                    className="w-full py-2 px-4 bg-[hsl(var(--primary-light))] hover:bg-[hsl(var(--accent-dark))] hover:text-white text-[hsl(var(--accent))] font-medium rounded-md transition-colors"
                  >
                    Add Box to Cart ({quantities[flavor.id] || 12})
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <InfoIcon className="text-[hsl(var(--accent))] mr-3 h-5 w-5" />
            <h3 className="font-display text-xl font-semibold">Ordering Information</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <CheckIcon className="text-[hsl(var(--mint))] mt-1 mr-2 h-4 w-4" />
              <span>Minimum order of 12 macarons per flavor ($24.00 per dozen)</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-[hsl(var(--mint))] mt-1 mr-2 h-4 w-4" />
              <span>After the minimum, add more in increments of 1 or 12</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-[hsl(var(--mint))] mt-1 mr-2 h-4 w-4" />
              <span><strong>Discount:</strong> Orders of 50+ macarons are discounted to $1.80 each</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-[hsl(var(--mint))] mt-1 mr-2 h-4 w-4" />
              <span>Delivery available for an additional fee (starting at $20, varies by distance)</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-[hsl(var(--mint))] mt-1 mr-2 h-4 w-4" />
              <span>Orders must be placed at least 48 hours in advance</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Flavors;

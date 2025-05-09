import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/lib/cartContext";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { InfoIcon, CheckIcon } from "lucide-react";
import { Flavor } from "@shared/schema";
import { useEffect } from "react";

const Flavors = () => {
  const { toast } = useToast();
  const { addItem } = useCart();
  
  // Set page title
  useEffect(() => {
    document.title = "Macaron Flavors | Sweet Delights Macarons";
  }, []);

  // Fetch flavors from the server
  const { data: flavors, isLoading, error } = useQuery<Flavor[]>({
    queryKey: ["/api/flavors"],
  });

  const handleAddToCart = (flavor: Flavor) => {
    addItem({
      id: flavor.id,
      name: flavor.name,
      price: flavor.price,
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `Added ${flavor.name} to your cart`,
      variant: "default",
    });
  };

  return (
    <section className="py-12 bg-[hsl(var(--primary-light))]">
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
                <img 
                  src={flavor.imageUrl} 
                  alt={`${flavor.name} Macarons`} 
                  className="w-full h-48 object-cover" 
                />
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl font-semibold">{flavor.name}</h3>
                    <span className="text-[hsl(var(--accent))] font-medium">${(flavor.price / 100).toFixed(2)}</span>
                  </div>
                  <p className="text-sm mb-4">{flavor.description}</p>
                  <button 
                    onClick={() => handleAddToCart(flavor)}
                    className="w-full py-2 px-4 bg-[hsl(var(--cream))] hover:bg-[hsl(var(--primary))] text-[hsl(var(--accent))] font-medium rounded-md transition-colors"
                  >
                    Add to Cart
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
              <span>Minimum order of 12 macarons ($24.00)</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-[hsl(var(--mint))] mt-1 mr-2 h-4 w-4" />
              <span>Mix and match flavors to create your perfect dozen</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-[hsl(var(--mint))] mt-1 mr-2 h-4 w-4" />
              <span>Special packaging available for gift orders</span>
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

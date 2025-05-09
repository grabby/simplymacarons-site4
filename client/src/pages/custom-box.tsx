import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flavor } from "@shared/schema";
import { useCart } from "@/lib/cartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Minus, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const CustomBox = () => {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [selectedFlavors, setSelectedFlavors] = useState<{[id: number]: number}>({});
  const [boxName, setBoxName] = useState("My Custom Box");
  const [totalMacarons, setTotalMacarons] = useState(0);
  
  // Set page title
  useEffect(() => {
    document.title = "Design Your Own Box | Simply Macarons";
  }, []);

  // Fetch flavors
  const { data: flavors, isLoading, error } = useQuery<Flavor[]>({
    queryKey: ["/api/flavors"],
  });

  // Update total count when selections change
  useEffect(() => {
    const total = Object.values(selectedFlavors).reduce((sum, quantity) => sum + quantity, 0);
    setTotalMacarons(total);
  }, [selectedFlavors]);

  // Handle flavor selection
  const updateFlavorQuantity = (flavorId: number, change: number) => {
    setSelectedFlavors(prev => {
      const currentQuantity = prev[flavorId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      // If quantity is 0, remove flavor from selection
      if (newQuantity === 0) {
        const { [flavorId]: _, ...rest } = prev;
        return rest;
      }
      
      // Log the updated selection for debugging
      console.log("Updated flavor selection:", { ...prev, [flavorId]: newQuantity });
      
      return { ...prev, [flavorId]: newQuantity };
    });
  };

  // Add custom box to cart
  const addCustomBoxToCart = () => {
    if (totalMacarons < 12) {
      toast({
        title: "Minimum order not met",
        description: "Your custom box must contain at least 12 macarons",
        variant: "destructive"
      });
      return;
    }

    // Calculate price based on quantity (apply discount for 50+)
    const pricePerMacaron = totalMacarons >= 50 ? 180 : 200; // in cents
    const totalPrice = totalMacarons * pricePerMacaron;
    
    // Add to cart
    addItem({
      id: Date.now(), // use timestamp as unique ID for custom box
      name: boxName || "Custom Macaron Box",
      price: pricePerMacaron,
      quantity: totalMacarons
    });
    
    toast({
      title: "Box added to cart",
      description: `Your custom box with ${totalMacarons} macarons has been added to your cart.`,
      variant: "default"
    });

    // Reset selections
    setSelectedFlavors({});
    setBoxName("My Custom Box");
  };

  // Calculate if box qualifies for discount
  const qualifiesForDiscount = totalMacarons >= 50;
  const macaronsToDiscount = 50 - totalMacarons;

  // Format price with discount logic
  const formatPrice = () => {
    const basePrice = qualifiesForDiscount ? 1.80 : 2.00;
    return (basePrice * totalMacarons).toFixed(2);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Design Your Own Macaron Box</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Create a custom box with your favorite flavors. Mix and match to create your perfect assortment.
            Minimum 12 macarons total.
          </p>
        </div>

        {/* Box customization area */}
        <div className="mb-8">
          <div className="max-w-md mx-auto mb-6">
            <label htmlFor="boxName" className="block mb-2 font-medium">
              Name Your Box
            </label>
            <Input
              id="boxName"
              value={boxName}
              onChange={(e) => setBoxName(e.target.value)}
              placeholder="My Custom Box"
              className="w-full placeholder:text-gray-400"
            />
          </div>

          <div className="bg-[hsl(var(--secondary-light))] p-4 rounded-lg max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Box Summary</h3>
              <div className="text-sm font-medium">
                {totalMacarons} macarons selected
              </div>
            </div>
            
            <div className="text-sm mb-3">
              {Object.keys(selectedFlavors).length === 0 ? (
                <p className="text-gray-500 italic">No flavors selected yet</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {Object.entries(selectedFlavors).map(([flavorId, quantity]) => {
                    const flavor = flavors?.find(f => f.id === Number(flavorId));
                    return (
                      <li key={flavorId} className="py-1 flex justify-between">
                        <span>{flavor?.name}</span>
                        <span>x{quantity}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {totalMacarons > 0 && (
              <div className="mt-3 p-2 bg-white rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Price:</span>
                  <span className="font-bold">${formatPrice()}</span>
                </div>
                {!qualifiesForDiscount && (
                  <p className="text-xs text-gray-500 mt-1">
                    Add {macaronsToDiscount} more macarons for bulk discount!
                  </p>
                )}
                {qualifiesForDiscount && (
                  <div className="text-xs text-green-600 font-medium mt-1 flex items-center">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Bulk discount applied!
                  </div>
                )}
              </div>
            )}

            <div className="mt-4">
              <Button
                onClick={addCustomBoxToCart}
                disabled={totalMacarons < 12}
                className="w-full bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))]"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add Box to Cart
              </Button>
              
              {totalMacarons < 12 && totalMacarons > 0 && (
                <p className="text-sm text-red-500 mt-2">
                  Add {12 - totalMacarons} more macarons to meet minimum order
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Flavor selection */}
        <div className="mt-8">
          <h3 className="text-2xl font-display font-bold text-center mb-6">Select Your Flavors</h3>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--accent))]" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Error loading flavors. Please try again.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flavors?.map((flavor) => (
                <Card key={flavor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={flavor.imageUrl} 
                      alt={flavor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-lg">{flavor.name}</h4>
                      <span className="text-sm text-gray-500">
                        ${qualifiesForDiscount ? "1.80" : "2.00"} each
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {flavor.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!selectedFlavors[flavor.id]}
                          onClick={() => updateFlavorQuantity(flavor.id, -1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="font-medium">
                          {selectedFlavors[flavor.id] || 0}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateFlavorQuantity(flavor.id, 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => updateFlavorQuantity(flavor.id, 6)}
                      >
                        Add 6
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Call to action */}
        {totalMacarons >= 12 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 left-0 right-0 mx-auto max-w-md p-4 bg-[hsl(var(--accent))] text-white rounded-lg shadow-lg flex justify-between items-center z-50"
          >
            <div>
              <p className="font-medium">{totalMacarons} macarons selected</p>
              <p className="text-sm">${formatPrice()}</p>
            </div>
            <Button 
              onClick={addCustomBoxToCart}
              className="bg-white text-[hsl(var(--accent))] hover:bg-gray-100"
            >
              Add to Cart
            </Button>
          </motion.div>
        )}
        
        <div className="mt-16 text-center">
          <Link to="/flavors">
            <Button variant="outline" className="mx-auto">
              Back to All Flavors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomBox;
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Cookie, Truck, Heart } from "lucide-react";

const Home = () => {
  // Set page title 
  useEffect(() => {
    document.title = "Sweet Delights Macarons | Artisanal Handcrafted Macarons";
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-6 lg:pt-10">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden mb-12 shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80" 
              alt="Colorful macarons arranged beautifully" 
              className="w-full h-64 md:h-96 object-cover" 
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="p-6 md:p-12 max-w-xl"
              >
                <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                  Artisanal Macarons Made with Love
                </h1>
                <p className="text-white/90 mb-6 md:text-lg">
                  Handcrafted with premium ingredients for a taste of pure delight
                </p>
                <Link to="/flavors">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white py-3 px-8 rounded-full transition-colors font-medium"
                  >
                    Explore Flavors
                  </motion.a>
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-center p-6 rounded-xl bg-[hsl(var(--primary-light))]"
            >
              <div className="inline-block p-3 rounded-full bg-[hsl(var(--primary))] mb-4">
                <Cookie className="h-6 w-6 text-[hsl(var(--accent))]" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Premium Ingredients</h3>
              <p className="text-sm">We use only the finest organic ingredients to create our delicate macarons.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center p-6 rounded-xl bg-[hsl(var(--secondary-light))]"
            >
              <div className="inline-block p-3 rounded-full bg-[hsl(var(--secondary))] mb-4">
                <Truck className="h-6 w-6 text-[hsl(var(--accent))]" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Convenient Pickup</h3>
              <p className="text-sm">Choose your pickup time and collect your fresh macarons at your convenience.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center p-6 rounded-xl bg-[hsl(var(--primary-light))]"
            >
              <div className="inline-block p-3 rounded-full bg-[hsl(var(--primary))] mb-4">
                <Heart className="h-6 w-6 text-[hsl(var(--accent))]" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Made With Love</h3>
              <p className="text-sm">Each macaron is handcrafted with care and passion for the perfect bite.</p>
            </motion.div>
          </div>
          
          {/* About Preview */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <img 
                src="https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80" 
                alt="Our bakery interior with macaron displays" 
                className="rounded-2xl shadow-lg w-full h-auto" 
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h2 className="font-display text-3xl font-bold mb-4">Our Sweet Story</h2>
              <p className="mb-4">Welcome to Sweet Delights, where passion meets perfection in every macaron we create. Our journey began with a love for these delicate French confections and has blossomed into a boutique bakery dedicated to bringing joy through the perfect bite.</p>
              <p className="mb-6">Each macaron is handcrafted using traditional methods and premium ingredients, ensuring a delightful experience with every taste.</p>
              <Link to="/about">
                <a className="inline-flex items-center text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-dark))] font-medium">
                  Learn more about us
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import { Link } from "wouter";
import { motion } from "framer-motion";
import { Cookie, Truck, Heart } from "lucide-react";
import SEO from "@/components/SEO";

const Home = () => {
  const seoKeywords = "macarons victoria bc, artisanal macarons, handcrafted macarons, macaron delivery, custom macaron box, macaron flavors, french macarons, victoria bakery, premium macarons, earl grey macaron, wedding macarons";
  const seoDescription = "Hand-crafted, artisanal macarons made in Victoria, BC 🇨🇦. Simply Macarons offers premium flavors including Earl Grey, Pistachio, and Crème Brûlée, with custom boxes available for special occasions. Starting at $24 per dozen.";
  

  return (
    <div>
      <SEO 
        title="Handcrafted Macarons in Victoria BC" 
        description={seoDescription}
        keywords={seoKeywords}
        ogImage="https://simplymacarons.ca/assets/images/simply-macarons-colourful.jpg"
      />
      {/* Hero Section */}
      <section className="pt-6 lg:pt-10">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden mb-12 shadow-lg">
            <img 
              src="https://simplymacarons.ca/assets/images/simply-macarons-colourful.jpg" 
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
                    Order Macarons Now
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
          
          {/* Gallery Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold mb-2">Our Macaron Gallery</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Take a look at some of our beautiful creations, each handcrafted with care and attention to detail</p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <div className="relative overflow-hidden rounded-xl shadow-md group">
                <img 
                  src="https://simplymacarons.ca/assets/images/simply-macarons-lemon-buttercream.jpg" 
                  alt="Lemon buttercream macarons" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-display text-lg font-semibold">Lemon Buttercream</h3>
                    <p className="text-sm">Zesty lemon flavor with smooth buttercream filling</p>
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-md group">
                <img 
                  src="https://simplymacarons.ca/assets/images/simply-macarons-bumble-bees.jpg" 
                  alt="Bumble bee themed macarons" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-display text-lg font-semibold">Bumble Bee</h3>
                    <p className="text-sm">Honey-infused macarons with creative bee design</p>
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-md group">
                <img 
                  src="https://simplymacarons.ca/assets/images/simply-macarons-double-chocolate.jpg" 
                  alt="Double chocolate macarons" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-display text-lg font-semibold">Double Chocolate</h3>
                    <p className="text-sm">Rich chocolate shells with decadent chocolate ganache</p>
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-md group sm:col-span-2 lg:col-span-1">
                <img 
                  src="https://simplymacarons.ca/assets/images/simply-macarons-halloween-flavours.jpg" 
                  alt="Halloween themed macarons" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-display text-lg font-semibold">Seasonal Creations</h3>
                    <p className="text-sm">Special flavors and designs for holidays and occasions</p>
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-md group sm:col-span-2 lg:col-span-2">
                <img 
                  src="https://simplymacarons.ca/assets/images/simply-macarons-colourful.jpg" 
                  alt="Colorful macaron assortment" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-display text-lg font-semibold">Colorful Assortment</h3>
                    <p className="text-sm">A vibrant mix of our most popular flavors</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="text-center mt-8">
              <Link to="/flavors">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary-dark))] text-[hsl(var(--accent-dark))] font-medium rounded-full transition-colors"
                >
                  View All Flavors
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

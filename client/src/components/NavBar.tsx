import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cartContext";
import { ShoppingBag, Menu, X } from "lucide-react";
import Cart from "@/components/Cart";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { items } = useCart();

  // Calculate cart count
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll for sticky header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle cart sidebar
  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <header className={`sticky top-0 z-50 bg-[hsl(var(--navbar))] transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      {/* Small location bar */}
      <div className="bg-[hsl(var(--accent))] text-white text-xs py-1 text-center">
        <div className="container mx-auto px-4">
          <span>Hand-crafted macarons made in Victoria, BC 🇨🇦</span>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="https://raw.githubusercontent.com/grabby/simplymacarons/main/assets/images/simply-macarons-logo.jpg" 
            alt="Simply Macarons Logo"
            className="h-10 mr-2 rounded-md"
          />
          <span className="font-display text-2xl font-bold text-[hsl(var(--accent))]">Simply Macarons</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" 
            className={`font-medium hover:text-[hsl(var(--accent))] transition-colors ${location === '/' ? 'text-[hsl(var(--accent))]' : ''}`}>
            Home
          </Link>
          <Link to="/flavours" 
            className={`font-medium hover:text-[hsl(var(--accent))] transition-colors ${location === '/flavours' ? 'text-[hsl(var(--accent))]' : ''}`}>
            Flavours
          </Link>

          <Link to="/order" 
            className={`font-medium hover:text-[hsl(var(--accent))] transition-colors ${location === '/order' ? 'text-[hsl(var(--accent))]' : ''}`}>
            Order
          </Link>
          <Link to="/about" 
            className={`font-medium hover:text-[hsl(var(--accent))] transition-colors ${location === '/about' ? 'text-[hsl(var(--accent))]' : ''}`}>
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2" onClick={toggleCart}>
            <ShoppingBag className="h-5 w-5 text-[hsl(var(--accent))]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[hsl(var(--accent))] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          <button className="md:hidden text-[hsl(var(--accent))]" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="px-4 py-3 shadow-inner bg-[hsl(var(--navbar))] md:hidden">
          <div className="flex items-center mb-4">
            <img 
              src="https://raw.githubusercontent.com/grabby/simplymacarons/main/assets/images/simply-macarons-logo.jpg" 
              alt="Simply Macarons Logo"
              className="h-8 mr-2 rounded-md"
            />
          </div>
          <nav className="flex flex-col space-y-3">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} 
              className={`font-medium hover:text-[hsl(var(--accent))] transition-colors py-2 ${location === '/' ? 'text-[hsl(var(--accent))]' : ''}`}>
              Home
            </Link>
            <Link to="/flavours" onClick={() => setMobileMenuOpen(false)} 
              className={`font-medium hover:text-[hsl(var(--accent))] transition-colors py-2 ${location === '/flavours' ? 'text-[hsl(var(--accent))]' : ''}`}>
              Flavours
            </Link>

            <Link to="/order" onClick={() => setMobileMenuOpen(false)} 
              className={`font-medium hover:text-[hsl(var(--accent))] transition-colors py-2 ${location === '/order' ? 'text-[hsl(var(--accent))]' : ''}`}>
              Order
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} 
              className={`font-medium hover:text-[hsl(var(--accent))] transition-colors py-2 ${location === '/about' ? 'text-[hsl(var(--accent))]' : ''}`}>
              About
            </Link>
          </nav>
        </div>
      )}

      {/* Cart Sidebar */}
      <Cart isOpen={cartOpen} onClose={toggleCart} />
    </header>
  );
};

export default NavBar;

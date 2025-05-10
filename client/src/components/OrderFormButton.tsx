import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderFormButton = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to scroll to the form
  const scrollToForm = () => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check if form is in viewport
  useEffect(() => {
    const handleScroll = () => {
      const formElement = document.getElementById('order-form');
      if (formElement) {
        const rect = formElement.getBoundingClientRect();
        const isVisible = (
          rect.top <= (window.innerHeight / 2) &&
          rect.bottom >= 0
        );
        setIsFormVisible(isVisible);
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // If form is visible, don't show the button
  if (isFormVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <Button
            onClick={scrollToForm}
            className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white shadow-lg flex items-center gap-2 px-4 py-6"
          >
            <ClipboardList className="h-4 w-4" />
            <span>Go to Order Form</span>
            <ArrowDown className="h-4 w-4" />
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OrderFormButton;
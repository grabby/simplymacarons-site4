import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Flavours from "@/pages/flavours";
import Order from "@/pages/order";
import About from "@/pages/about";
import Invoice from "@/pages/invoice";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CartBanner from "@/components/CartBanner";
import { CartProvider } from "@/lib/cartContext";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { AnimatePresence, motion } from "framer-motion";

function Router() {
  // Scroll to top on route change
  useScrollTop();
  
  // Get the current location for animation
  const [location] = useLocation();
  
  // Animation variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -20
    }
  };
  
  // Animation settings
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };
  
  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
  
  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/">
          {(params) => (
            <PageWrapper>
              <Home />
            </PageWrapper>
          )}
        </Route>
        <Route path="/flavours">
          {(params) => (
            <PageWrapper>
              <Flavours />
            </PageWrapper>
          )}
        </Route>
        


        <Route path="/order">
          {(params) => (
            <PageWrapper>
              <Order />
            </PageWrapper>
          )}
        </Route>
        <Route path="/about">
          {(params) => (
            <PageWrapper>
              <About />
            </PageWrapper>
          )}
        </Route>
        <Route path="/invoice/:orderNumber">
          {(params) => (
            <PageWrapper>
              <Invoice orderNumber={params.orderNumber} />
            </PageWrapper>
          )}
        </Route>
        <Route>
          {() => (
            <PageWrapper>
              <NotFound />
            </PageWrapper>
          )}
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
            <CartBanner />
          </div>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

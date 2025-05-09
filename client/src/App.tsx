import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Flavors from "@/pages/flavors";
import Order from "@/pages/order";
import About from "@/pages/about";
import Invoice from "@/pages/invoice";
import CustomBox from "@/pages/custom-box";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cartContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/flavors" component={Flavors}/>
      <Route path="/custom-box" component={CustomBox}/>
      <Route path="/order" component={Order}/>
      <Route path="/about" component={About}/>
      <Route path="/invoice/:orderNumber" component={Invoice}/>
      <Route component={NotFound} />
    </Switch>
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
          </div>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

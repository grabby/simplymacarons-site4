import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--mocha))] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-xl font-semibold mb-4">Simply Macarons</h3>
            <p className="text-white/80 text-sm">Handcrafted artisanal macarons made with love and premium ingredients in Victoria, BC.</p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-white/80 text-sm">
              Victoria, BC, Canada<br />
              <a href="tel:2508880000" className="hover:text-[hsl(var(--primary-light))] transition-colors">(250) 888-0000</a><br />
              <a href="mailto:hello@simplymacarons.ca" className="hover:text-[hsl(var(--primary-light))] transition-colors">hello@simplymacarons.ca</a>
            </address>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Hours</h4>
            <ul className="text-white/80 text-sm">
              <li>Tuesday - Friday: 10am - 6pm</li>
              <li>Saturday: 9am - 4pm</li>
              <li>Sunday - Monday: Closed</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/60 text-sm">&copy; {new Date().getFullYear()} Simply Macarons. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram" className="text-white hover:text-[hsl(var(--primary-light))] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="text-white hover:text-[hsl(var(--primary-light))] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Pinterest" className="text-white hover:text-[hsl(var(--primary-light))] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

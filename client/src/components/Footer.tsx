import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--mocha))] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-xl font-semibold mb-4">Simply Macarons</h3>
            <p className="text-white/80 text-sm">Hand-crafted macarons made in Victoria, BC 🇨🇦</p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-white/80 text-sm">
              Victoria, BC, Canada<br />
              <a href="mailto:simplymacaronsyyj@gmail.com" className="hover:text-[hsl(var(--primary-light))] transition-colors">simplymacaronsyyj@gmail.com</a>
            </address>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Follow Us</h4>
            <div className="flex flex-col space-y-2 text-white/80 text-sm">
              <a href="https://www.instagram.com/simply_macarons_yyj/" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--primary-light))] transition-colors">Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61560268713262" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--primary-light))] transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/60 text-sm">&copy; {new Date().getFullYear()} Simply Macarons. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/simply_macarons_yyj/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-[hsl(var(--primary-light))] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61560268713262" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:text-[hsl(var(--primary-light))] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

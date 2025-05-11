import { useEffect } from "react";
import SEO from "@/components/SEO";

const About = () => {
  // SEO configuration
  const seoTitle = "About Simply Macarons - Victoria BC";
  const seoDescription = "Simply Macarons is a home-based artisanal macaron bakery in Victoria, BC. Learn about our passion for creating perfect handcrafted macarons with premium ingredients and traditional techniques.";
  const seoKeywords = "about simply macarons, victoria macaron bakery, handcrafted macarons, artisanal macarons, local bakery victoria bc, macaron maker, macaron process";

  return (
    <section className="py-12 bg-[hsl(var(--primary-light))]">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">About Simply Macarons</h2>
          <p className="max-w-2xl mx-auto">Handcrafted with care in Victoria, BC 🇨🇦</p>
        </div>
        
        <div className="mb-12 text-center">
          <div className="max-w-md mx-auto px-4">
            <img 
              src="https://simplymacarons.ca/assets/images/simply-macarons-colourful.jpg" 
              alt="Assorted colorful macarons" 
              className="rounded-xl shadow-lg w-full h-auto object-cover" 
            />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-display text-2xl font-semibold mb-6 text-center">FAQ</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-display text-lg font-semibold mb-2">How far in advance should I place my order?</h4>
              <p className="text-sm">We require a minimum of 48 hours notice for all orders to ensure we can craft your macarons with the care and attention they deserve.</p>
            </div>
            
            <div>
              <h4 className="font-display text-lg font-semibold mb-2">What's your minimum order quantity?</h4>
              <p className="text-sm">Our minimum order is 12 macarons, but you can mix and match flavors to create your perfect assortment.</p>
            </div>
            
            <div>
              <h4 className="font-display text-lg font-semibold mb-2">Do you offer delivery?</h4>
              <p className="text-sm">Yes, we offer local delivery in Victoria for an additional fee starting at $20, which varies by distance.</p>
            </div>
            
            <div>
              <h4 className="font-display text-lg font-semibold mb-2">How should I store my macarons?</h4>
              <p className="text-sm">Macarons are best enjoyed within 3-5 days of purchase. Store them in an airtight container in the refrigerator, and bring to room temperature before enjoying for the best flavor and texture.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

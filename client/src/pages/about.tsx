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
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">About Sweet Delights</h2>
          <p className="max-w-2xl mx-auto">Our story, our passion, and our commitment to creating the perfect macaron experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <h3 className="font-display text-2xl font-semibold mb-4">Our Sweet Story</h3>
            <p className="mb-4">Sweet Delights began as a labor of love in a small kitchen, with a passion for creating the perfect macaron. What started as a hobby quickly blossomed into a thriving local business as word spread about our delicate, flavorful treats.</p>
            <p>Today, we continue to handcraft each macaron with the same care and attention to detail, using only the finest ingredients and traditional techniques to ensure that every bite is a moment of pure joy.</p>
          </div>
          
          <div>
            <img 
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
              alt="Our bakery interior" 
              className="rounded-xl shadow-lg w-full h-auto" 
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
              <p className="text-sm">Currently, we offer pickup only at our bakery location. We're working on adding delivery options in the future.</p>
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

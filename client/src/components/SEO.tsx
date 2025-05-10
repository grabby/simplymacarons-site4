import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const SEO = ({ 
  title = '', 
  description = '',
  keywords = '',
  ogImage = '/attached_assets/cremebrulee.png'
}: SEOProps) => {
  const [location] = useLocation();
  
  // Base site name
  const siteName = 'Simply Macarons';
  
  // Default values
  const defaultTitle = 'Handcrafted Macarons in Victoria BC 🇨🇦';
  const defaultDescription = 'Hand-crafted, artisanal macarons made in Victoria, BC with premium ingredients. Order custom boxes with your favorite flavors, starting at $24 per dozen.';
  const defaultKeywords = 'macarons victoria bc, artisanal macarons, handcrafted macarons, macaron delivery';
  
  // Full title with site name
  const fullTitle = title 
    ? `${title} | ${siteName}` 
    : `${siteName} | ${defaultTitle}`;
  
  // Update document title and meta tags
  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || defaultDescription);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || defaultKeywords);
    }
    
    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }
    
    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description || defaultDescription);
    }
    
    // Update Open Graph URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://simplymacarons.ca${location}`);
    }
    
    // Update Open Graph image if provided
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta && ogImage) {
      ogImageMeta.setAttribute('content', ogImage);
    }
    
    // Update Twitter card
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    
    if (twitterTitle) twitterTitle.setAttribute('content', fullTitle);
    if (twitterDesc) twitterDesc.setAttribute('content', description || defaultDescription);
    if (twitterUrl) twitterUrl.setAttribute('content', `https://simplymacarons.ca${location}`);
    if (twitterImage && ogImage) twitterImage.setAttribute('content', ogImage);
    
    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://simplymacarons.ca${location}`);
    }
  }, [fullTitle, description, keywords, location, ogImage]);
  
  // This component doesn't render anything
  return null;
};

export default SEO;
import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook to automatically scroll to top of the page when location changes.
 */
export function useScrollTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
}
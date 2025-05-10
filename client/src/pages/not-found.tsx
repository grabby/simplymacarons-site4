import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import SEO from "@/components/SEO";

export default function NotFound() {
  const seoTitle = "Page Not Found | Simply Macarons";
  const seoDescription = "Sorry, the page you're looking for does not exist. Please check the URL or navigate back to our homepage.";
  const seoKeywords = "page not found, 404 error, simply macarons, macaron website";
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
      />
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

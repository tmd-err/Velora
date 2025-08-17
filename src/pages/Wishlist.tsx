import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { mockFragrances } from "@/data/fragrances";

export default function Wishlist() {
  // Mock wishlist - in a real app, this would be stored in state management or localStorage
  const wishlistItems = mockFragrances.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Heart className="h-8 w-8 text-destructive" />
            My Wishlist
          </h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((fragrance) => (
              <ProductCard key={fragrance.id} fragrance={fragrance} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start browsing our collection and save your favorite fragrances to your wishlist
            </p>
            <Button asChild className="btn-luxury">
              <Link to="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Discover Fragrances
              </Link>
            </Button>
          </div>
        )}

        {/* Recommendations */}
        {wishlistItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockFragrances.slice(3, 7).map((fragrance) => (
                <ProductCard key={fragrance.id} fragrance={fragrance} />
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
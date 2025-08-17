import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/StarRating";
import { Fragrance } from "@/data/fragrances";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  fragrance: Fragrance;
}

export function ProductCard({ fragrance }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to Wishlist",
      description: `${fragrance.name} has been added to your wishlist.`,
    });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Quick Add",
      description: "Please visit the product page to select size and add to cart.",
      variant: "default",
    });
  };

  const basePrice = fragrance.sizes[0]?.price || fragrance.price;
  const hasDiscount = fragrance.originalPrice && fragrance.originalPrice > basePrice;

  return (
    <Link to={`/products/${fragrance.id}`}>
      <Card className="product-card group cursor-pointer">
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-[4/5] bg-muted">
            <img
              src={fragrance.images[0] || '/api/placeholder/300/375'}
              alt={fragrance.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {fragrance.bestSeller && (
              <Badge variant="secondary" className="text-xs bg-accent text-accent-foreground">
                Best Seller
              </Badge>
            )}
            {fragrance.fragranceOfWeek && (
              <Badge variant="default" className="text-xs bg-primary text-primary-foreground">
                Fragrance of Week
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="destructive" className="text-xs">
                Sale
              </Badge>
            )}
            {!fragrance.inStock && (
              <Badge variant="outline" className="text-xs bg-background/90">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 rounded-full bg-background/80 hover:bg-background"
                onClick={handleAddToWishlist}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 rounded-full bg-background/80 hover:bg-background"
                onClick={handleQuickAdd}
                disabled={!fragrance.inStock}
              >
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>

        <CardContent className="p-4">
          {/* Brand */}
          <p className="text-sm text-muted-foreground mb-1">{fragrance.brand}</p>
          
          {/* Name */}
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {fragrance.name}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {fragrance.description}
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={fragrance.rating} size="sm" />
            <span className="text-xs text-muted-foreground">
              ({fragrance.reviewCount})
            </span>
          </div>
          
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="text-xs capitalize">
              {fragrance.category === 'mens' ? "Men's" : 
               fragrance.category === 'womens' ? "Women's" : "Unisex"}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {fragrance.type.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Badge>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                ${basePrice}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  ${fragrance.originalPrice}
                </span>
              )}
            </div>
            
            {fragrance.sizes.length > 1 && (
              <span className="text-xs text-muted-foreground">
                from {fragrance.sizes[0].size}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
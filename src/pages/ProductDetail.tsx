import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StarRating } from "@/components/StarRating";
import { getFragranceById } from "@/data/fragrances";
import { addToCart } from "@/lib/cart";
import { Heart, ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { toast } = useToast();

  const fragrance = id ? getFragranceById(id) : null;

  if (!fragrance) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Fragrance not found</h1>
          <Link to="/products">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    const sizeOption = fragrance.sizes.find(s => s.size === selectedSize);
    if (!sizeOption) return;

    addToCart({
      fragranceId: fragrance.id,
      name: fragrance.name,
      brand: fragrance.brand,
      price: sizeOption.price,
      size: selectedSize,
      quantity,
      image: fragrance.images[0],
    });

    toast({
      title: "Added to Cart",
      description: `${fragrance.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${fragrance.name} has been added to your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Fragrances</Link>
          <span>/</span>
          <span className="text-foreground">{fragrance.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted">
              <img
                src={fragrance.images[selectedImageIndex] || '/api/placeholder/500/600'}
                alt={fragrance.name}
                className="w-full h-full object-cover"
              />
            </div>
            {fragrance.images.length > 1 && (
              <div className="flex space-x-2">
                {fragrance.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square w-20 rounded-md overflow-hidden border-2 transition-colors ${
                      index === selectedImageIndex
                        ? "border-primary"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <img
                      src={image || '/api/placeholder/80/80'}
                      alt={`${fragrance.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{fragrance.brand}</p>
              <h1 className="text-3xl font-bold text-foreground mb-2">{fragrance.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <StarRating rating={fragrance.rating} />
                <span className="text-sm text-muted-foreground">
                  ({fragrance.reviewCount} reviews)
                </span>
                <Badge variant="secondary" className="capitalize">
                  {fragrance.category === 'mens' ? "Men's" : fragrance.category === 'womens' ? "Women's" : "Unisex"}
                </Badge>
              </div>
              <p className="text-muted-foreground text-lg">{fragrance.description}</p>
            </div>

            {/* Price and Size Selection */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Size & Price
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {fragrance.sizes.map((size) => (
                      <SelectItem key={size.size} value={size.size}>
                        {size.size} - ${size.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedSize && (
                <div className="text-3xl font-bold text-primary">
                  ${fragrance.sizes.find(s => s.size === selectedSize)?.price}
                  {fragrance.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through ml-2">
                      ${fragrance.originalPrice}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Quantity
                </label>
                <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 btn-luxury"
                  disabled={!selectedSize || !fragrance.inStock}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {fragrance.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleAddToWishlist}
                  className="px-6"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Authentic</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-16 space-y-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {fragrance.longDescription}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Fragrance Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2 text-accent">Top Notes</h4>
                  <ul className="space-y-1">
                    {fragrance.notes.top.map((note, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{note}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-accent">Heart Notes</h4>
                  <ul className="space-y-1">
                    {fragrance.notes.middle.map((note, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{note}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-accent">Base Notes</h4>
                  <ul className="space-y-1">
                    {fragrance.notes.base.map((note, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
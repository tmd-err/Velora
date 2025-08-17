import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Award, Crown } from "lucide-react";
import { mockFragrances, getFeaturedFragrances, getBestSellers, getFragranceOfWeek } from "@/data/fragrances";
import { ScrollAnimation } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/hero-fragrance.jpg";
import midnightnoir from "@/assets/midnightnoir.webp";
const Index = () => {
  const featuredFragrances = getFeaturedFragrances();
  const bestSellers = getBestSellers();
  const fragranceOfWeek = getFragranceOfWeek();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 mr-1" />
              Luxury Fragrances Collection
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shimmer bg-gradient-hero bg-clip-text text-transparent">
              Discover Your
              <br />
              Signature Scent
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our curated collection of the world's finest fragrances, 
              from timeless classics to modern masterpieces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-luxury text-lg px-8 py-6">
                <Link to="/products">
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-6 bg-background/50 backdrop-blur-sm">
                <Link to={fragranceOfWeek ? `/products/${fragranceOfWeek.id}` : "/products"}>
                  Fragrance of the Week
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fragrance of the Week */}
      {fragranceOfWeek && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation animation="fadeUp" className="text-center mb-12">
              <Badge variant="default" className="mb-4">
                <Crown className="h-4 w-4 mr-2" />
                Fragrance of the Week
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {fragranceOfWeek.name}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {fragranceOfWeek.longDescription}
              </p>
            </ScrollAnimation>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollAnimation animation="slideLeft" delay={200}>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-luxury">
                  <img
                    src={fragranceOfWeek.images[0] || '/api/placeholder/600/600'}
                    alt={fragranceOfWeek.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation animation="slideRight" delay={400}>
                <div className="space-y-6">
                  <div>
                    <p className="text-accent font-medium mb-2">{fragranceOfWeek.brand}</p>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {fragranceOfWeek.name}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {fragranceOfWeek.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <h4 className="font-semibold text-accent mb-2">Top Notes</h4>
                      <p className="text-sm text-muted-foreground">
                        {fragranceOfWeek.notes.top.join(', ')}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent mb-2">Heart Notes</h4>
                      <p className="text-sm text-muted-foreground">
                        {fragranceOfWeek.notes.middle.join(', ')}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent mb-2">Base Notes</h4>
                      <p className="text-sm text-muted-foreground">
                        {fragranceOfWeek.notes.base.join(', ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-primary">
                      ${fragranceOfWeek.price}
                    </span>
                    <Button asChild className="btn-luxury">
                      <Link to={`/products/${fragranceOfWeek.id}`}>
                        Discover More
                      </Link>
                    </Button>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeUp">
            <div className="flex items-center justify-between mb-12">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Award className="h-4 w-4 mr-2" />
                  Customer Favorites
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Best Sellers
                </h2>
                <p className="text-muted-foreground mt-2">
                  The most loved fragrances by our customers
                </p>
              </div>
              <Button asChild variant="outline">
                <Link to="/products?sort=bestselling">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((fragrance, index) => (
              <ScrollAnimation 
                key={fragrance.id}
                animation="scaleUp"
                delay={index * 100}
              >
                <ProductCard fragrance={fragrance} />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeUp">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Curated Selection
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Collection
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Handpicked fragrances that represent the pinnacle of perfumery artistry
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFragrances.map((fragrance, index) => (
              <ScrollAnimation
                key={fragrance.id}
                animation="fadeUp"
                delay={index * 150}
              >
                <ProductCard fragrance={fragrance} />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Shop by Category
              </h2>
              <p className="text-lg text-muted-foreground">
                Find the perfect fragrance for every occasion and personality
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Men's Collection", href: "/products?category=mens", description: "Bold and sophisticated scents" },
              { name: "Women's Collection", href: "/products?category=womens", description: "Elegant and captivating fragrances" },
              { name: "Unisex Collection", href: "/products?category=unisex", description: "Modern scents for everyone" }
            ].map((category, index) => (
              <ScrollAnimation
                key={category.name}
                animation="scaleUp"
                delay={index * 200}
              >
                <Card className="product-card group cursor-pointer">
                  <Link to={category.href}>
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 p-8 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeUp">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Find Your Perfect Scent?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our complete collection and discover fragrances that tell your unique story
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation animation="scaleUp" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-luxury text-lg px-8 py-6">
                <Link to="/products">
                  Explore All Fragrances
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-6">
                <Link to="/signup">
                  Create Account
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

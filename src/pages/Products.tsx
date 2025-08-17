import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { mockFragrances, Fragrance } from "@/data/fragrances";
import { Filter, SlidersHorizontal } from "lucide-react";

export default function Products() {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("name");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "";

  // Initialize filters based on URL params
  useMemo(() => {
    if (categoryFilter) {
      setSelectedCategories([categoryFilter]);
    }
  }, [categoryFilter]);

  const filteredFragrances = useMemo(() => {
    let filtered = mockFragrances;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(fragrance =>
        fragrance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fragrance.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fragrance.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(fragrance =>
        selectedCategories.includes(fragrance.category)
      );
    }

    // Type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(fragrance =>
        selectedTypes.includes(fragrance.type)
      );
    }

    // Price filter
    filtered = filtered.filter(fragrance =>
      fragrance.price >= priceRange[0] && fragrance.price <= priceRange[1]
    );

    // Sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [searchQuery, selectedCategories, selectedTypes, priceRange, sortBy]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked
        ? [...prev, category]
        : prev.filter(c => c !== category)
    );
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    setSelectedTypes(prev =>
      checked
        ? [...prev, type]
        : prev.filter(t => t !== type)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {searchQuery ? `Search results for "${searchQuery}"` : "All Fragrances"}
          </h1>
          <p className="text-muted-foreground">
            Discover our collection of {filteredFragrances.length} exquisite fragrances
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Category</h4>
                {["mens", "womens", "unisex"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked as boolean)
                      }
                    />
                    <label htmlFor={category} className="text-sm text-muted-foreground capitalize">
                      {category === "mens" ? "Men's" : category === "womens" ? "Women's" : "Unisex"}
                    </label>
                  </div>
                ))}
              </div>

              {/* Type Filter */}
              <div className="space-y-3 pt-4">
                <h4 className="font-medium text-foreground">Type</h4>
                {["eau-de-parfum", "eau-de-toilette", "cologne", "perfume-oil"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={(checked) =>
                        handleTypeChange(type, checked as boolean)
                      }
                    />
                    <label htmlFor={type} className="text-sm text-muted-foreground">
                      {type.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </label>
                  </div>
                ))}
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedTypes([]);
                  setPriceRange([0, 500]);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredFragrances.length} results
              </p>
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredFragrances.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFragrances.map((fragrance) => (
                  <ProductCard key={fragrance.id} fragrance={fragrance} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">No fragrances found</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedTypes([]);
                    setPriceRange([0, 500]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
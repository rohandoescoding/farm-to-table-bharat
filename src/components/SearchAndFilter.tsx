
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  categories: string[];
  locations: string[];
  initialCategory?: string;
}

interface FilterOptions {
  category: string;
  location: string;
  priceRange: [number, number];
  sortBy: string;
}

const SearchAndFilter = ({ onSearch, onFilter, categories, locations, initialCategory }: SearchAndFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: initialCategory || "",
    location: "",
    priceRange: [0, 1000],
    sortBy: "newest"
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Update filters when initialCategory changes and trigger the filter callback
  useEffect(() => {
    if (initialCategory) {
      const newFilters = { ...filters, category: initialCategory };
      setFilters(newFilters);
      onFilter(newFilters);
      updateActiveFilters(newFilters);
    }
  }, [initialCategory]);

  // Initial filter call on mount to ensure proper filtering
  useEffect(() => {
    onFilter(filters);
    updateActiveFilters(filters);
  }, []);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
    updateActiveFilters(newFilters);
  };

  const updateActiveFilters = (currentFilters: FilterOptions) => {
    const active: string[] = [];
    if (currentFilters.category) active.push(`Category: ${currentFilters.category}`);
    if (currentFilters.location) active.push(`Location: ${currentFilters.location}`);
    if (currentFilters.priceRange[0] > 0 || currentFilters.priceRange[1] < 1000) {
      active.push(`Price: ₹${currentFilters.priceRange[0]} - ₹${currentFilters.priceRange[1]}`);
    }
    if (currentFilters.sortBy !== "newest") active.push(`Sort: ${currentFilters.sortBy}`);
    setActiveFilters(active);
  };

  const clearFilter = (filterText: string) => {
    const newFilters = { ...filters };
    if (filterText.startsWith("Category:")) newFilters.category = "";
    if (filterText.startsWith("Location:")) newFilters.location = "";
    if (filterText.startsWith("Price:")) newFilters.priceRange = [0, 1000];
    if (filterText.startsWith("Sort:")) newFilters.sortBy = "newest";
    
    setFilters(newFilters);
    onFilter(newFilters);
    updateActiveFilters(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      category: "",
      location: "",
      priceRange: [0, 1000] as [number, number],
      sortBy: "newest"
    };
    setFilters(defaultFilters);
    onFilter(defaultFilters);
    setActiveFilters([]);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products, farmers, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => clearFilter(filter)}
              />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => handleFilterChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                </label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange("priceRange", value as [number, number])}
                  max={1000}
                  min={0}
                  step={10}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchAndFilter;

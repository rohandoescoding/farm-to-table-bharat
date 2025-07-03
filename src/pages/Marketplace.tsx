import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import SearchAndFilter from "@/components/SearchAndFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FilterOptions {
  category: string;
  location: string;
  priceRange: [number, number];
  sortBy: string;
}

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: "",
    location: "",
    priceRange: [0, 1000],
    sortBy: "newest"
  });
  const [initialCategory, setInitialCategory] = useState<string>("");

  // Initialize category filter from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setInitialCategory(categoryParam);
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [searchParams]);

  // Mock data with properly categorized products
  const categories = ["Vegetables", "Fruits", "Grains", "Herbs", "Seeds", "Dairy"];
  const locations = ["Maharashtra", "Karnataka", "Punjab", "Tamil Nadu", "Gujarat", "Rajasthan"];
  
  const products = [
    // Vegetables - properly categorized
    {
      id: "1",
      name: "Organic Tomatoes",
      price: 45,
      unit: "kg",
      quantity: 150,
      category: "Vegetables",
      description: "Fresh organic tomatoes grown without pesticides",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
      farmer: {
        name: "Green Valley Farm",
        location: "Maharashtra",
        rating: 4.8
      },
      harvestDate: "2024-01-15",
      organic: true
    },
    {
      id: "2",
      name: "Fresh Spinach",
      price: 30,
      unit: "kg",
      quantity: 80,
      category: "Vegetables",
      description: "Crisp and fresh spinach leaves packed with nutrients",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f8dfd?w=400",
      farmer: {
        name: "Leafy Greens Co",
        location: "Karnataka",
        rating: 4.6
      },
      harvestDate: "2024-01-14",
      organic: false
    },
    {
      id: "3",
      name: "Purple Cabbage",
      price: 40,
      unit: "kg",
      quantity: 60,
      category: "Vegetables",
      description: "Nutrient-rich purple cabbage perfect for salads",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
      farmer: {
        name: "Rainbow Farms",
        location: "Punjab",
        rating: 4.7
      },
      harvestDate: "2024-01-13",
      organic: true
    },
    {
      id: "14",
      name: "Fresh Carrots",
      price: 35,
      unit: "kg",
      quantity: 90,
      category: "Vegetables",
      description: "Crunchy orange carrots rich in beta-carotene",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
      farmer: {
        name: "Root Vegetables Co",
        location: "Punjab",
        rating: 4.6
      },
      harvestDate: "2024-01-13",
      organic: true
    },
    {
      id: "15",
      name: "Red Onions",
      price: 25,
      unit: "kg",
      quantity: 180,
      category: "Vegetables",
      description: "Fresh red onions with strong flavor",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
      farmer: {
        name: "Spice Garden",
        location: "Karnataka",
        rating: 4.5
      },
      harvestDate: "2024-01-11",
      organic: false
    },
    
    // Fruits - properly categorized
    {
      id: "4",
      name: "Organic Apples",
      price: 120,
      unit: "kg",
      quantity: 200,
      category: "Fruits",
      description: "Sweet and juicy organic apples from hill stations",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
      farmer: {
        name: "Hill Station Orchards",
        location: "Punjab",
        rating: 4.9
      },
      harvestDate: "2024-01-10",
      organic: true
    },
    {
      id: "5",
      name: "Fresh Mangoes",
      price: 180,
      unit: "kg",
      quantity: 100,
      category: "Fruits",
      description: "Sweet Alphonso mangoes directly from orchards",
      image: "https://images.unsplash.com/photo-1553279546-cacc14f1a4b5?w=400",
      farmer: {
        name: "Tropical Gardens",
        location: "Maharashtra",
        rating: 4.8
      },
      harvestDate: "2024-01-12",
      organic: false
    },
    {
      id: "6",
      name: "Dragon Fruit",
      price: 150,
      unit: "kg",
      quantity: 25,
      category: "Fruits",
      description: "Exotic dragon fruit rich in antioxidants",
      image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400",
      farmer: {
        name: "Exotic Fruits Farm",
        location: "Karnataka",
        rating: 4.9
      },
      harvestDate: "2024-01-16",
      organic: true
    },
    {
      id: "16",
      name: "Fresh Bananas",
      price: 60,
      unit: "dozen",
      quantity: 150,
      category: "Fruits",
      description: "Ripe yellow bananas packed with potassium",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
      farmer: {
        name: "Banana Republic",
        location: "Tamil Nadu",
        rating: 4.5
      },
      harvestDate: "2024-01-15",
      organic: false
    },
    
    // Grains - properly categorized
    {
      id: "7",
      name: "Premium Basmati Rice",
      price: 85,
      unit: "kg",
      quantity: 500,
      category: "Grains",
      description: "Aromatic basmati rice directly from Punjab fields",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
      farmer: {
        name: "Golden Fields",
        location: "Punjab",
        rating: 4.7
      },
      harvestDate: "2024-01-08",
      organic: false
    },
    {
      id: "8",
      name: "Organic Wheat",
      price: 65,
      unit: "kg",
      quantity: 300,
      category: "Grains",
      description: "Premium organic wheat flour quality grain",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
      farmer: {
        name: "Harvest Gold",
        location: "Rajasthan",
        rating: 4.6
      },
      harvestDate: "2024-01-05",
      organic: true
    },
    {
      id: "9",
      name: "Black Quinoa",
      price: 200,
      unit: "kg",
      quantity: 30,
      category: "Grains",
      description: "Premium black quinoa superfood packed with protein",
      image: "https://images.unsplash.com/photo-1578662015460-ceeebf3f8d43?w=400",
      farmer: {
        name: "Healthy Grains Co",
        location: "Gujarat",
        rating: 4.8
      },
      harvestDate: "2024-01-14",
      organic: true
    },
    
    // Herbs - properly categorized
    {
      id: "10",
      name: "Fresh Basil",
      price: 25,
      unit: "bunch",
      quantity: 40,
      category: "Herbs",
      description: "Aromatic basil leaves perfect for cooking",
      image: "https://images.unsplash.com/photo-1618160718220-09b6bce6e88b?w=400",
      farmer: {
        name: "Herb Haven",
        location: "Tamil Nadu",
        rating: 4.9
      },
      harvestDate: "2024-01-16",
      organic: true
    },
    {
      id: "11",
      name: "Organic Mint",
      price: 20,
      unit: "bunch",
      quantity: 35,
      category: "Herbs",
      description: "Fresh mint leaves for tea and cooking",
      image: "https://images.unsplash.com/photo-1628556270448-4d83ec5ef9d8?w=400",
      farmer: {
        name: "Green Herbs Farm",
        location: "Maharashtra",
        rating: 4.7
      },
      harvestDate: "2024-01-15",
      organic: true
    },
    
    // Seeds - properly categorized
    {
      id: "12",
      name: "Sunflower Seeds",
      price: 120,
      unit: "kg",
      quantity: 50,
      category: "Seeds",
      description: "Premium sunflower seeds for snacking and planting",
      image: "https://images.unsplash.com/photo-1549454942-7f29c80339c4?w=400",
      farmer: {
        name: "Seed Specialists",
        location: "Karnataka",
        rating: 4.8
      },
      harvestDate: "2024-01-11",
      organic: false
    },
    
    // Dairy - properly categorized
    {
      id: "13",
      name: "Farm Fresh Milk",
      price: 60,
      unit: "liter",
      quantity: 100,
      category: "Dairy",
      description: "Pure cow milk from grass-fed cows",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
      farmer: {
        name: "Dairy Direct",
        location: "Punjab",
        rating: 4.9
      },
      harvestDate: "2024-01-16",
      organic: true
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Enhanced filtering with strict category matching
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.farmer.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Strict category matching - case sensitive and exact match
      const matchesCategory = filters.category === "" || product.category === filters.category;
      const matchesLocation = filters.location === "" || product.farmer.location === filters.location;
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.farmer.rating - a.farmer.rating;
        case "popular": return b.quantity - a.quantity;
        default: return parseInt(b.id) - parseInt(a.id); // newest first
      }
    });

  // Get category counts for validation
  const getCategoryCount = (categoryName: string) => {
    return products.filter(product => product.category === categoryName).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🛒 Marketplace</h1>
          <p className="text-gray-600">Discover fresh, local produce directly from farmers</p>
          {filters.category && (
            <div className="mt-2">
              <Badge className="bg-green-100 text-green-800">
                Category: {filters.category} ({getCategoryCount(filters.category)} products)
              </Badge>
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <SearchAndFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            categories={categories}
            locations={locations}
            initialCategory={initialCategory}
          />
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">
                    {filteredProducts.length} Products Found
                    {filters.category && ` in ${filters.category}`}
                  </p>
                  {searchQuery && (
                    <p className="text-sm text-gray-600">
                      Search results for "{searchQuery}"
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{filters.sortBy}</Badge>
                  {filters.category && <Badge variant="secondary">{filters.category}</Badge>}
                  {filters.location && <Badge variant="secondary">{filters.location}</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showFarmerInfo={true}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-gray-500">
                <p className="text-lg font-medium mb-2">No products found</p>
                <p>Try adjusting your search criteria or filters</p>
                {filters.category && (
                  <p className="text-sm mt-2">
                    No products available in "{filters.category}" category
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Validation Section - Debug Info */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilter({ ...filters, category })}
                    className="p-4 text-center border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-2xl mb-2">
                      {category === 'Vegetables' && '🥬'}
                      {category === 'Fruits' && '🍎'}
                      {category === 'Grains' && '🌾'}
                      {category === 'Herbs' && '🌿'}
                      {category === 'Seeds' && '🌰'}
                      {category === 'Dairy' && '🥛'}
                    </div>
                    <p className="text-sm font-medium">{category}</p>
                    <Badge className="mt-1" variant="outline">
                      {getCategoryCount(category)} items
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

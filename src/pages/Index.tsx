
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import ProductFilters from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Truck, Shield, Users, TrendingUp, Leaf, Clock, Award } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // Comprehensive product data
  const allProducts = [
    {
      id: "1",
      name: "Organic Tomatoes",
      price: 45,
      unit: "kg",
      quantity: 150,
      category: "Vegetables",
      description: "Fresh organic tomatoes grown without pesticides. Perfect for salads and cooking.",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
      farmer: {
        name: "Green Valley Farm",
        location: "Maharashtra",
        rating: 4.8
      },
      harvestDate: "2024-01-15",
      organic: true,
      tags: ["Fresh", "Organic", "Local"]
    },
    {
      id: "2",
      name: "Fresh Spinach",
      price: 30,
      unit: "kg",
      quantity: 80,
      category: "Vegetables",
      description: "Crisp and fresh spinach leaves packed with nutrients and iron.",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f8dfd?w=400",
      farmer: {
        name: "Green Valley Farm",
        location: "Maharashtra",
        rating: 4.8
      },
      harvestDate: "2024-01-14",
      organic: true,
      tags: ["Fresh", "Organic", "Nutritious"]
    },
    {
      id: "3",
      name: "Basmati Rice",
      price: 120,
      unit: "kg",
      quantity: 200,
      category: "Grains",
      description: "Premium quality aged basmati rice with long grains and aromatic fragrance.",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
      farmer: {
        name: "Golden Fields",
        location: "Punjab",
        rating: 4.7
      },
      harvestDate: "2024-01-10",
      organic: false,
      tags: ["Premium", "Aromatic", "Long Grain"]
    },
    {
      id: "4",
      name: "Fresh Mangoes",
      price: 80,
      unit: "kg",
      quantity: 120,
      category: "Fruits",
      description: "Sweet and juicy Alphonso mangoes, the king of fruits from Maharashtra.",
      image: "https://images.unsplash.com/photo-1553279765-c0945fb87a6c?w=400",
      farmer: {
        name: "Mango Paradise",
        location: "Maharashtra",
        rating: 4.9
      },
      harvestDate: "2024-01-12",
      organic: false,
      tags: ["Seasonal", "Sweet", "Premium"]
    },
    {
      id: "5",
      name: "Organic Carrots",
      price: 35,
      unit: "kg",
      quantity: 90,
      category: "Vegetables",
      description: "Crunchy organic carrots rich in beta-carotene and vitamins.",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
      farmer: {
        name: "Organic Roots",
        location: "Punjab",
        rating: 4.6
      },
      harvestDate: "2024-01-13",
      organic: true,
      tags: ["Organic", "Crunchy", "Vitamin Rich"]
    },
    {
      id: "6",
      name: "Fresh Milk",
      price: 60,
      unit: "liter",
      quantity: 50,
      category: "Dairy",
      description: "Pure fresh milk from grass-fed cows, rich in calcium and proteins.",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
      farmer: {
        name: "Dairy Fresh",
        location: "Haryana",
        rating: 4.8
      },
      harvestDate: "2024-01-16",
      organic: true,
      tags: ["Fresh", "Pure", "Daily"]
    },
    {
      id: "7",
      name: "Red Onions",
      price: 25,
      unit: "kg",
      quantity: 180,
      category: "Vegetables",
      description: "Fresh red onions with strong flavor, perfect for Indian cooking.",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
      farmer: {
        name: "Spice Garden",
        location: "Karnataka",
        rating: 4.5
      },
      harvestDate: "2024-01-11",
      organic: false,
      tags: ["Fresh", "Flavorful", "Essential"]
    },
    {
      id: "8",
      name: "Wheat Flour",
      price: 40,
      unit: "kg",
      quantity: 150,
      category: "Grains",
      description: "Fine quality whole wheat flour, stone ground for better nutrition.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
      farmer: {
        name: "Golden Grains",
        location: "Uttar Pradesh",
        rating: 4.7
      },
      harvestDate: "2024-01-08",
      organic: false,
      tags: ["Stone Ground", "Nutritious", "Fresh"]
    }
  ];

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const stats = [
    { icon: Users, label: "Active Farmers", value: "1000+", color: "text-green-600" },
    { icon: ShoppingCart, label: "Products Available", value: "5000+", color: "text-blue-600" },
    { icon: Truck, label: "Deliveries Made", value: "10,000+", color: "text-purple-600" },
    { icon: Star, label: "Customer Rating", value: "4.8/5", color: "text-yellow-600" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Quality Assured",
      description: "All products are quality checked before delivery"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Fresh produce delivered within 24 hours"
    },
    {
      icon: Leaf,
      title: "Farm Fresh",
      description: "Direct from farmers means better prices and freshness"
    },
    {
      icon: Award,
      title: "Trusted Platform",
      description: "Over 10,000 satisfied customers trust our service"
    }
  ];

  const categories = [...new Set(allProducts.map(p => p.category))];
  const locations = [...new Set(allProducts.map(p => p.farmer.location))];

  const handleFilterChange = (filters: any) => {
    let filtered = allProducts;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.farmer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.farmer.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(product => product.farmer.location === filters.location);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Organic filter
    if (filters.organic) {
      filtered = filtered.filter(product => product.organic);
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.quantity > 0);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.farmer.rating - a.farmer.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.quantity - a.quantity);
        break;
      default:
        // newest first - default order
        break;
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Carousel */}
      <section className="container mx-auto px-4 py-8">
        <HeroCarousel onShopNow={() => navigate('/marketplace')} />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <IconComponent className={`h-12 w-12 ${stat.color} mx-auto mb-3`} />
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Products</h2>
            <p className="text-xl text-gray-600">Discover fresh produce from trusted farmers across India</p>
          </div>
          
          <ProductFilters
            onFilterChange={handleFilterChange}
            categories={categories}
            locations={locations}
          />
        </div>
      </section>

      {/* All Products Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {allProducts.length} products
            </p>
            <div className="flex gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                24hr Delivery
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Quality Assured
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard
                  product={product}
                  showFarmerInfo={true}
                />
                {/* Product Tags */}
                <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
                  {product.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} className="text-xs bg-white/90 text-gray-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No products found matching your criteria</p>
              <Button onClick={() => handleFilterChange({
                search: "", category: "", location: "", priceRange: [0, 500],
                sortBy: "newest", organic: false, inStock: true
              })}>
                Clear All Filters
              </Button>
            </div>
          )}
          
          {filteredProducts.length > 0 && (
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/marketplace')}
                className="bg-green-600 hover:bg-green-700"
              >
                View All Products in Marketplace
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose AgriDirect?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center border-green-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <IconComponent className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who trust AgriDirect for their fresh produce needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/register')}
            >
              Sign Up Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/marketplace')}
            >
              Browse Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

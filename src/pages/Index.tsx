
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Truck, Shield, Users, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: "featured-1",
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
      id: "featured-2",
      name: "Fresh Spinach",
      price: 30,
      unit: "kg",
      quantity: 80,
      category: "Vegetables",
      description: "Crisp and fresh spinach leaves packed with nutrients",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f8dfd?w=400",
      farmer: {
        name: "Green Valley Farm",
        location: "Maharashtra",
        rating: 4.8
      },
      harvestDate: "2024-01-14",
      organic: true
    },
    {
      id: "featured-3",
      name: "Basmati Rice",
      price: 120,
      unit: "kg",
      quantity: 200,
      category: "Grains",
      description: "Premium quality aged basmati rice",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
      farmer: {
        name: "Golden Fields",
        location: "Punjab",
        rating: 4.7
      },
      harvestDate: "2024-01-10",
      organic: false
    }
  ];

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
      icon: Star,
      title: "Best Prices",
      description: "Direct from farmers means better prices for you"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Fresh From Farm to Your Table
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect directly with farmers and get the freshest produce delivered to your doorstep. 
            Supporting local agriculture, one order at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100"
              onClick={() => navigate('/marketplace')}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-green-600"
              onClick={() => navigate('/farmers')}
            >
              Meet Our Farmers
            </Button>
          </div>
        </div>
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

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Fresh picks from our trusted farmers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showFarmerInfo={true}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/marketplace')}
              className="bg-green-600 hover:bg-green-700"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose AgriDirect?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

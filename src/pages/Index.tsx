
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Truck, 
  Shield, 
  Users, 
  TrendingUp,
  ArrowRight,
  Leaf,
  MapPin,
  Package
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for featured products
  const featuredProducts = [
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: 45,
      unit: 'kg',
      quantity: 150,
      category: 'Vegetables',
      description: 'Fresh organic tomatoes grown without pesticides. Perfect for cooking and salads.',
      image: '/placeholder.svg',
      farmer: {
        name: 'Ravi Kumar',
        location: 'Bangalore, Karnataka',
        rating: 4.8
      },
      harvestDate: '2024-06-25',
      organic: true
    },
    {
      id: '2',
      name: 'Basmati Rice',
      price: 120,
      unit: 'kg',
      quantity: 500,
      category: 'Grains',
      description: 'Premium quality Basmati rice directly from Punjab farms.',
      image: '/placeholder.svg',
      farmer: {
        name: 'Harpreet Singh',
        location: 'Amritsar, Punjab',
        rating: 4.9
      },
      harvestDate: '2024-06-20',
      organic: false
    },
    {
      id: '3',
      name: 'Fresh Mangoes',
      price: 80,
      unit: 'dozen',
      quantity: 200,
      category: 'Fruits',
      description: 'Sweet Alphonso mangoes from Maharashtra orchards.',
      image: '/placeholder.svg',
      farmer: {
        name: 'Suresh Patil',
        location: 'Pune, Maharashtra',
        rating: 4.7
      },
      harvestDate: '2024-06-22',
      organic: true
    }
  ];

  const stats = [
    { icon: Users, label: 'Active Farmers', value: '2,500+' },
    { icon: Package, label: 'Products Listed', value: '15,000+' },
    { icon: TrendingUp, label: 'Orders Completed', value: '50,000+' },
    { icon: MapPin, label: 'Cities Covered', value: '25+' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Direct from Farm to Your Table
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Connect directly with Indian farmers. Get fresh produce, grains, and dairy 
              without middlemen. Support local agriculture.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for fresh vegetables, grains, fruits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-full bg-white text-gray-900"
                />
                <Button 
                  size="lg"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 rounded-full px-8"
                  onClick={() => navigate(`/marketplace?search=${searchQuery}`)}
                >
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-green-800 bg-white hover:bg-green-50"
                onClick={() => navigate('/marketplace')}
              >
                Browse Marketplace
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-800"
                onClick={() => navigate('/register')}
              >
                Join as Farmer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AgriDirect?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Revolutionizing agriculture by connecting farmers directly with buyers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Direct Delivery</h3>
                <p className="text-gray-600">Fresh produce delivered directly from farms to your doorstep</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality Assured</h3>
                <p className="text-gray-600">Verified farmers and quality-checked produce for your peace of mind</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Support Farmers</h3>
                <p className="text-gray-600">Eliminate middlemen and ensure farmers get fair prices</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Organic Options</h3>
                <p className="text-gray-600">Wide selection of organic and pesticide-free produce</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <Icon className="w-12 h-12 mb-4 text-green-200" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-green-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-xl text-gray-600">Fresh picks from our verified farmers</p>
            </div>
            <Button 
              variant="outline" 
              className="text-green-600 border-green-600 hover:bg-green-50"
              onClick={() => navigate('/marketplace')}
            >
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onAddToCart={(productId) => {
                  console.log(`Added product ${productId} to cart`);
                  // Add to cart logic here
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of farmers and buyers who trust AgriDirect for their agricultural needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/register?role=farmer')}
            >
              Register as Farmer
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
              onClick={() => navigate('/register?role=buyer')}
            >
              Register as Buyer
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold text-white">AgriDirect</span>
              </div>
              <p className="text-gray-400">
                Connecting farmers directly with buyers for a sustainable agricultural future.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">For Farmers</h3>
              <ul className="space-y-2">
                <li><Link to="/register?role=farmer" className="hover:text-green-400">Join as Farmer</Link></li>
                <li><Link to="/farmer-guide" className="hover:text-green-400">Selling Guide</Link></li>
                <li><Link to="/pricing" className="hover:text-green-400">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">For Buyers</h3>
              <ul className="space-y-2">
                <li><Link to="/marketplace" className="hover:text-green-400">Browse Products</Link></li>
                <li><Link to="/register?role=buyer" className="hover:text-green-400">Create Account</Link></li>
                <li><Link to="/bulk-orders" className="hover:text-green-400">Bulk Orders</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-green-400">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-green-400">Contact Us</Link></li>
                <li><Link to="/terms" className="hover:text-green-400">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 AgriDirect. All rights reserved. Empowering Indian Agriculture.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  MapPin,
  Star
} from 'lucide-react';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Mock user for header
  const mockUser = {
    name: 'John Doe',
    role: 'buyer' as const,
    avatar: '/placeholder.svg'
  };

  // Mock products data
  const products = [
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
    },
    {
      id: '4',
      name: 'Farm Fresh Milk',
      price: 55,
      unit: 'liter',
      quantity: 100,
      category: 'Dairy',
      description: 'Pure cow milk from grass-fed cows. Rich in calcium and protein.',
      image: '/placeholder.svg',
      farmer: {
        name: 'Lakshmi Dairy',
        location: 'Mysore, Karnataka',
        rating: 4.6
      },
      harvestDate: '2024-06-27',
      organic: true
    },
    {
      id: '5',
      name: 'Wheat Seeds',
      price: 85,
      unit: 'kg',
      quantity: 300,
      category: 'Seeds',
      description: 'High-quality wheat seeds for farming. Excellent germination rate.',
      image: '/placeholder.svg',
      farmer: {
        name: 'Ramesh Agro',
        location: 'Indore, Madhya Pradesh',
        rating: 4.5
      },
      harvestDate: '2024-06-18',
      organic: false
    },
    {
      id: '6',
      name: 'Green Leafy Spinach',
      price: 30,
      unit: 'kg',
      quantity: 80,
      category: 'Vegetables',
      description: 'Fresh spinach leaves rich in iron and vitamins.',
      image: '/placeholder.svg',
      farmer: {
        name: 'Priya Organic Farm',
        location: 'Chennai, Tamil Nadu',
        rating: 4.8
      },
      harvestDate: '2024-06-26',
      organic: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: products.length },
    { id: 'vegetables', name: 'Vegetables', count: 2 },
    { id: 'fruits', name: 'Fruits', count: 1 },
    { id: 'grains', name: 'Grains', count: 1 },
    { id: 'dairy', name: 'Dairy', count: 1 },
    { id: 'seeds', name: 'Seeds', count: 1 }
  ];

  const locations = [
    'All Locations',
    'Karnataka',
    'Punjab',
    'Maharashtra',
    'Tamil Nadu',
    'Madhya Pradesh'
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase() === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || 
                           product.farmer.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleAddToCart = async (productId: string) => {
    console.log(`Adding product ${productId} to cart`);
    // Add to cart logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={mockUser} cartItemCount={3} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for products, farmers, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full"
              />
            </div>
            
            <div className="flex gap-3">
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md bg-white"
              >
                {locations.map(location => (
                  <option key={location} value={location === 'All Locations' ? 'all' : location}>
                    {location}
                  </option>
                ))}
              </select>
              
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-2 rounded-md transition-colors flex justify-between items-center ${
                        selectedCategory === category.id 
                          ? 'bg-green-100 text-green-800' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Range */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-2">
                  {['all', 'under-50', '50-100', '100-200', 'above-200'].map(range => (
                    <button
                      key={range}
                      onClick={() => setPriceRange(range)}
                      className={`w-full text-left p-2 rounded-md transition-colors ${
                        priceRange === range 
                          ? 'bg-green-100 text-green-800' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {range === 'all' ? 'All Prices' :
                       range === 'under-50' ? 'Under ₹50' :
                       range === '50-100' ? '₹50 - ₹100' :
                       range === '100-200' ? '₹100 - ₹200' :
                       'Above ₹200'}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Farmers */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Top Rated Farmers</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Ravi Kumar', location: 'Karnataka', rating: 4.8 },
                    { name: 'Harpreet Singh', location: 'Punjab', rating: 4.9 },
                    { name: 'Suresh Patil', location: 'Maharashtra', rating: 4.7 }
                  ].map((farmer, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-800 text-sm font-medium">
                          {farmer.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{farmer.name}</p>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{farmer.location}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 ml-1" />
                          <span className="text-xs">{farmer.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Products' : 
                   categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  {filteredProducts.length} products found
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>
              
              <select className="px-4 py-2 border border-gray-300 rounded-md bg-white">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Rating: High to Low</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <CardContent>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or browse all categories
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedLocation('all');
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

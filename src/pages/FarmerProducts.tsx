
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  image: string;
  description: string;
  createdAt: string;
  views: number;
  orders: number;
}

const FarmerProducts = () => {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      price: 135,
      unit: 'kg',
      quantity: 150,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
      description: 'Fresh organic tomatoes grown without pesticides',
      createdAt: '2024-01-15',
      views: 245,
      orders: 23
    },
    {
      id: '2',
      name: 'Fresh Spinach',
      category: 'Vegetables',
      price: 90,
      unit: 'kg',
      quantity: 0,
      status: 'out_of_stock',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f8dfd?w=400',
      description: 'Crisp and fresh spinach leaves packed with nutrients',
      createdAt: '2024-01-10',
      views: 189,
      orders: 15
    },
    {
      id: '3',
      name: 'Organic Carrots',
      category: 'Vegetables',
      price: 75,
      unit: 'kg',
      quantity: 200,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
      description: 'Sweet and crunchy organic carrots',
      createdAt: '2024-01-05',
      views: 156,
      orders: 18
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'out_of_stock': return 'Out of Stock';
      default: return status;
    }
  };

  return (
    <DashboardLayout userRole="farmer">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
            <p className="text-gray-600">Manage your product listings</p>
          </div>
          <Link to="/farmer/add-product">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Products</p>
                  <p className="text-2xl font-bold">
                    {products.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold">
                    {products.reduce((sum, p) => sum + p.views, 0)}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">
                    {products.reduce((sum, p) => sum + p.orders, 0)}
                  </p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge className={`absolute top-2 right-2 ${getStatusColor(product.status)}`}>
                  {getStatusText(product.status)}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    ₹{product.price}/{product.unit}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.quantity} {product.unit} available
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-500">Views:</span>
                    <span className="font-medium ml-1">{product.views}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Orders:</span>
                    <span className="font-medium ml-1">{product.orders}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-600 mb-4">Start by adding your first product listing</p>
              <Link to="/farmer/add-product">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Product
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FarmerProducts;

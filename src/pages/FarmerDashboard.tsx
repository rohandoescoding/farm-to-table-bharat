
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  IndianRupee,
  Plus,
  Eye,
  Edit,
  AlertCircle
} from 'lucide-react';

const FarmerDashboard = () => {
  // Mock data - in real app, this would come from API
  const [dashboardData] = useState({
    stats: {
      totalProducts: 12,
      activeOrders: 8,
      monthlyRevenue: 25600,
      averageRating: 4.7
    },
    recentProducts: [
      {
        id: '1',
        name: 'Organic Tomatoes',
        category: 'Vegetables',
        price: 45,
        quantity: 150,
        status: 'active',
        orders: 23
      },
      {
        id: '2',
        name: 'Fresh Spinach',
        category: 'Vegetables',
        price: 30,
        quantity: 0,
        status: 'out_of_stock',
        orders: 15
      },
      {
        id: '3',
        name: 'Wheat Seeds',
        category: 'Seeds',
        price: 85,
        quantity: 200,
        status: 'pending_approval',
        orders: 0
      }
    ],
    recentOrders: [
      {
        id: 'ORD001',
        product: 'Organic Tomatoes',
        buyer: 'Raj Restaurant',
        quantity: 25,
        amount: 1125,
        status: 'confirmed',
        date: '2024-06-26'
      },
      {
        id: 'ORD002',
        product: 'Fresh Spinach',
        buyer: 'Green Grocers',
        quantity: 10,
        amount: 300,
        status: 'delivered',
        date: '2024-06-25'
      }
    ]
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'out_of_stock':
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      case 'pending_approval':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout userRole="farmer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Ravi!</h1>
            <p className="text-gray-600">Here's what's happening with your farm today.</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.activeOrders}</div>
              <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{dashboardData.stats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.averageRating}</div>
              <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Products */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Products</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{product.name}</h4>
                        {getStatusBadge(product.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>₹{product.price}/kg</span>
                        <span>{product.quantity} kg available</span>
                        <span>{product.orders} orders</span>
                      </div>
                      {product.status === 'out_of_stock' && (
                        <div className="flex items-center gap-1 mt-2 text-red-600 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>Restock needed</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{order.id}</h4>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {order.product} • {order.buyer}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{order.quantity} kg</span>
                        <span>₹{order.amount}</span>
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Market Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">High Demand</h4>
                <p className="text-sm text-green-600">Organic vegetables are trending 15% above average</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Price Alert</h4>
                <p className="text-sm text-blue-600">Tomato prices are 8% higher than regional average</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">Seasonal Tip</h4>
                <p className="text-sm text-orange-600">Consider planting monsoon crops for July harvest</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FarmerDashboard;

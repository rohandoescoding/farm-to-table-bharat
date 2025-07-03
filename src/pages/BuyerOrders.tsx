
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, MapPin, Clock, CheckCircle, XCircle, Star } from 'lucide-react';

interface Order {
  id: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  orderDate: string;
  expectedDelivery: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    unit: string;
    price: number;
    farmer: {
      name: string;
      location: string;
    };
  }>;
  deliveryAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

const BuyerOrders = () => {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      status: 'delivered',
      total: 1770,
      orderDate: '2024-06-20',
      expectedDelivery: '2024-06-22',
      items: [
        {
          id: '1',
          name: 'Organic Tomatoes',
          quantity: 2,
          unit: 'kg',
          price: 135,
          farmer: {
            name: 'Ravi Kumar',
            location: 'Bangalore, Karnataka'
          }
        },
        {
          id: '2',
          name: 'Basmati Rice',
          quantity: 4,
          unit: 'kg',
          price: 375,
          farmer: {
            name: 'Harpreet Singh',
            location: 'Amritsar, Punjab'
          }
        }
      ],
      deliveryAddress: {
        fullName: 'Priya Sharma',
        address: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      }
    },
    {
      id: 'ORD-002',
      status: 'shipped',
      total: 720,
      orderDate: '2024-06-25',
      expectedDelivery: '2024-06-27',
      items: [
        {
          id: '3',
          name: 'Fresh Mangoes',
          quantity: 3,
          unit: 'dozen',
          price: 240,
          farmer: {
            name: 'Suresh Patil',
            location: 'Pune, Maharashtra'
          }
        }
      ],
      deliveryAddress: {
        fullName: 'Priya Sharma',
        address: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      }
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Package className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filterOrdersByStatus = (status?: string) => {
    if (!status || status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">Order #{order.id}</h3>
            <p className="text-gray-500">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {getStatusIcon(order.status)}
            <span className="ml-1 capitalize">{order.status}</span>
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">
                  {item.quantity} {item.unit} × ₹{item.price} - by {item.farmer.name}
                </div>
              </div>
              <div className="font-medium">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {order.deliveryAddress.city}, {order.deliveryAddress.state}
            </div>
            {order.status === 'shipped' && (
              <div className="text-green-600 mt-1">
                Expected delivery: {new Date(order.expectedDelivery).toLocaleDateString()}
              </div>
            )}
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold">Total: ₹{order.total.toFixed(2)}</div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              {order.status === 'delivered' && (
                <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                  <Star className="w-4 h-4 mr-1" />
                  Rate
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout userRole="buyer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>
        
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
          
          <TabsContent value="pending">
            {filterOrdersByStatus('pending').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
          
          <TabsContent value="shipped">
            {filterOrdersByStatus('shipped').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
          
          <TabsContent value="delivered">
            {filterOrdersByStatus('delivered').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
          
          <TabsContent value="cancelled">
            {filterOrdersByStatus('cancelled').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BuyerOrders;

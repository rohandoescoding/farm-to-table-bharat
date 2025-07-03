
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { User, Bell, Shield, CreditCard, MapPin } from 'lucide-react';

const BuyerSettings = () => {
  const [profile, setProfile] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 9876543210',
    location: 'Mumbai, Maharashtra',
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newProducts: true,
    priceAlerts: true,
  });

  const [addresses, setAddresses] = useState([
    {
      id: '1',
      type: 'Home',
      fullName: 'Priya Sharma',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 9876543210',
      isDefault: true,
    },
    {
      id: '2',
      type: 'Office',
      fullName: 'Priya Sharma',
      address: '456 Business District, Floor 12',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      phone: '+91 9876543210',
      isDefault: false,
    },
  ]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Notification preferences updated!');
  };

  return (
    <DashboardLayout userRole="buyer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Update Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Order Updates</h4>
                    <p className="text-sm text-gray-600">Get notified about your order status</p>
                  </div>
                  <Switch
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('orderUpdates', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Promotions & Deals</h4>
                    <p className="text-sm text-gray-600">Receive updates about special offers</p>
                  </div>
                  <Switch
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => handleNotificationChange('promotions', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Products</h4>
                    <p className="text-sm text-gray-600">Get notified when farmers add new products</p>
                  </div>
                  <Switch
                    checked={notifications.newProducts}
                    onCheckedChange={(checked) => handleNotificationChange('newProducts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Price Alerts</h4>
                    <p className="text-sm text-gray-600">Get notified about price changes on your favorite items</p>
                  </div>
                  <Switch
                    checked={notifications.priceAlerts}
                    onCheckedChange={(checked) => handleNotificationChange('priceAlerts', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{address.type}</h4>
                          {address.isDefault && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        {address.fullName}<br />
                        {address.address}<br />
                        {address.city}, {address.state} - {address.pincode}<br />
                        {address.phone}
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Add New Address
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Change Password</h4>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Current Password" />
                    <Input type="password" placeholder="New Password" />
                    <Input type="password" placeholder="Confirm New Password" />
                    <Button className="bg-green-600 hover:bg-green-700">
                      Update Password
                    </Button>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">
                    Enable 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BuyerSettings;

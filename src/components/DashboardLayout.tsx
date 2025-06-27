
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Plus,
  ListChecks,
  TrendingUp
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: 'farmer' | 'buyer' | 'admin';
}

const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  const location = useLocation();

  const getNavItems = () => {
    switch (userRole) {
      case 'farmer':
        return [
          { icon: Home, label: 'Dashboard', href: '/farmer-dashboard' },
          { icon: Package, label: 'My Products', href: '/farmer/products' },
          { icon: Plus, label: 'Add Product', href: '/farmer/add-product' },
          { icon: ListChecks, label: 'Orders', href: '/farmer/orders' },
          { icon: TrendingUp, label: 'Analytics', href: '/farmer/analytics' },
          { icon: Settings, label: 'Settings', href: '/farmer/settings' }
        ];
      case 'buyer':
        return [
          { icon: Home, label: 'Dashboard', href: '/buyer-dashboard' },
          { icon: ShoppingCart, label: 'My Orders', href: '/buyer/orders' },
          { icon: Package, label: 'Wishlist', href: '/buyer/wishlist' },
          { icon: Settings, label: 'Settings', href: '/buyer/settings' }
        ];
      case 'admin':
        return [
          { icon: Home, label: 'Dashboard', href: '/admin-dashboard' },
          { icon: Users, label: 'Farmers', href: '/admin/farmers' },
          { icon: Package, label: 'Products', href: '/admin/products' },
          { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
          { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
          { icon: Settings, label: 'Settings', href: '/admin/settings' }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">AgriDirect</h2>
              <p className="text-sm text-gray-500 capitalize">{userRole} Portal</p>
            </div>
          </Link>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

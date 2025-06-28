
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NotificationCenter from "@/components/NotificationCenter";
import { ShoppingCart, User } from "lucide-react";

// Mock user state - in a real app, this would come from authentication context
const mockUser = {
  isAuthenticated: false,
  role: null as 'farmer' | 'buyer' | null
};

const Header = () => {
  const { isAuthenticated, role } = mockUser;

  // Navigation items for different user states
  const getNavigationItems = () => {
    if (isAuthenticated && role === 'farmer') {
      return [
        { to: "/farmer-dashboard", label: "Dashboard" },
        { to: "/farmer/products", label: "My Listings" },
        { to: "/farmer/add-product", label: "New Listing" },
        { to: "/orders", label: "Orders" },
        { to: "/farmer/earnings", label: "Earnings" },
        { to: "/support", label: "Support" }
      ];
    } else {
      // Default navigation for unauthenticated users and buyers
      return [
        { to: "/categories", label: "Categories" },
        { to: "/deals", label: "Deals" },
        { to: "/whats-new", label: "What's New" },
        { to: "/order", label: "Order" },
        { to: "/delivery", label: "Delivery" }
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AgriDirect</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link 
                key={item.to}
                to={item.to} 
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <NotificationCenter />
            
            <Link to="/cart">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/login">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/register">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

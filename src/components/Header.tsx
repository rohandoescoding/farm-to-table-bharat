
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NotificationCenter from "@/components/NotificationCenter";
import { ShoppingCart, User } from "lucide-react";

const Header = () => {
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
            <Link to="/marketplace" className="text-gray-700 hover:text-green-600 transition-colors">
              Marketplace
            </Link>
            <Link to="/farmer-dashboard" className="text-gray-700 hover:text-green-600 transition-colors">
              For Farmers
            </Link>
            <Link to="/buyer-dashboard" className="text-gray-700 hover:text-green-600 transition-colors">
              For Buyers
            </Link>
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

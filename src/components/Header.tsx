
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, User, LogOut, Bell } from 'lucide-react';

interface HeaderProps {
  user?: {
    name: string;
    role: 'farmer' | 'buyer' | 'admin';
    avatar?: string;
  };
  cartItemCount?: number;
}

const Header = ({ user, cartItemCount = 0 }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout logic here
    navigate('/');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'farmer': return 'bg-green-100 text-green-800';
      case 'buyer': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-green-800">AgriDirect</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/marketplace" className="text-gray-700 hover:text-green-600 transition-colors">
              Marketplace
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === 'buyer' && (
                  <Link to="/cart" className="relative p-2 text-gray-700 hover:text-green-600 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-red-500 hover:bg-red-500">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Link>
                )}
                
                <Button variant="ghost" size="sm" className="p-2">
                  <Bell className="w-5 h-5 text-gray-700" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 hover:bg-green-50">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-green-100 text-green-800">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <Badge className={`text-xs ${getRoleBadgeColor(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate(`/${user.role}-dashboard`)}>
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/register')} className="bg-green-600 hover:bg-green-700">
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

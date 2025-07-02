
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MapPin, Calendar, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  category: string;
  description: string;
  image: string;
  farmer: {
    name: string;
    location: string;
    rating: number;
  };
  harvestDate: string;
  organic: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  showFarmerInfo?: boolean;
}

const ProductCard = ({ product, onAddToCart, showFarmerInfo = true }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when adding to cart
    if (onAddToCart) {
      setIsLoading(true);
      await onAddToCart(product.id);
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vegetables': return 'bg-green-100 text-green-800';
      case 'fruits': return 'bg-orange-100 text-orange-800';
      case 'grains': return 'bg-yellow-100 text-yellow-800';
      case 'dairy': return 'bg-blue-100 text-blue-800';
      case 'seeds': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-green-100 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge className={getCategoryColor(product.category)}>
            {product.category}
          </Badge>
          {product.organic && (
            <Badge className="bg-green-600 text-white">Organic</Badge>
          )}
        </div>
        <div className="absolute top-2 right-2">
          {showFarmerInfo && (
            <div className="bg-white rounded-full px-2 py-1 flex items-center space-x-1 text-xs">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{product.farmer.rating}</span>
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <div className="text-right">
            <p className="text-lg font-bold text-green-600">₹{product.price}</p>
            <p className="text-sm text-gray-500">per {product.unit}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Harvested: {new Date(product.harvestDate).toLocaleDateString()}</span>
          </div>
          
          {showFarmerInfo && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{product.farmer.name}, {product.farmer.location}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Available: {product.quantity} {product.unit}s</span>
            <div className="w-full bg-gray-200 rounded-full h-2 ml-3">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${Math.min((product.quantity / 100) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          disabled={isLoading || product.quantity === 0}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
        >
          {isLoading ? (
            "Adding..."
          ) : product.quantity === 0 ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

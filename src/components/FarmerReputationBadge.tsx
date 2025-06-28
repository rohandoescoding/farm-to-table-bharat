
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Shield, Award, CheckCircle } from 'lucide-react';

interface FarmerReputation {
  farmerId: string;
  farmerName: string;
  totalOrders: number;
  fulfillmentRate: number; // percentage
  averageRating: number;
  returnRate: number; // percentage
  responseTime: string; // e.g., "< 2 hours"
  qualityBadges: string[];
  joinedDate: string;
}

interface FarmerReputationBadgeProps {
  reputation: FarmerReputation;
  showDetails?: boolean;
}

const FarmerReputationBadge = ({ reputation, showDetails = false }: FarmerReputationBadgeProps) => {
  const getReputationLevel = () => {
    if (reputation.averageRating >= 4.5 && reputation.fulfillmentRate >= 95) {
      return { level: 'Premium', color: 'bg-gradient-to-r from-yellow-400 to-orange-500', icon: Award };
    } else if (reputation.averageRating >= 4.0 && reputation.fulfillmentRate >= 90) {
      return { level: 'Verified', color: 'bg-green-500', icon: Shield };
    } else if (reputation.averageRating >= 3.5 && reputation.fulfillmentRate >= 80) {
      return { level: 'Trusted', color: 'bg-blue-500', icon: CheckCircle };
    }
    return { level: 'New', color: 'bg-gray-400', icon: Star };
  };

  const { level, color, icon: Icon } = getReputationLevel();

  const hasQualityAssuranceBadge = () => {
    return reputation.averageRating >= 4.5 && 
           reputation.fulfillmentRate >= 95 && 
           reputation.returnRate <= 5;
  };

  if (!showDetails) {
    return (
      <div className="flex items-center gap-2">
        <Badge className={`${color} text-white`}>
          <Icon className="w-3 h-3 mr-1" />
          {level} Farmer
        </Badge>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{reputation.averageRating.toFixed(1)}</span>
        </div>
        {hasQualityAssuranceBadge() && (
          <Badge className="bg-purple-100 text-purple-800">
            <Shield className="w-3 h-3 mr-1" />
            Quality Assured
          </Badge>
        )}
      </div>
    );
  }

  return (
    <Card className="border-green-100">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">{reputation.farmerName}</h3>
              <Badge className={`${color} text-white`}>{level} Farmer</Badge>
            </div>
          </div>
          
          {hasQualityAssuranceBadge() && (
            <Badge className="bg-purple-100 text-purple-800">
              <Shield className="w-4 h-4 mr-1" />
              Quality Assured
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Rating:</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{reputation.averageRating.toFixed(1)}/5</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Orders:</span>
              <span className="font-medium">{reputation.totalOrders}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Member since:</span>
              <span className="font-medium">{reputation.joinedDate}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Fulfillment:</span>
              <span className={`font-medium ${reputation.fulfillmentRate >= 90 ? 'text-green-600' : 'text-orange-600'}`}>
                {reputation.fulfillmentRate}%
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Response:</span>
              <span className="font-medium">{reputation.responseTime}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Return Rate:</span>
              <span className={`font-medium ${reputation.returnRate <= 5 ? 'text-green-600' : 'text-red-600'}`}>
                {reputation.returnRate}%
              </span>
            </div>
          </div>
        </div>

        {reputation.qualityBadges.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Quality Badges:</p>
            <div className="flex flex-wrap gap-1">
              {reputation.qualityBadges.map((badge, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FarmerReputationBadge;

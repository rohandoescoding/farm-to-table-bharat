
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, Truck, Shield } from 'lucide-react';

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  ctaText: string;
  ctaAction: () => void;
}

const HeroCarousel = ({ onShopNow }: { onShopNow: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: CarouselSlide[] = [
    {
      id: 'featured-products',
      title: 'Fresh Farm Produce',
      subtitle: 'Directly from our trusted farmers',
      description: 'Get the freshest vegetables, fruits, and grains delivered to your doorstep within 24 hours',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop',
      badge: 'Featured',
      ctaText: 'Shop Fresh Now',
      ctaAction: onShopNow
    },
    {
      id: 'seasonal-offers',  
      title: 'Seasonal Harvest Special',
      subtitle: 'Up to 30% off on seasonal produce',
      description: 'Enjoy premium quality seasonal fruits and vegetables at unbeatable prices',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=400&fit=crop',
      badge: 'Limited Time',
      ctaText: 'View Offers',
      ctaAction: onShopNow
    },
    {
      id: 'trusted-farmers',
      title: 'Meet Our Farmers',
      subtitle: 'Over 1000+ verified farmers',
      description: 'Connect with local farmers who grow with passion and deliver with trust',
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=400&fit=crop',
      badge: 'Trusted',
      ctaText: 'Meet Farmers',
      ctaAction: () => window.location.href = '/farmers'
    },
    {
      id: 'organic-certified',
      title: 'Certified Organic',
      subtitle: '100% pesticide-free guarantee',
      description: 'Premium organic produce certified by recognized agricultural bodies',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop',
      badge: 'Organic',
      ctaText: 'Shop Organic',
      ctaAction: onShopNow
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg bg-gradient-to-r from-green-600 to-green-700">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Content */}
              <div className="flex flex-col justify-center p-8 md:p-12 text-white">
                <div className="space-y-4">
                  {slide.badge && (
                    <Badge className="bg-yellow-500 text-yellow-900 w-fit">
                      {slide.badge}
                    </Badge>
                  )}
                  <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-green-100">
                    {slide.subtitle}
                  </p>
                  <p className="text-md text-green-200 max-w-lg">
                    {slide.description}
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <Button
                      size="lg"
                      onClick={slide.ctaAction}
                      className="bg-white text-green-600 hover:bg-gray-100"
                    >
                      {slide.ctaText}
                    </Button>
                    <div className="hidden md:flex items-center gap-6 text-sm text-green-200">
                      <div className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        <span>24hr Delivery</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        <span>Quality Assured</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span>4.8 Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="hidden lg:block relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;

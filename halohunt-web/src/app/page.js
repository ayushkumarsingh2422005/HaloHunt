"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Eye, Grid3X3, Monitor, Home, Zap, Trophy, Car, Laptop, MoreHorizontal, Clock, Search, Bell, ShoppingCart, User, Menu } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const Navigation = ({ className }) => {
  return (
    <nav className={`${className} bg-white`}>
      <div className="flex md:flex-col items-center justify-between md:justify-start md:gap-8 p-4">
        <button className="flex flex-col items-center gap-1 text-purple-700">
          <Home className="w-6 h-6" />
          <span className="text-xs md:text-sm">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-700">
          <Bell className="w-6 h-6" />
          <span className="text-xs md:text-sm">Live</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-700">
          <Search className="w-6 h-6" />
          <span className="text-xs md:text-sm">Search</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-700">
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs md:text-sm">Cart</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-700">
          <User className="w-6 h-6" />
          <span className="text-xs md:text-sm">Profile</span>
        </button>
      </div>
    </nav>
  );
};

const LiveEventCarousel = ({ events }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {events.map((event) => (
            <div key={event.id} className="relative flex-[0_0_100%] min-w-0 pl-4">
              <div className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={`Live stream by ${event.host}`}
                    className="w-full h-[400px] object-cover"
                  />
                  
                  {/* Live Badge */}
                  {event.isLive && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      LIVE
                    </div>
                  )}
                  
                  {/* Sale Overlay */}
                  {event.type === "sale" && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-red-400 text-6xl font-bold mb-2">SALE</div>
                        <div className="text-red-400 text-4xl font-bold">50%</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Host Info */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <img 
                        src={event.image} 
                        alt={event.host}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="text-white font-semibold text-sm">{event.host}</span>
                  </div>
                  
                  {/* Viewer Count */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    <Eye className="w-4 h-4" />
                    <span>{event.viewers}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors z-10"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors z-10"
        onClick={scrollNext}
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-purple-600' : 'bg-gray-300'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

const LiveShoppingUI = () => {
  const products = [
    {
      id: 1,
      name: "Premium Watch",
      price: "$299.99",
      seller: "John Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center",
      liveTaggable: true
    },
    {
      id: 2,
      name: "Premium Watch",
      price: "$299.99",
      seller: "John Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
      liveTaggable: true
    },
    {
      id: 3,
      name: "Premium Watch",
      price: "$299.99",
      seller: "John Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&crop=center",
      liveTaggable: true
    },
    {
      id: 4,
      name: "Premium Watch",
      price: "$299.99",
      seller: "John Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      liveTaggable: true
    }
  ];

  const liveEvents = [
    {
      id: 1,
      host: "Sarah Johnson",
      viewers: "2.4K watching",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600&h=300&fit=crop&crop=center",
      isLive: true,
      type: "sale",
      overlay: "SALE 50%"
    },
    {
      id: 2,
      host: "Sarah Johnson",
      viewers: "2.4K watching",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=300&fit=crop&crop=center",
      isLive: true,
      type: "normal"
    },
    {
      id: 3,
      host: "Sarah Johnson",
      viewers: "2.4K watching",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=300&fit=crop&crop=center",
      isLive: true,
      type: "normal"
    }
  ];

  const categories = [
    { id: 1, name: "Fashion", icon: Grid3X3 },
    { id: 2, name: "Electronics", icon: Monitor },
    { id: 3, name: "Home & Living", icon: Home },
    { id: 4, name: "Beauty", icon: Zap },
    { id: 5, name: "Sports", icon: Trophy },
    { id: 6, name: "Toys", icon: Car },
    { id: 7, name: "Digital Goods", icon: Laptop },
    { id: 8, name: "Others", icon: MoreHorizontal }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Summer Fashion Collection Launch",
      host: "Emma Davis",
      time: "Tomorrow, 2:00 PM",
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200&h=200&fit=crop&crop=center",
      category: "Fashion"
    },
    {
      id: 2,
      title: "Tech Gadgets Mega Sale",
      host: "Alex Chen",
      time: "Today, 8:00 PM",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center",
      category: "Electronics"
    },
    {
      id: 3,
      title: "Luxury Watches Showcase",
      host: "Michael Brown",
      time: "Tomorrow, 4:30 PM",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&crop=center",
      category: "Accessories"
    },
    {
      id: 4,
      title: "Beauty Products Flash Sale",
      host: "Sophie Wang",
      time: "Today, 9:00 PM",
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200&h=200&fit=crop&crop=center",
      category: "Beauty"
    },
    {
      id: 5,
      title: "Home Decor Special Event",
      host: "Laura Smith",
      time: "Tomorrow, 1:00 PM",
      image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=200&h=200&fit=crop&crop=center",
      category: "Home & Living"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Sellers" },
    { number: "1000+", label: "Live Events Today" },
    { number: "1M+", label: "Active Shoppers" }
  ];

  const quickLinks = [
    { title: "About Us", href: "#" },
    { title: "How it Works", href: "#" },
    { title: "Success Stories", href: "#" },
    { title: "Blog", href: "#" }
  ];

  const supportLinks = [
    { title: "Help Center", href: "#" },
    { title: "Contact Us", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Desktop Navigation */}
      <Navigation className="hidden md:block w-24 fixed left-0 top-0 h-full border-r border-gray-200" />

      {/* Main Content */}
      <main className="flex-1 md:ml-24 pb-20 md:pb-0">
        {/* Search Header */}
        <header className="bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by filter"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-purple-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Trending Banner Carousel */}
        <div className="px-4 py-4">
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex-none w-full">
                    <div className="bg-purple-700 h-32 rounded-lg flex items-center justify-center text-white text-xl">
                      Trending Banner {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((dot) => (
                <button key={dot} className={`w-2 h-2 rounded-full ${dot === 1 ? 'bg-purple-600' : 'bg-gray-300'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 py-4">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.id} className="bg-purple-100 rounded-lg p-3 text-center">
                  <IconComponent className="w-6 h-6 mx-auto mb-2 text-purple-700" />
                  <span className="text-sm text-gray-800">{category.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Now */}
        <div className="px-4 py-4">
          <h2 className="text-xl font-bold mb-4">Live Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {liveEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="relative bg-white rounded-lg overflow-hidden shadow">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img 
                    src={event.image} 
                    alt={`Live stream by ${event.host}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    LIVE
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{event.viewers}</span>
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-medium">
                    {event.type === 'sale' ? 'Fashion Flash Sale' : 'Tech Flash Sale'}
                  </h3>
                  <p className="text-xs text-gray-500">by {event.host}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="px-4 py-4">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow">
                <div className="relative w-full pb-[100%]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                  />
                  {product.liveTaggable && (
                    <div className="absolute top-1 right-1 bg-yellow-400 text-black px-1.5 py-0.5 rounded-full text-xs font-medium">
                      Live
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <h3 className="font-medium text-xs truncate mb-0.5">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-600 font-bold text-sm">{product.price}</span>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Live Section */}
        <div className="px-4 py-4">
          <h2 className="text-xl font-bold mb-4">Upcoming Live</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow p-2.5">
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      <span className="text-purple-600 text-xs font-medium">{event.time}</span>
                    </div>
                    <h3 className="font-medium text-sm mb-0.5 truncate">{event.title}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">by {event.host}</p>
                      <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px]">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors">
                    <Bell className="w-3 h-3" />
                    <span>Remind</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <Navigation className="fixed bottom-0 left-0 right-0 md:hidden border-t border-gray-200 bg-white" />
      </main>
    </div>
  );
};

export default LiveShoppingUI;
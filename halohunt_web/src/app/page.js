"use client";
import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Eye, Grid3X3, Monitor, Home, Zap, Trophy, Car, Laptop, MoreHorizontal, Clock, Bell, ShoppingCart, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const LiveShoppingUI = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [currentLiveSlide, setCurrentLiveSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  
  // Reference for the live events scroll container
  const liveScrollRef = React.useRef(null);
  const productsScrollRef = React.useRef(null);

  // Update window width on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Handle scroll for live events section
  const handleLiveScroll = () => {
    if (liveScrollRef.current) {
      const scrollPosition = liveScrollRef.current.scrollLeft;
      const viewWidth = liveScrollRef.current.clientWidth;
      const newSlide = Math.round(scrollPosition / viewWidth);
      setCurrentLiveSlide(newSlide);
    }
  };

  // Add scroll event listener for live events
  useEffect(() => {
    const scrollRef = liveScrollRef.current;
    if (scrollRef) {
      scrollRef.addEventListener('scroll', handleLiveScroll);
      return () => scrollRef.removeEventListener('scroll', handleLiveScroll);
    }
  }, [liveScrollRef.current]);

  // Handle scroll for products section
  const handleProductScroll = () => {
    if (productsScrollRef.current) {
      const scrollPosition = productsScrollRef.current.scrollLeft;
      const viewWidth = productsScrollRef.current.clientWidth;
      const newSlide = Math.round(scrollPosition / viewWidth);
      setCurrentProductSlide(newSlide);
    }
  };

  // Add scroll event listener for products
  useEffect(() => {
    const scrollRef = productsScrollRef.current;
    if (scrollRef) {
      scrollRef.addEventListener('scroll', handleProductScroll);
      return () => scrollRef.removeEventListener('scroll', handleProductScroll);
    }
  }, [productsScrollRef.current]);

  const products = [
    {
      id: 1,
      name: "Premium Watch",
      price: "$299.99",
      originalPrice: "$399.99",
      discount: "25%",
      seller: "John Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center",
      liveTaggable: true,
      tagger: {
        name: "Emma Wilson",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&auto=format"
      }
    },
    {
      id: 2,
      name: "Premium Watch",
      price: "$299.99",
      originalPrice: "$349.99",
      discount: "15%",
      seller: "John Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
      liveTaggable: true,
      tagger: {
        name: "Alex Chen",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format"
      }
    },
    {
      id: 3,
      name: "Premium Watch",
      price: "$299.99",
      originalPrice: "$399.99",
      discount: "25%",
      seller: "John Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&crop=center",
      liveTaggable: true,
      tagger: {
        name: "Sarah Kim",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces&auto=format"
      }
    },
    {
      id: 4,
      name: "Premium Watch",
      price: "$299.99",
      originalPrice: "$349.99",
      discount: "15%",
      seller: "John Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      liveTaggable: true,
      tagger: {
        name: "Mike Johnson",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&auto=format"
      }
    }
  ];

  const hotDeals = [
    {
      id: 1,
      name: "Smart Watches",
      startingPrice: "₹1,999",
      discount: "40%",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop&crop=center",
      bgColor: "#e3f2fd" // Light blue
    },
    {
      id: 2,
      name: "Premium Headphones",
      startingPrice: "₹2,499",
      discount: "35%",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center",
      bgColor: "#f3e5f5" // Light purple
    },
    {
      id: 3,
      name: "Fitness Trackers",
      startingPrice: "₹1,299",
      discount: "50%",
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&h=300&fit=crop&crop=center",
      bgColor: "#e8f5e9" // Light green
    }
  ];

  const liveEvents = [
    {
      id: 1,
      host: "Sarah Johnson",
      viewers: "2.4K watching",
      image: "/banners/b2.png",
      isLive: true,
      type: "sale",
      overlay: "SALE 50%"
    },
    {
      id: 2,
      host: "Sarah Johnson",
      viewers: "2.4K watching",
      image: "/banners/b2.png",
      isLive: true,
      type: "normal"
    },
    {
      id: 3,
      host: "Sarah Johnson",
      viewers: "2.4K watching",
      image: "/banners/b3.png",
      isLive: true,
      type: "normal"
    }
  ];

  const categories = [
    { 
      id: 1, 
      name: "Fashion", 
      icon: Grid3X3,
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=300&fit=crop&crop=center" // Fashion clothing rack
    },
    { 
      id: 2, 
      name: "Electronics", 
      icon: Monitor,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&crop=center" // Electronics gadgets
    },
    { 
      id: 3, 
      name: "Home & Living", 
      icon: Home,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop&crop=center" // Cozy living room
    },
    { 
      id: 4, 
      name: "Beauty", 
      icon: Zap,
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop&crop=center" // Beauty products
    },
    { 
      id: 5, 
      name: "Sports", 
      icon: Trophy,
      image: "https://images.unsplash.com/photo-1505843279827-4b522fae12fa?w=400&h=300&fit=crop&crop=center" // Sports equipment
    },
    { 
      id: 6, 
      name: "Toys", 
      icon: Car,
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=300&fit=crop&crop=center" // Toys
    },
    { 
      id: 7, 
      name: "Digital Goods", 
      icon: Laptop,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop&crop=center" // Digital workspace
    },
    { 
      id: 8, 
      name: "Others", 
      icon: MoreHorizontal,
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop&crop=center" // Miscellaneous
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Summer Fashion Collection Launch",
      host: "Emma Davis",
      time: "Tomorrow, 2:00 PM",
      image: "/banners/b1.png",
      category: "Fashion"
    },
    {
      id: 2,
      title: "Tech Gadgets Mega Sale",
      host: "Alex Chen",
      time: "Today, 8:00 PM",
      image: "/banners/b2.png",
      category: "Electronics"
    },
    {
      id: 3,
      title: "Luxury Watches Showcase",
      host: "Michael Brown",
      time: "Tomorrow, 4:30 PM",
      image: "/banners/b3.png",
      category: "Accessories"
    },
    {
      id: 4,
      title: "Beauty Products Flash Sale",
      host: "Sophie Wang",
      time: "Today, 9:00 PM",
      image: "/banners/b4.png",
      category: "Beauty"
    },
    {
      id: 5,
      title: "Home Decor Special Event",
      host: "Laura Smith",
      time: "Tomorrow, 1:00 PM",
      image: "/banners/b5.png",
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
    <>
      {/* Search Bar */}
      <div className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Logo for mobile view */}
          <div className="flex md:hidden p-0">
            <Image 
              src="/logo/h_purple.png" 
              alt="HaloHunt Logo" 
              width={80} 
              height={80}
            />
          </div>
          <div className="w-full max-w-md relative">
            <input
              type="text"
              placeholder="Search products, brands, or live streams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center gap-3">
            <Link href="/notifications" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          </div>
        </div>
      </div>

      {/* Add the CSS for hide-scrollbar directly in a style tag */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;             /* Chrome, Safari and Opera */
        }
        
        /* We're now using padding-bottom technique for consistent 16:9 aspect ratio
           instead of the aspect-ratio property for better cross-browser support */
        .pb-[56.25%] {
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
        }
      `}</style>

      {/* Cart Icon in Header */}
      {/* <div className="fixed top-4 right-4 z-50">
        <a href="/cart" className="relative bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
          <div className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            2
          </div>
          <ShoppingCart className="w-6 h-6 text-gray-700" />
        </a>
      </div> */}

      {/* Trending Banner Carousel */}
      <div className="px-4 py-4">
        <div className="relative">
          <div className="overflow-hidden rounded-lg w-full">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex-none w-full">
                  <img
                    src={`/banners/b${item}.png`}
                    alt={`Trending Banner ${item}`}
                    className="w-full object-cover rounded-lg"
                  />
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
      <div className="px-4 py-3">
        <h2 className="text-lg font-bold mb-3">Categories</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="flex flex-col items-center flex-shrink-0 mr-5">
                <div className="relative rounded-full w-16 h-16 flex items-center justify-center border border-none mb-1.5">
                  <IconComponent className="w-7 h-7 text-gray-700" />
                  {/* <div className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400 rounded-b-full"></div> */}
                </div>
                <span className="text-xs text-gray-800 whitespace-nowrap">{category.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Now */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Live Now</h2>
          <button className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 text-sm font-medium">
            Explore More Lives
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          {/* Swipable live events container */}
          <div className="flex overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory" ref={liveScrollRef}>
            {liveEvents.map((event) => (
              <div 
                key={event.id} 
                className="flex-shrink-0 snap-start mr-4"
                style={{
                  width: windowWidth < 768 ? 'calc(100% - 16px)' : 'calc(50% - 16px)',
                  maxWidth: windowWidth < 768 ? 'none' : '320px',
                  height: '100%'
                }}
              >
                <div className="relative bg-white rounded-lg overflow-hidden shadow h-full">
                  <div className="w-full relative">
                    {/* Using padding-bottom for 16:9 aspect ratio */}
                    <div className="w-full relative pb-[56.25%]">
                      <img 
                        src={event.image} 
                        alt={`Live stream by ${event.host}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      LIVE
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span className="block sm:hidden">{event.viewers.replace(/\s*watching/i, '')}</span>
                      <span className="hidden sm:block">{event.viewers}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium">
                      {event.type === 'sale' ? 'Fashion Flash Sale' : 'Tech Flash Sale'}
                    </h3>
                    <p className="text-xs text-gray-500">by {event.host}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center gap-1 mt-3">
            {liveEvents.map((_, i) => (
              <div
                key={`dot-${i}`}
                className={`w-2 h-2 rounded-full cursor-pointer ${i === currentLiveSlide ? 'bg-purple-600' : 'bg-gray-300'}`}
                onClick={() => {
                  if (liveScrollRef.current) {
                    const viewWidth = liveScrollRef.current.clientWidth;
                    liveScrollRef.current.scrollTo({
                      left: i * viewWidth,
                      behavior: 'smooth'
                    });
                    setCurrentLiveSlide(i);
                  }
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Products</h2>
          <Link href="/search" className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 text-sm font-medium">
            View All Products
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="relative">
          <div 
            className="flex overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
            ref={productsScrollRef}
            onScroll={handleProductScroll}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 snap-start mr-4"
                style={{
                  width: windowWidth < 768 ? 'calc(50% - 8px)' : windowWidth < 1024 ? 'calc(50% - 16px)' : 'calc(33.333% - 16px)',
                  maxWidth: windowWidth < 768 ? '180px' : '320px',
                  height: '100%'
                }}
              >
                <Link href={`/search/${product.id}`} className="block h-full">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                    <div className="relative">
                      <div className="w-full relative pb-[56.25%]">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold shadow-sm">
                          -{product.discount}
                        </div>
                      )}
                      {product.liveTaggable && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-2">
                          <img 
                            src={product.tagger.image} 
                            alt={product.tagger.name}
                            className="w-6 h-6 rounded-full border-2 border-white"
                          />
                          <span className="text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded-full">
                            {product.tagger.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-2 sm:p-3">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-xs sm:text-sm font-medium text-purple-600">{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through sm:ml-1.5">{product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                          {product.rating}
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = '/cart';
                        }} 
                        className="mt-2 w-full bg-purple-100 text-purple-600 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-purple-200 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination dots for products */}
          <div className="flex justify-center gap-1 mt-3">
            {products.map((_, i) => (
              <div
                key={`product-dot-${i}`}
                className={`w-2 h-2 rounded-full cursor-pointer ${i === currentProductSlide ? 'bg-purple-600' : 'bg-gray-300'}`}
                onClick={() => {
                  if (productsScrollRef.current) {
                    const viewWidth = productsScrollRef.current.clientWidth;
                    productsScrollRef.current.scrollTo({
                      left: i * viewWidth,
                      behavior: 'smooth'
                    });
                    setCurrentProductSlide(i);
                  }
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Hot Deals Section */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Hot Deals</h2>
          <Link href="/search?category=deals" className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 text-sm font-medium">
            View All Deals
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {hotDeals.map((deal) => (
            <Link key={deal.id} href={`/search?deal=${deal.id}`} className="block">
              <div 
                className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-32 sm:h-40 relative"
                style={{ backgroundColor: deal.bgColor }}
              >
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 p-3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-gray-800 font-bold text-lg sm:text-xl">{deal.name}</h3>
                      <div className="mt-1 bg-purple-600 text-white px-2 py-0.5 rounded text-xs sm:text-sm inline-block font-semibold">
                        Up to {deal.discount} OFF
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm">
                      From <span className="font-bold">₹{deal.startingPrice.replace('₹', '')}</span>
                    </p>
                  </div>
                  <div className="w-1/2 flex items-center justify-center relative">
                    <img 
                      src={deal.image} 
                      alt={deal.name}
                      className="h-24 sm:h-32 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </Link>
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
                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 aspect-w-4 aspect-h-3">
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
    </>
  );
};

export default LiveShoppingUI;
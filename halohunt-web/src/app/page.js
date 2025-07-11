"use client";
import React, { useState } from 'react';
import { ChevronRight, Star, Eye, Grid3X3, Monitor, Home, Zap, Trophy, Car, Laptop, MoreHorizontal, Clock, Bell, ShoppingCart, Search, Menu } from 'lucide-react';
import Link from 'next/link';

const LiveShoppingUI = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    {
      id: 1,
      name: "Premium Watch",
      price: "$299.99",
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
    <>
      {/* Search Bar */}
      <div className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between gap-6">
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Live Now</h2>
          <button className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 text-sm font-medium">
            Explore More Lives
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Products</h2>
          <Link href="/search" className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 text-sm font-medium">
            View All Products
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {products.map((product) => (
            <Link key={product.id} href={`/search/${product.id}`} className="block">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                <div className="aspect-w-1 aspect-h-1 relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
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
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-600">{product.price}</span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      {product.rating}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/cart';
                    }} 
                    className="mt-2 w-full bg-purple-100 text-purple-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
                  >
                    Add to Cart
                  </button>
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
    </>
  );
};

export default LiveShoppingUI;
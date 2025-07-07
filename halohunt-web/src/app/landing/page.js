import React from 'react';
import { ChevronLeft, ChevronRight, Star, Eye, Grid3X3, Monitor, Home, Zap, Trophy, Car, Laptop, MoreHorizontal, Clock, Search, Bell, ShoppingCart, User, Play, DollarSign, Users, ShieldCheck, Video, Gift } from 'lucide-react';

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
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c3e8?w=600&h=300&fit=crop&crop=center",
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
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200&h=200&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Summer Fashion Collection Launch",
      host: "Emma Davis",
      time: "Tomorrow, 2:00 PM",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center"
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

  const features = [
    {
      icon: Video,
      title: "Real-Time Live Streaming",
      description: "High-quality, low-latency streaming with interactive features for seamless seller-buyer engagement."
    },
    {
      icon: ShoppingCart,
      title: "Instant Purchase",
      description: "One-click buying during live streams with secure payment processing and order tracking."
    },
    {
      icon: Users,
      title: "Social Shopping",
      description: "Interactive chat, reactions, and social features to enhance the shopping experience."
    },
    {
      icon: ShieldCheck,
      title: "Secure Transactions",
      description: "End-to-end encrypted payments and buyer protection guarantee."
    }
  ];

  const sellerBenefits = [
    {
      title: "Increased Engagement",
      value: "300%",
      description: "Higher customer engagement compared to traditional e-commerce"
    },
    {
      title: "Sales Conversion",
      value: "5x",
      description: "Better conversion rates through live interaction"
    },
    {
      title: "Average Order Value",
      value: "+75%",
      description: "Higher order values during live shopping events"
    }
  ];

  const upcomingCategories = [
    {
      title: "Fashion Week Special",
      date: "Starting March 15",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop"
    },
    {
      title: "Tech Gadgets Expo",
      date: "Starting March 20",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop"
    },
    {
      title: "Home & Living Sale",
      date: "Starting March 25",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-purple-700">HaloHunt</h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products or sellers"
                  className="w-[400px] pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="text-gray-600 hover:text-purple-700">
                <Bell className="w-6 h-6" />
              </button>
              <button className="text-gray-600 hover:text-purple-700">
                <ShoppingCart className="w-6 h-6" />
              </button>
              <button className="text-gray-600 hover:text-purple-700">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Updated */}
      <div className="bg-gradient-to-r from-purple-100 to-purple-50 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Transform Your Shopping Experience with Live Commerce
              </h1>
              <p className="text-xl text-purple-600 mb-8 font-medium">
                Join thousands of sellers and millions of shoppers in the future of e-commerce. Real-time engagement, instant sales, and authentic connections.
              </p>
              <div className="flex gap-4">
                <button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200">
                  Start Shopping
                </button>
                <button className="border-2 border-purple-700 text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200">
                  Become a Seller
                </button>
              </div>
              <div className="mt-8 flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-600">50K+ Active Sellers</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-600">Secure Platform</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-purple-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=450&fit=crop" 
                  alt="Live Shopping Experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div className="flex items-center gap-4">
                    <button className="bg-red-500 text-white p-3 rounded-full">
                      <Play className="w-6 h-6" />
                    </button>
                    <div className="text-white">
                      <p className="font-semibold">Watch Live Demo</p>
                      <p className="text-sm opacity-75">See how it works</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Why Choose HaloHunt</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Experience the future of e-commerce with our cutting-edge live shopping platform
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trending Section - Keep existing but add category filter */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Trending Now</h2>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition-colors">
              All Categories
            </button>
            <button className="px-4 py-2 rounded-full text-gray-600 font-medium hover:bg-gray-100 transition-colors">
              Fashion
            </button>
            <button className="px-4 py-2 rounded-full text-gray-600 font-medium hover:bg-gray-100 transition-colors">
              Electronics
            </button>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                {product.liveTaggable && (
                  <span className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    Live Taggable
                  </span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-purple-600 mb-2">{product.price}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>by {product.seller}</span>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{product.rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seller Benefits */}
      <div className="bg-purple-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Grow Your Business with Live Selling</h2>
            <p className="text-purple-200 max-w-2xl mx-auto">
              Join thousands of successful sellers who have transformed their business with our live shopping platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sellerBenefits.map((benefit, index) => (
              <div key={index} className="bg-purple-800 rounded-xl p-8 text-center">
                <div className="text-4xl font-bold text-purple-200 mb-2">{benefit.value}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-purple-300">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200">
              Start Selling Today
            </button>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Featured Shopping Events</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Don't miss out on these exclusive live shopping events
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingCategories.map((category, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl">
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-purple-200">{category.date}</p>
                <button className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
                  Set Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Shopping Events */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Live Shopping Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveEvents.map((event) => (
            <div key={event.id} className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="relative">
                <img 
                  src={event.image} 
                  alt={`Live stream by ${event.host}`}
                  className="w-full h-48 object-cover"
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
          ))}
        </div>
      </div>

      {/* Explore Categories */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="bg-purple-50 hover:bg-purple-100 transition-colors duration-200 rounded-xl p-6 text-center cursor-pointer">
                <div className="flex justify-center mb-4">
                  <IconComponent className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coming Soon */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Coming Soon</h2>
        
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-500 rounded-lg overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-600 font-medium">{event.time}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-gray-600">by {event.host}</p>
                  </div>
                </div>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold transition-colors duration-200">
                  Set Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Our Community */}
      <div className="bg-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Join Our Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-purple-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download App Section */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Get the HaloHunt App</h2>
              <p className="text-purple-200 mb-8">
                Never miss a live shopping event. Get instant notifications, exclusive deals, and shop on the go with our mobile app.
              </p>
              <div className="flex gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 12.316l-3.257 1.826L9.91 12.316l3.883-2.176 3.257 2.176zM12.002.002c-.41 0-.82.103-1.178.309L4.238 4.73C3.52 5.16 3 6.008 3 6.916v10.168c0 .908.52 1.756 1.238 2.186l6.586 4.42c.716.43 1.664.43 2.38 0l6.586-4.42c.718-.43 1.238-1.278 1.238-2.186V6.916c0-.908-.52-1.756-1.238-2.186l-6.586-4.42c-.358-.206-.768-.309-1.178-.309z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=700&fit=crop" 
                alt="HaloHunt Mobile App"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-purple-100 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Gift className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm font-semibold text-purple-900">Get $10 Off</p>
                    <p className="text-xs text-purple-600">On your first purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4">HaloHunt</h3>
              <p className="text-purple-300 mb-4">
                Making live shopping more engaging and accessible for everyone.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-purple-300 hover:text-white transition-colors">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-purple-300 hover:text-white transition-colors">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-purple-300 mb-4">
                Stay updated with our latest features and releases.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
                />
                <button className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-12 pt-8 border-t border-purple-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-300 text-sm">
              © 2024 HaloHunt. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-purple-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-purple-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-purple-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-purple-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-5.904 12.705c.449.075.844.075 1.2.075 1.199 0 2.097-.525 2.097-1.702 0-.925-.648-1.424-1.497-1.724v-.075c.697-.299 1.197-.824 1.197-1.648 0-.975-.747-1.574-2.197-1.574-.449 0-.945.075-1.297.075v6.573zm.797-2.982h.449c.848 0 1.249.375 1.249.975s-.4.974-1.25.974h-.449v-1.949zm0-2.551h.35c.798 0 1.148.35 1.148.85 0 .549-.349.924-1.148.924h-.35V9.47z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LiveShoppingUI;
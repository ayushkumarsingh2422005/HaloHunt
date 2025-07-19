"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  Star, Heart, X, ChevronLeft, Play, Eye, 
  Clock, Calendar, Trash2, Video, ShoppingBag
} from 'lucide-react';

const FavoritesPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  
  // Mock saved products data
  const savedProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      discountPrice: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80",
      rating: 4.8,
      reviews: 1234,
      seller: {
        id: "creator-1",
        name: "Tech World",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&auto=format"
      },
      savedDate: "2 days ago"
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 399.99,
      discountPrice: null,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&q=80",
      rating: 4.9,
      reviews: 856,
      seller: {
        id: "creator-2",
        name: "Smart Gear",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format"
      },
      savedDate: "1 week ago"
    },
    {
      id: 3,
      name: "Designer Leather Handbag",
      price: 199.99,
      discountPrice: 149.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&q=80",
      rating: 4.7,
      reviews: 543,
      seller: {
        id: "creator-3",
        name: "Fashion Hub",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces&auto=format"
      },
      savedDate: "2 weeks ago"
    },
    {
      id: 4,
      name: "Running Shoes Pro",
      price: 129.99,
      discountPrice: null,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80",
      rating: 4.6,
      reviews: 921,
      seller: {
        id: "creator-4",
        name: "Sports Elite",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&auto=format"
      },
      savedDate: "3 weeks ago"
    }
  ];

  // Mock saved lives data
  const savedLives = [
    {
      id: "live-1",
      title: "Summer Fashion Collection Launch",
      host: {
        id: "creator-3",
        name: "Fashion Hub",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces&auto=format"
      },
      thumbnail: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop",
      scheduledDate: "Tomorrow, 2:00 PM",
      savedDate: "Yesterday",
      isLive: false,
      viewers: null
    },
    {
      id: "live-2",
      title: "Tech Gadgets Mega Sale",
      host: {
        id: "creator-1",
        name: "Tech World",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&auto=format"
      },
      thumbnail: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
      scheduledDate: null,
      savedDate: "3 days ago",
      isLive: true,
      viewers: 2450
    },
    {
      id: "live-3",
      title: "Fitness Equipment Showcase",
      host: {
        id: "creator-4",
        name: "Sports Elite",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&auto=format"
      },
      thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
      scheduledDate: "Saturday, 4:30 PM",
      savedDate: "1 week ago",
      isLive: false,
      viewers: null
    }
  ];

  const TabButton = ({ tab, icon: Icon, label }) => {
    return (
      <button
        onClick={() => setActiveTab(tab)}
        className={`flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition-colors ${
          activeTab === tab
            ? 'border-purple-600 text-purple-600'
            : 'border-transparent text-gray-600 hover:text-gray-900'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </button>
    );
  };

  const ProductCard = ({ product, onRemove }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <Link href={`/search/${product.id}`} className="block">
            <div className="aspect-square relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <button 
            onClick={() => onRemove(product.id)}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <Link href={`/search/${product.id}`} className="block p-3">
          <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              {product.discountPrice ? (
                <>
                  <span className="text-sm font-bold text-purple-600">${product.discountPrice}</span>
                  <span className="text-xs text-gray-500 line-through">${product.price}</span>
                </>
              ) : (
                <span className="text-sm font-bold text-gray-900">${product.price}</span>
              )}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
              {product.rating}
            </div>
          </div>
        </Link>
        <div className="px-3 pb-3 pt-1 border-t border-gray-100">
          <Link href={`/profile/${product.seller.id}`} className="flex items-center gap-2">
            <img 
              src={product.seller.avatar} 
              alt={product.seller.name}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-xs text-gray-600 truncate">{product.seller.name}</span>
          </Link>
        </div>
      </div>
    );
  };

  const LiveCard = ({ live, onRemove }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <Link href={live.isLive ? `/live/view/${live.id}` : `/live/${live.id}`} className="block">
            <div className="aspect-video relative">
              <img 
                src={live.thumbnail} 
                alt={live.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              
              {live.isLive ? (
                <>
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    LIVE
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{live.viewers.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>{live.scheduledDate}</span>
                </div>
              )}
            </div>
          </Link>
          <button 
            onClick={() => onRemove(live.id)}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-3">
          <Link href={live.isLive ? `/live/view/${live.id}` : `/live/${live.id}`} className="block">
            <h3 className="text-sm font-medium text-gray-900 truncate">{live.title}</h3>
          </Link>
          <Link href={`/profile/${live.host.id}`} className="flex items-center gap-2 mt-2">
            <img 
              src={live.host.avatar} 
              alt={live.host.name}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-xs text-gray-600 truncate">{live.host.name}</span>
          </Link>
        </div>
      </div>
    );
  };

  const handleRemoveProduct = (productId) => {
    // In a real app, this would remove the product from favorites
    console.log(`Removing product ${productId} from favorites`);
  };

  const handleRemoveLive = (liveId) => {
    // In a real app, this would remove the live from favorites
    console.log(`Removing live ${liveId} from favorites`);
  };

  const handleClearAll = () => {
    // In a real app, this would clear all favorites of the active type
    console.log(`Clearing all ${activeTab}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span>Back</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">My Favorites</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="bg-white rounded-t-lg shadow-sm">
          <div className="flex border-b border-gray-200">
            <TabButton tab="products" icon={ShoppingBag} label="Products" />
            <TabButton tab="lives" icon={Video} label="Live Streams" />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              {activeTab === 'products' 
                ? `${savedProducts.length} saved products` 
                : `${savedLives.length} saved live streams`}
            </p>
            {((activeTab === 'products' && savedProducts.length > 0) || 
              (activeTab === 'lives' && savedLives.length > 0)) && (
              <button 
                onClick={handleClearAll}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {activeTab === 'products' && (
            <>
              {savedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {savedProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onRemove={handleRemoveProduct} 
                    />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Heart className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No saved products</h3>
                  <p className="text-gray-500 mb-4">Products you save will appear here</p>
                  <Link 
                    href="/search" 
                    className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Explore Products
                  </Link>
                </div>
              )}
            </>
          )}

          {activeTab === 'lives' && (
            <>
              {savedLives.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedLives.map(live => (
                    <LiveCard 
                      key={live.id} 
                      live={live} 
                      onRemove={handleRemoveLive} 
                    />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Heart className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No saved live streams</h3>
                  <p className="text-gray-500 mb-4">Live streams you save will appear here</p>
                  <Link 
                    href="/live" 
                    className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Explore Live Streams
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* Recently Viewed Section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedProducts.slice(0, 4).map(product => (
              <Link key={product.id} href={`/search/${product.id}`} className="block">
                <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.savedDate}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage; 
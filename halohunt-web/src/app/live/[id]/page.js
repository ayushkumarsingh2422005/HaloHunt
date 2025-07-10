"use client";
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Eye, Heart, Share2, MessageCircle, 
  Send, ShoppingBag, ChevronDown, ChevronUp,
  MoreHorizontal, User, Gift, ThumbsUp, Flag,
  X, ExternalLink, DollarSign, Video
} from 'lucide-react';

// Dummy data for the live stream
const DUMMY_LIVE_DATA = {
  id: "123456",
  title: "Summer Fashion Collection Showcase 2024",
  description: "Join us for an exclusive preview of our summer collection! Use code SUMMER20 for 20% off all items featured in this stream.",
  host: {
    id: "host123",
    name: "Fashion Forward",
    image: "https://i.pravatar.cc/150?img=32",
    followers: 15400,
    verified: true
  },
  stats: {
    viewers: 1245,
    likes: 856,
    shares: 124
  },
  startedAt: "2024-06-15T14:30:00Z",
  duration: "01:23:45",
  tags: ["fashion", "summer", "new collection", "exclusive"]
};

// Dummy data for products
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    name: "Summer Breeze Dress",
    price: 79.99,
    discountPrice: 59.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop",
    featured: true
  },
  {
    id: "p2",
    name: "Ocean Wave Sunglasses",
    price: 45.00,
    discountPrice: null,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=400&fit=crop"
  },
  {
    id: "p3",
    name: "Tropical Paradise Shirt",
    price: 65.00,
    discountPrice: 49.99,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=400&fit=crop"
  },
  {
    id: "p4",
    name: "Beach Day Sandals",
    price: 35.99,
    discountPrice: null,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop"
  },
  {
    id: "p5",
    name: "Sunset Tote Bag",
    price: 49.99,
    discountPrice: 39.99,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=300&h=400&fit=crop"
  }
];

// Dummy data for chat messages
const DUMMY_CHAT_MESSAGES = [
  {
    id: "m1",
    user: {
      id: "u1",
      name: "Sarah J.",
      image: "https://i.pravatar.cc/150?img=1"
    },
    message: "That dress is gorgeous! Is it available in blue?",
    timestamp: "2 min ago"
  },
  {
    id: "m2",
    user: {
      id: "u2",
      name: "Mike T.",
      image: "https://i.pravatar.cc/150?img=2"
    },
    message: "Just ordered the sunglasses! Can't wait to get them.",
    timestamp: "1 min ago"
  },
  {
    id: "m3",
    user: {
      id: "u3",
      name: "Emma L.",
      image: "https://i.pravatar.cc/150?img=3"
    },
    message: "How's the sizing on the tropical shirt?",
    timestamp: "45 sec ago"
  },
  {
    id: "m4",
    user: {
      id: "host123",
      name: "Fashion Forward",
      image: "https://i.pravatar.cc/150?img=32",
      isHost: true
    },
    message: "The Summer Breeze Dress comes in blue, red, and white! The tropical shirt runs true to size.",
    timestamp: "30 sec ago"
  },
  {
    id: "m5",
    user: {
      id: "u4",
      name: "Alex K.",
      image: "https://i.pravatar.cc/150?img=4"
    },
    message: "Are these sandals waterproof?",
    timestamp: "20 sec ago"
  },
  {
    id: "m6",
    user: {
      id: "u5",
      name: "Jessica P.",
      image: "https://i.pravatar.cc/150?img=5"
    },
    message: "Love the collection! Will there be more colors available for the tote bag?",
    timestamp: "10 sec ago"
  }
];

const ProductCard = ({ product }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
        <div className="flex items-center gap-2 mt-1">
          {product.discountPrice ? (
            <>
              <span className="text-sm font-bold text-purple-600">${product.discountPrice}</span>
              <span className="text-xs text-gray-500 line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-sm font-bold text-gray-900">${product.price}</span>
          )}
        </div>
      </div>
      <button className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
        <ShoppingBag className="w-4 h-4" />
      </button>
    </div>
  );
};

const ChatMessage = ({ message }) => {
  return (
    <div className="flex gap-2 mb-3">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
        <img 
          src={message.user.image} 
          alt={message.user.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className={`text-xs font-bold ${message.user.isHost ? 'text-purple-600' : 'text-gray-900'}`}>
            {message.user.name}
            {message.user.isHost && (
              <span className="ml-1 px-1 py-0.5 bg-purple-100 text-purple-600 rounded text-[10px] font-medium">HOST</span>
            )}
          </span>
          <span className="text-[10px] text-gray-500">{message.timestamp}</span>
        </div>
        <p className="text-sm text-gray-700">{message.message}</p>
      </div>
    </div>
  );
};

export default function LiveStreamPage() {
  const params = useParams();
  const { id } = params;
  
  const [liveData, setLiveData] = useState(DUMMY_LIVE_DATA);
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [chatMessages, setChatMessages] = useState(DUMMY_CHAT_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [showProducts, setShowProducts] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  
  const chatContainerRef = useRef(null);
  const videoRef = useRef(null);
  
  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);
  
  // Simulate receiving new chat messages
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUsers = [
        { id: "u6", name: "David R.", image: "https://i.pravatar.cc/150?img=6" },
        { id: "u7", name: "Michelle S.", image: "https://i.pravatar.cc/150?img=7" },
        { id: "u8", name: "Robert T.", image: "https://i.pravatar.cc/150?img=8" }
      ];
      
      const randomMessages = [
        "Is this available in my size?",
        "When will these ship?",
        "Love the design!",
        "Do you offer international shipping?",
        "Can you show the blue one again?",
        "What material is this made of?"
      ];
      
      const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      
      const newMessage = {
        id: `m${Date.now()}`,
        user: randomUser,
        message: randomMessage,
        timestamp: "just now"
      };
      
      setChatMessages(prev => [...prev, newMessage]);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: `m${Date.now()}`,
      user: {
        id: "viewer",
        name: "You",
        image: "https://i.pravatar.cc/150?img=33"
      },
      message: newMessage,
      timestamp: "just now"
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLiveData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          likes: prev.stats.likes + 1
        }
      }));
    } else {
      setLiveData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          likes: prev.stats.likes - 1
        }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:h-[calc(100vh-2rem)] lg:overflow-hidden">
          {/* Main Content - Video and Info - Independently Scrollable */}
          <div className="lg:col-span-2 lg:overflow-y-auto lg:pr-2" style={{ height: 'auto', maxHeight: 'calc(100vh - 2rem)' }}>
            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-purple-600/80 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="bg-red-500/90 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>
                <div className="bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {liveData.stats.viewers.toLocaleString()}
                </div>
              </div>
              <video 
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=675&fit=crop"
              />
            </div>
            
            {/* Stream Info */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h1 className="text-xl font-bold text-gray-900 mb-2">{liveData.title}</h1>
              <div className="flex flex-wrap items-center justify-between gap-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={liveData.host.image} 
                      alt={liveData.host.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="text-sm font-medium text-gray-900">{liveData.host.name}</h3>
                      {liveData.host.verified && (
                        <span className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-[8px]">✓</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{liveData.host.followers.toLocaleString()} followers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <button 
                    onClick={handleLike}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                      isLiked 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-purple-600' : ''}`} />
                    {liveData.stats.likes.toLocaleString()}
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-200">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700">{liveData.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {liveData.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Featured Products - Mobile Only */}
            <div className="lg:hidden bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-medium text-gray-900">Featured Products</h2>
                <button 
                  onClick={() => setShowProducts(!showProducts)}
                  className="text-purple-600"
                >
                  {showProducts ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
              
              {showProducts && (
                <div className="space-y-3">
                  {products.slice(0, 3).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                  <Link 
                    href="#" 
                    className="block text-center py-2 text-sm text-purple-600 font-medium hover:underline"
                  >
                    View All Products
                  </Link>
                </div>
              )}
            </div>

            {/* Live Chat - Mobile Only */}
            <div className="lg:hidden bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-medium text-gray-900">Live Chat</h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowChat(!showChat)}
                    className="text-purple-600"
                  >
                    {showChat ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {showChat && (
                <>
                  {/* Chat Messages */}
                  <div 
                    className="overflow-y-auto p-3 space-y-1 bg-gray-50"
                    style={{ height: '300px' }}
                  >
                    {chatMessages.map(message => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                  </div>
                  
                  {/* Chat Input */}
                  <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Say something..."
                          className="w-full py-2 px-3 pr-10 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                        />
                        <button 
                          type="submit"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-600 p-1"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Additional content for scrolling demonstration */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-lg font-medium mb-2">About This Stream</h2>
              <p className="text-sm text-gray-700 mb-3">
                This live shopping event showcases our latest collection with exclusive discounts for viewers. 
                Our host will demonstrate each product and answer your questions in real-time.
              </p>
              <p className="text-sm text-gray-700 mb-3">
                Remember to use code SUMMER20 at checkout for 20% off featured items. 
                Limited quantities available, so don't miss out!
              </p>
              <p className="text-sm text-gray-700">
                All purchases made during the stream will be eligible for free shipping and our extended 30-day return policy.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-lg font-medium mb-2">Upcoming Streams</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Fall Collection Preview</h4>
                    <p className="text-xs text-gray-500">Tomorrow, 3:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Accessories Showcase</h4>
                    <p className="text-xs text-gray-500">Friday, 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar - Chat and Products - Independently Scrollable - Desktop Only */}
          <div className="hidden lg:flex lg:col-span-1 lg:h-[calc(100vh-2rem)] lg:overflow-hidden flex-col">
            {/* Products Section - Desktop Only */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4 lg:overflow-y-auto" style={{ maxHeight: '40%' }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-medium text-gray-900">Featured Products</h2>
                <Link 
                  href="#" 
                  className="text-sm text-purple-600 font-medium hover:underline flex items-center gap-1"
                >
                  View All
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
            
            {/* Live Chat - Desktop Only */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col lg:flex-1">
              <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-medium text-gray-900">Live Chat</h2>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Gift className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-3 space-y-1 bg-gray-50"
                style={{ height: '100%' }}
              >
                {chatMessages.map(message => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>
              
              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Say something..."
                      className="w-full py-2 px-3 pr-10 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-600 p-1"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
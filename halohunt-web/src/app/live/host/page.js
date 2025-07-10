"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Video, Mic, MicOff, VideoOff, Users, 
  MessageSquare, ShoppingBag, Settings, 
  X, Plus, ChevronRight, ChevronLeft, 
  Share2, MoreHorizontal, Tag, Search,
  Camera, Check, Trash2, Edit, Eye
} from 'lucide-react';

// Sample product data for tagging
const SAMPLE_PRODUCTS = [
  {
    id: "p1",
    name: "Modern Desk Lamp",
    price: 59.99,
    discountPrice: 49.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=400&fit=crop",
    inStock: true
  },
  {
    id: "p2",
    name: "Minimalist Watch",
    price: 129.99,
    discountPrice: null,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop",
    inStock: true
  },
  {
    id: "p3",
    name: "Wireless Earbuds",
    price: 89.99,
    discountPrice: 69.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=400&fit=crop",
    inStock: true
  },
  {
    id: "p4",
    name: "Leather Wallet",
    price: 45.00,
    discountPrice: null,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=400&fit=crop",
    inStock: false
  },
  {
    id: "p5",
    name: "Smart Speaker",
    price: 79.99,
    discountPrice: 59.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=300&h=400&fit=crop",
    inStock: true
  }
];

// Sample chat messages
const SAMPLE_CHAT_MESSAGES = [
  {
    id: "m1",
    user: {
      name: "Sarah J.",
      image: "https://i.pravatar.cc/150?img=1"
    },
    message: "Is that lamp dimmable?",
    timestamp: "2 min ago"
  },
  {
    id: "m2",
    user: {
      name: "Mike T.",
      image: "https://i.pravatar.cc/150?img=2"
    },
    message: "The watch looks great! Does it come in other colors?",
    timestamp: "1 min ago"
  },
  {
    id: "m3",
    user: {
      name: "Emma L.",
      image: "https://i.pravatar.cc/150?img=3"
    },
    message: "What's the battery life on those earbuds?",
    timestamp: "45 sec ago"
  }
];

const TaggedProduct = ({ product, onRemove }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 mb-2 group">
      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
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
      <button 
        onClick={onRemove}
        className="p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

const ProductSearchItem = ({ product, onAdd, isAdded }) => {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
      <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
        <div className="flex items-center gap-2">
          {product.discountPrice ? (
            <span className="text-xs font-medium text-purple-600">${product.discountPrice}</span>
          ) : (
            <span className="text-xs font-medium text-gray-900">${product.price}</span>
          )}
          {!product.inStock && (
            <span className="text-xs text-red-500">Out of stock</span>
          )}
        </div>
      </div>
      <button 
        onClick={onAdd}
        disabled={isAdded || !product.inStock}
        className={`p-1.5 rounded-full ${
          isAdded 
            ? 'bg-purple-100 text-purple-600' 
            : product.inStock 
              ? 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
          <span className="text-xs font-bold text-gray-900">{message.user.name}</span>
          <span className="text-[10px] text-gray-500">{message.timestamp}</span>
        </div>
        <p className="text-sm text-gray-700">{message.message}</p>
      </div>
    </div>
  );
};

export default function HostPage() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [streamTitle, setStreamTitle] = useState("New Product Showcase");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [showProductPanel, setShowProductPanel] = useState(false);
  const [showChatPanel, setShowChatPanel] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [taggedProducts, setTaggedProducts] = useState([]);
  const [chatMessages, setChatMessages] = useState(SAMPLE_CHAT_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  
  const chatContainerRef = useRef(null);
  
  // Filter products based on search query
  const filteredProducts = SAMPLE_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Start camera stream
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const startCamera = async () => {
        try {
          const constraints = { video: true, audio: true };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera and microphone:", err);
        }
      };
      
      startCamera();
      
      // Clean up function to stop all tracks when component unmounts
      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    }
  }, []);
  
  // Simulate viewers joining
  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(() => {
        setViewerCount(prev => prev + Math.floor(Math.random() * 3));
      }, 5000);
      
      return () => clearInterval(interval);
    } else {
      setViewerCount(0);
    }
  }, [isStreaming]);
  
  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);
  
  // Simulate receiving chat messages
  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(() => {
        const randomUsers = [
          { name: "David R.", image: "https://i.pravatar.cc/150?img=6" },
          { name: "Michelle S.", image: "https://i.pravatar.cc/150?img=7" },
          { name: "Robert T.", image: "https://i.pravatar.cc/150?img=8" }
        ];
        
        const randomMessages = [
          "Is this available in my size?",
          "When will these ship?",
          "Love the design!",
          "Do you offer international shipping?",
          "Can you show that again?",
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
    }
  }, [isStreaming]);
  
  const handleStartStream = () => {
    setIsStreaming(true);
  };
  
  const handleEndStream = () => {
    setIsStreaming(false);
    router.push('/profile');
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const hostMessage = {
      id: `m${Date.now()}`,
      user: {
        name: "You (Host)",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces&auto=format"
      },
      message: newMessage,
      timestamp: "just now"
    };
    
    setChatMessages(prev => [...prev, hostMessage]);
    setNewMessage('');
  };
  
  const toggleMic = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const audioTrack = videoRef.current.srcObject.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsMicOn(!isMicOn);
      }
    }
  };
  
  const toggleVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const videoTrack = videoRef.current.srcObject.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn(!isVideoOn);
      }
    }
  };
  
  const handleAddProduct = (product) => {
    if (!taggedProducts.some(p => p.id === product.id)) {
      setTaggedProducts(prev => [...prev, product]);
    }
  };
  
  const handleRemoveProduct = (productId) => {
    setTaggedProducts(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:h-[calc(100vh-2rem)] lg:overflow-hidden">
          {/* Main Content - Video Stream */}
          <div className="lg:col-span-2 flex flex-col lg:overflow-hidden">
            {/* Stream Title */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center justify-between">
              {isEditingTitle ? (
                <input 
                  type="text"
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                  autoFocus
                  className="text-lg font-medium text-gray-900 border-b border-gray-300 focus:outline-none focus:border-purple-500 w-full"
                />
              ) : (
                <h1 
                  className="text-lg font-medium text-gray-900 flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {streamTitle} 
                  <Edit className="w-4 h-4 text-gray-400" />
                </h1>
              )}
              
              {isStreaming && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-red-500/90 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    <Eye className="w-3 h-3" />
                    {viewerCount}
                  </div>
                </div>
              )}
            </div>
            
            {/* Video Preview */}
            <div className="relative bg-black rounded-lg overflow-hidden flex-grow mb-4">
              <video 
                ref={videoRef}
                autoPlay
                playsInline
                muted={!isMicOn}
                className="w-full h-full object-cover"
              />
              
              {!isVideoOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <Camera className="w-16 h-16 text-gray-500" />
                </div>
              )}
              
              {/* Tagged Products Overlay */}
              {isStreaming && taggedProducts.length > 0 && (
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  {taggedProducts.map(product => (
                    <div 
                      key={product.id}
                      className="flex-shrink-0 bg-black/70 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2"
                    >
                      <div className="w-10 h-10 rounded-md overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">{product.name}</p>
                        <p className="text-purple-300 text-xs font-bold">
                          ${product.discountPrice || product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Stream Controls */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={toggleMic}
                  className={`p-3 rounded-full ${isMicOn ? 'bg-gray-100' : 'bg-red-100 text-red-600'}`}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
                <button 
                  onClick={toggleVideo}
                  className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-100' : 'bg-red-100 text-red-600'}`}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>
                <button className="p-3 rounded-full bg-gray-100">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              
              {isStreaming ? (
                <button 
                  onClick={handleEndStream}
                  className="px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700"
                >
                  End Stream
                </button>
              ) : (
                <button 
                  onClick={handleStartStream}
                  className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700"
                >
                  Start Stream
                </button>
              )}
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowProductPanel(!showProductPanel)}
                  className={`p-3 rounded-full ${showProductPanel ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'}`}
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setShowChatPanel(!showChatPanel)}
                  className={`p-3 rounded-full ${showChatPanel ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'}`}
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full bg-gray-100">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full bg-gray-100">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Sidebar - Products and Chat */}
          <div className="lg:col-span-1 lg:h-[calc(100vh-2rem)] lg:overflow-hidden flex flex-col">
            {/* Products Panel */}
            {showProductPanel && (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4 lg:overflow-y-auto" style={{ maxHeight: showChatPanel ? '40%' : '100%' }}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-medium text-gray-900">Tagged Products</h2>
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-purple-600">
                      <Tag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Tagged Products List */}
                <div className="mb-4">
                  {taggedProducts.length > 0 ? (
                    taggedProducts.map(product => (
                      <TaggedProduct 
                        key={product.id} 
                        product={product} 
                        onRemove={() => handleRemoveProduct(product.id)} 
                      />
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      No products tagged yet
                    </div>
                  )}
                </div>
                
                {/* Product Search */}
                <div className="border-t border-gray-100 pt-3">
                  <div className="relative mb-3">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full py-2 px-3 pl-9 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  
                  <div className="max-h-48 overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map(product => (
                        <ProductSearchItem 
                          key={product.id} 
                          product={product} 
                          onAdd={() => handleAddProduct(product)}
                          isAdded={taggedProducts.some(p => p.id === product.id)}
                        />
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No products found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Chat Panel */}
            {showChatPanel && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col flex-grow">
                <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-medium text-gray-900">Live Chat</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{isStreaming ? chatMessages.length : 0} messages</span>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-3 space-y-1 bg-gray-50"
                >
                  {isStreaming ? (
                    chatMessages.map(message => (
                      <ChatMessage key={message.id} message={message} />
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center p-4">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">Chat will be available when you start streaming</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={isStreaming ? "Say something..." : "Start streaming to chat"}
                        disabled={!isStreaming}
                        className="w-full py-2 px-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-400"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={!isStreaming || !newMessage.trim()}
                      className="p-2 bg-purple-600 text-white rounded-full disabled:bg-gray-200 disabled:text-gray-400"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
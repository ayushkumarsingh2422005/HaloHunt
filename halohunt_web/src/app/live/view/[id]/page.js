"use client";
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Eye, Heart, Share2, MessageCircle,
  Send, ShoppingBag, ChevronDown, ChevronUp,
  MoreHorizontal, User, Gift, ThumbsUp, Flag,
  X, ExternalLink, DollarSign, Video
} from 'lucide-react';
import Image from 'next/image';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import { useAuth } from '@/app/context/AuthContext';
import { streamService } from '@/app/services/streamService';

// Dummy data for the live stream
const DEFAULT_BANNER_URL = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=675&fit=crop';
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
  const router = useRouter();
  const { id } = params;
  const { user } = useAuth();
  const ZEGO_APP_ID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID || '0', 10);
  const ZEGO_SERVER = process.env.NEXT_PUBLIC_ZEGO_SERVER;

  const [liveData, setLiveData] = useState(DUMMY_LIVE_DATA);
  const [streamData, setStreamData] = useState(null);
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [chatMessages, setChatMessages] = useState(DUMMY_CHAT_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [showProducts, setShowProducts] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showStreamInfo, setShowStreamInfo] = useState(true);
  const [showAboutInfo, setShowAboutInfo] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [zegoClient, setZegoClient] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const chatContainerRef = useRef(null);
  const videoRef = useRef(null);
  const mobileChatContainerRef = useRef(null);
  const remoteMobileContainerRef = useRef(null);
  const remoteDesktopContainerRef = useRef(null);
  const [playError, setPlayError] = useState(null);
  const isLive = streamData?.status === 'live';
  const isEnded = streamData?.status === 'ended';

  // Optimize defaults for mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setShowStreamInfo(false);
      setShowAboutInfo(false);
    }
  }, []);

  // Fetch real stream data
  useEffect(() => {
    const load = async () => {
      try {
        const res = await streamService.getStream(id);
        setStreamData(res.data);
        setLiveData(prev => ({
          ...prev,
          title: res.data.title || prev.title,
          description: res.data.description || prev.description,
          host: {
            id: res.data.userId?._id || prev.host.id,
            name: res.data.userId?.fullName || prev.host.name,
            image: prev.host.image,
            followers: prev.host.followers,
            verified: prev.host.verified
          },
          stats: {
            ...prev.stats,
            viewers: res.data.viewerCount ?? prev.stats.viewers,
            likes: res.data.likesCount ?? prev.stats.likes
          },
          startedAt: res.data.startedAt || prev.startedAt,
          tags: Array.isArray(res.data.hashtags) && res.data.hashtags.length ? res.data.hashtags : prev.tags,
          about: res.data.aboutThisStream
        }));
      } catch (e) {
        // ignore for now
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchZegoToken = async (loginUserId) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (!authToken) throw new Error('Authentication token not found');
    const res = await fetch(`${API_BASE_URL}/api/v1/zego/token?userID=${encodeURIComponent(loginUserId)}`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch token');
    return data.token;
  };

  // Start playing when stream is live and we have data
  useEffect(() => {
    const start = async () => {
      if (!streamData || streamData.status !== 'live') return;
      if (!ZEGO_APP_ID || !ZEGO_SERVER) return;
      try {
        let zg = zegoClient;
        if (!zg) {
          zg = new ZegoExpressEngine(ZEGO_APP_ID, ZEGO_SERVER);
          setZegoClient(zg);
        }
        try {
          const sys = await ZegoExpressEngine.checkSystemRequirements();
          if (!sys.webRTC) {
            setPlayError('WebRTC not supported in this browser');
            return;
          }
        } catch(_) {}
        const roomID = streamData.userId?._id;
        const loginUserId = user?._id || `viewer_${Math.random().toString(36).slice(2, 8)}`;
        const userName = user?.fullName || 'Viewer';
        const token = await fetchZegoToken(loginUserId);

        await zg.loginRoom(roomID, token, { userID: loginUserId, userName }, { userUpdate: true });

        const doPlay = async () => {
          try {
            const remoteStream = await zg.startPlayingStream(id);
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
            if (isMobile && videoRef.current) {
              // Use native video on mobile for autoplay reliability
              try {
                videoRef.current.classList.remove('hidden');
                const mobileContainer = document.getElementById('remote-video-mobile');
                if (mobileContainer) mobileContainer.classList.add('hidden');
                videoRef.current.playsInline = true;
                videoRef.current.muted = true;
                videoRef.current.srcObject = remoteStream;
                await videoRef.current.play();
              } catch(_) {}
            } else {
              const view = zg.createRemoteStreamView(remoteStream);
              const containerId = 'remote-video-desktop';
              view.play(containerId, { enableAutoplayDialog: true });
            }
            setIsPlaying(true);
            setPlayError(null);
          } catch (e) {
            setPlayError('Failed to play stream');
          }
        };

        await doPlay();

        // Also retry on room stream updates if needed
        zg.on('roomStreamUpdate', async (rid, updateType, streamList) => {
          if (rid === roomID && updateType === 'ADD' && !isPlaying) {
            await doPlay();
          }
        });
      } catch (e) {
        setPlayError('Unable to start viewer');
      }
    };
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamData, ZEGO_APP_ID, ZEGO_SERVER]);

  // Stop playback if stream ended
  useEffect(() => {
    if (isEnded && zegoClient) {
      try { zegoClient.stopPlayingStream(id); } catch(_) {}
      try { zegoClient.logoutRoom(streamData?.userId?._id); } catch(_) {}
      setIsPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnded]);

  // Cleanup
  useEffect(() => {
    return () => {
      try {
        if (zegoClient) {
          try { zegoClient.stopPlayingStream(id); } catch(_) {}
          try { zegoClient.logoutRoom(streamData?.userId?._id); } catch(_) {}
        }
      } catch(_) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zegoClient]);

  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    if (mobileChatContainerRef.current) {
      mobileChatContainerRef.current.scrollTop = mobileChatContainerRef.current.scrollHeight;
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

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      setLiveData(prev => ({
        ...prev,
        host: {
          ...prev.host,
          followers: prev.host.followers + 1
        }
      }));
    } else {
      setLiveData(prev => ({
        ...prev,
        host: {
          ...prev.host,
          followers: prev.host.followers - 1
        }
      }));
    }
  };

  // Navigate to creator profile
  const navigateToCreatorProfile = () => {
    router.push(`/profile/${liveData.host.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky Video Player for Mobile */}
      <div className="lg:hidden sticky top-0 z-10 w-full bg-black">
        <div className="relative w-full aspect-video bg-black overflow-hidden">
          {isLive && !isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-purple-600/80 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          )}
          {isEnded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-4 py-2 bg-gray-900/70 text-white rounded-full text-sm font-semibold">Stream ended</div>
            </div>
          )}
          <div ref={remoteMobileContainerRef} id="remote-video-mobile" className={`absolute inset-0 ${isEnded ? 'hidden' : ''}`} />
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 text-[10px] sm:text-xs">
            {isLive && (
              <div className="bg-red-500/90 text-white px-2 py-0.5 rounded-full font-semibold shadow flex items-center gap-1">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
            )}
            {isEnded && (
              <div className="bg-gray-800/80 text-white px-2 py-0.5 rounded-full font-semibold shadow flex items-center gap-1">
                ENDED
              </div>
            )}
            <div className="bg-black/70 text-white px-2 py-0.5 rounded-full font-medium shadow flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {liveData.stats.viewers.toLocaleString()}
            </div>
          </div>
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover ${isEnded ? '' : 'hidden'}`}
            poster={DEFAULT_BANNER_URL}
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:h-[calc(100vh-2rem)] lg:overflow-hidden">
          {/* Main Content - Video and Info - Independently Scrollable */}
          <div className="lg:col-span-2 lg:overflow-y-auto lg:pr-2" style={{ height: 'auto', maxHeight: 'calc(100vh - 2rem)' }}>
            {/* Video Player - Desktop Only */}
            <div className="hidden lg:block relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
              {isLive && !isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-purple-600/80 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
              )}
              {isEnded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-4 py-2 bg-gray-900/70 text-white rounded-full text-sm font-semibold">Stream ended</div>
                </div>
              )}
              <div ref={remoteDesktopContainerRef} id="remote-video-desktop" className={`absolute inset-0 ${isEnded ? 'hidden' : ''}`} />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 text-xs">
                {isLive && (
                  <div className="bg-red-500/90 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                )}
                {isEnded && (
                  <div className="bg-gray-800/80 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow flex items-center gap-1">
                    ENDED
                  </div>
                )}
                <div className="bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {liveData.stats.viewers.toLocaleString()}
                </div>
              </div>
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover ${isEnded ? '' : 'hidden'}`}
                poster={DEFAULT_BANNER_URL}
              />
            </div>

            {/* Stream Info */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900 truncate flex items-center gap-2">
                  {liveData.title}
                  {streamData?.status && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        streamData.status === 'live' ? 'bg-red-500/90 text-white' :
                        streamData.status === 'ended' ? 'bg-gray-800/80 text-white' :
                        streamData.status === 'scheduled' ? 'bg-yellow-500/90 text-white' :
                        'bg-gray-400/80 text-white'
                      }`}
                    >
                      {streamData.status}
                    </span>
                  )}
                </h1>
                <button
                  onClick={() => setShowStreamInfo(!showStreamInfo)}
                  className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                >
                  {showStreamInfo ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {showStreamInfo && (
                <div className="px-4 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-y-3 mb-4">
                    <div
                      className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={navigateToCreatorProfile}
                    >
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
                            <span className="relative inline-flex items-center justify-center">
                              <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full">
                                <Image src="/images/varify.png" alt="Verified" width={40} height={40} className="w-8 h-8" />
                              </span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{liveData.host.followers.toLocaleString()} followers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        onClick={handleLike}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${isLiked
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-purple-600' : ''}`} />
                        {liveData.stats.likes.toLocaleString()}
                      </button>
                      <button
                        onClick={handleFollow}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isFollowing
                            ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                      >
                        {isFollowing ? (
                          <>
                            <span className="w-3 h-3 flex items-center justify-center">✓</span>
                            Following
                          </>
                        ) : (
                          <>
                            <span className="w-3 h-3 flex items-center justify-center">+</span>
                            Follow
                          </>
                        )}
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
              )}
            </div>

            {/* Featured Products - Mobile Only */}
            <div className="lg:hidden bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => {setShowProducts(true); setShowChat(false);}}
                  className={`flex-1 py-3 text-center font-medium text-sm ${showProducts ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'}`}
                >
                  Products
                </button>
                <button
                  onClick={() => {setShowProducts(false); setShowChat(true);}}
                  className={`flex-1 py-3 text-center font-medium text-sm ${showChat ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'}`}
                >
                  Live Chat
                </button>
                <button
                  onClick={() => {setShowProducts(false); setShowChat(false);}}
                  className={`flex-1 py-3 text-center font-medium text-sm ${(!showProducts && !showChat) ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'}`}
                >
                  Watch More
                </button>
              </div>

              {showProducts ? (
                <div className="p-4 space-y-3">
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
              ) : showChat ? (
                <div className="flex flex-col" style={{ height: '350px' }}>
                  {/* Chat Messages */}
                  <div
                    ref={mobileChatContainerRef}
                    className="flex-1 overflow-y-auto p-3 space-y-1 bg-gray-50"
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
              ) : (
                <div className="p-4 space-y-3" style={{ height: '350px', overflowY: 'auto' }}>
                  <h3 className="font-medium text-gray-900 mb-2">Related Streams</h3>
                  
                  {/* Related Stream Items */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-20 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=300&h=180&fit=crop" 
                        alt="Fashion Stream"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-red-500 text-white text-[8px] px-1 rounded">LIVE</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">Men's Summer Collection</h4>
                      <p className="text-xs text-gray-500">Fashion Forward</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-20 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=300&h=180&fit=crop" 
                        alt="Accessories Stream"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-red-500 text-white text-[8px] px-1 rounded">LIVE</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">Luxury Accessories Showcase</h4>
                      <p className="text-xs text-gray-500">Style Maven</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-20 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300&h=180&fit=crop" 
                        alt="Shoes Stream"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-gray-700 text-white text-[8px] px-1 rounded">3:30</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">Trending Footwear 2024</h4>
                      <p className="text-xs text-gray-500">Shoe Experts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-20 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=180&fit=crop" 
                        alt="Jewelry Stream"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-gray-700 text-white text-[8px] px-1 rounded">12:45</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">Handcrafted Jewelry Collection</h4>
                      <p className="text-xs text-gray-500">Artisan Designs</p>
                    </div>
                  </div>
                  
                  <Link
                    href="#"
                    className="block text-center py-2 text-sm text-purple-600 font-medium hover:underline"
                  >
                    Browse All Streams
                  </Link>
                </div>
              )}
            </div>

            {/* Live Chat - Mobile Only - REMOVED AS IT'S NOW INTEGRATED IN THE TABS ABOVE */}

            {/* Additional content for scrolling demonstration */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="p-4 flex items-center justify-between">
                <h2 className="text-lg font-medium">About This Stream</h2>
                <button
                  onClick={() => setShowAboutInfo(!showAboutInfo)}
                  className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                >
                  {showAboutInfo ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {showAboutInfo && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-700 mb-3">
                    {liveData.about}
                  </p>
                </div>
              )}
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
            {/* Tabs for Desktop */}
            <div className="bg-white rounded-lg shadow-sm mb-4">
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => {setShowProducts(true); setShowChat(false);}}
                  className={`flex-1 py-3 text-center font-medium text-sm ${showProducts ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'}`}
                >
                  Products
                </button>
                <button
                  onClick={() => {setShowProducts(false); setShowChat(true);}}
                  className={`flex-1 py-3 text-center font-medium text-sm ${showChat ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'}`}
                >
                  Live Chat
                </button>
                <button
                  onClick={() => {setShowProducts(false); setShowChat(false);}}
                  className={`flex-1 py-3 text-center font-medium text-sm ${(!showProducts && !showChat) ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'}`}
                >
                  Watch More
                </button>
              </div>
            </div>

            {/* Content based on selected tab */}
            {showProducts && (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4 lg:overflow-y-auto" style={{ height: 'calc(100% - 56px)' }}>
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
            )}

            {showChat && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col" style={{ height: 'calc(100% - 56px)' }}>
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
            )}

            {!showProducts && !showChat && (
              <div className="bg-white rounded-lg shadow-sm p-4 lg:overflow-y-auto" style={{ height: 'calc(100% - 56px)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-medium text-gray-900">Related Streams</h2>
                  <Link
                    href="#"
                    className="text-sm text-purple-600 font-medium hover:underline flex items-center gap-1"
                  >
                    View All
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {/* Related Stream Items */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-24 h-14 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=300&h=180&fit=crop" 
                        alt="Fashion Stream"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-red-500 text-white text-xs px-1 rounded">LIVE</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">Men's Summer Collection</h4>
                      <p className="text-xs text-gray-500">Fashion Forward</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> 1.2k
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Heart className="w-3 h-3" /> 342
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-24 h-14 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=300&h=180&fit=crop" 
                        alt="Accessories Stream"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-red-500 text-white text-xs px-1 rounded">LIVE</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">Luxury Accessories Showcase</h4>
                      <p className="text-xs text-gray-500">Style Maven</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> 876
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Heart className="w-3 h-3" /> 215
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-24 h-14 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300&h=180&fit=crop" 
                        alt="Shoes Stream"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-gray-700 text-white text-xs px-1 rounded">3:30</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">Trending Footwear 2024</h4>
                      <p className="text-xs text-gray-500">Shoe Experts</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> 5.4k
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Heart className="w-3 h-3" /> 1.2k
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-24 h-14 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=180&fit=crop" 
                        alt="Jewelry Stream"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-gray-700 text-white text-xs px-1 rounded">12:45</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">Handcrafted Jewelry Collection</h4>
                      <p className="text-xs text-gray-500">Artisan Designs</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> 3.2k
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Heart className="w-3 h-3" /> 782
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-24 h-14 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=300&h=180&fit=crop" 
                        alt="Makeup Stream"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-gray-700 text-white text-xs px-1 rounded">45:12</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">Summer Makeup Trends</h4>
                      <p className="text-xs text-gray-500">Beauty Insider</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> 7.8k
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Heart className="w-3 h-3" /> 2.1k
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
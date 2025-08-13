"use client";
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Video, Mic, MicOff, VideoOff, Users,
  MessageSquare, ShoppingBag, Settings,
  X, Plus, ChevronRight, ChevronLeft,
  Share2, MoreHorizontal, Tag, Search,
  Camera, Check, Trash2, Edit, Eye
} from 'lucide-react';
import { streamService } from '@/app/services/streamService';
import { useAuth } from '@/app/context/AuthContext';

// Zego Express Engine import (assume it's available globally or via npm)
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';

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
        className={`p-1.5 rounded-full ${isAdded
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
  const params = useParams();
  const streamId = params.id;
  const [streamData, setStreamData] = useState(null);
  const [loadingStreams, setLoadingStreams] = useState(true);
  const [error, setError] = useState(null);
  const [showStreamInfo, setShowStreamInfo] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const [endedStats, setEndedStats] = useState(null);
  const [loadingEndedStats, setLoadingEndedStats] = useState(false);

  // Zego state
  const [zegoClient, setZegoClient] = useState(null);
  const [localPublishStream, setLocalPublishStream] = useState(null);
  const [useZegoPlayerMode, setUseZegoPlayerMode] = useState(false);
  const zegoMobileContainerRef = useRef(null);
  const zegoDesktopContainerRef = useRef(null);

  // Zego config via env
  const ZEGO_APP_ID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID, 10);
  const ZEGO_SERVER = process.env.NEXT_PUBLIC_ZEGO_SERVER;
  // The userID and userName for Zego
  const zegoUserID = user?._id || "iidri98347";
  const zegoUserName = user?.fullName || "Ayush Kumar SIngh";
  // console.log(user);

  // Fetch stream data
  useEffect(() => {
    if (streamId) {
      fetchStreamData();
    }
    // eslint-disable-next-line
  }, [streamId]);

  useEffect(() => {
    console.log('Host page received stream ID:', streamId);
  }, [streamId]);

  const fetchStreamData = async () => {
    if (!user) return;

    try {
      setLoadingStreams(true);
      const result = await streamService.getStream(streamId);
      setStreamData(result.data || []);
      if (result?.data?.status === 'ended') {
        await loadEndedStats();
      }
    } catch (error) {
      console.error('Error fetching stream data:', error);
    } finally {
      setLoadingStreams(false);
    }
  };

  const loadEndedStats = async () => {
    try {
      setLoadingEndedStats(true);
      const stats = await streamService.getStreamStats(streamId);
      setEndedStats(stats.data);
    } catch (e) {
      console.error('Failed to load ended stream stats', e);
    } finally {
      setLoadingEndedStats(false);
    }
  };

  // Zego: get token from backend (protected route)
  const fetchZegoToken = async (roomID) => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (!authToken) throw new Error('Authentication token not found');

      const res = await fetch(`${API_BASE_URL}/api/v1/zego/token?userID=${encodeURIComponent(roomID)}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch Zego token');
      return data.token;
    } catch (err) {
      console.error('Error fetching Zego token:', err);
      return null;
    }
  };

  // Zego: Start streaming
  const startStream = async () => {
    const appID = ZEGO_APP_ID;
    const server = ZEGO_SERVER;
    const userID = zegoUserID; // room id should be user id
    const userName = zegoUserName;
    const roomID = userID;
    const streamID = streamId; // actual stream id

    if (!appID || !server) {
      alert('Streaming config missing. Please set NEXT_PUBLIC_ZEGO_APP_ID and NEXT_PUBLIC_ZEGO_SERVER');
      return;
    }

    // Check browser support before continuing
    try {
      const sysResult = await ZegoExpressEngine.checkSystemRequirements();
      if (!sysResult.webRTC) {
        alert('WebRTC not supported in this browser. Please try a modern browser.');
        return;
      }
    } catch (e) {
      // continue; not all SDK versions expose this
    }

    const token = await fetchZegoToken(roomID);
    if (!token) {
      alert('Failed to get streaming token');
      return;
    }

    // 2. Create ZegoExpressEngine instance
    let zg = zegoClient;
    if (!zg) {
      zg = new ZegoExpressEngine(appID, server);
      setZegoClient(zg);
    }

    // 3. Login to room (await)
    try {
      await zg.loginRoom(roomID, token, { userID, userName }, { userUpdate: true });

      // 4. Register event listeners (as in file_context_0)
      zg.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
        if (state === 'DISCONNECTED') {
          console.log("DISCONNECTED...");
        }
        if (state === 'CONNECTING') {
          console.log("Connecting...");
        }
        if (state === 'CONNECTED') {
          console.log("connected...");
        }
      });

      zg.on('roomUserUpdate', (roomID, updateType, userList) => {
        console.warn(
          `roomUserUpdate: room ${roomID}, user ${updateType === 'ADD' ? 'added' : 'left'} `,
          JSON.stringify(userList),
        );
      });

      zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
        if (updateType === 'ADD') {
          // New stream added, start playing the stream.
        } else if (updateType === 'DELETE') {
          // Stream deleted, stop playing the stream.
        }
      });

      zg.on('publisherStateUpdate', result => {
        console.log("publisherStateUpdate", result);
      });

      zg.on('publishQualityUpdate', (streamID, stats) => {
        console.log("publishQualityUpdate", streamID, stats);
      });

      // Create local stream and publish
      // Stop any preview tracks to free the camera before creating Zego stream
      try {
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(t => t.stop());
          videoRef.current.srcObject = null;
        }
      } catch(_) {}

      const localStream = await zg.createZegoStream({ camera: { video: true, audio: true } });
      setLocalPublishStream(localStream);
      // Match the demo: always use SDK's container player when available
      const hasSDKPlayer = typeof localStream?.playVideo === 'function';
      setUseZegoPlayerMode(!!hasSDKPlayer);
      if (hasSDKPlayer) {
        const isMobileViewport = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
        const container = isMobileViewport ? zegoMobileContainerRef.current : zegoDesktopContainerRef.current;
        if (container) {
          localStream.playVideo(container);
        }
      } else if (videoRef.current) {
        // Fallback to native assignment
        videoRef.current.srcObject = localStream;
        try { await videoRef.current.play(); } catch(_) {}
      }
      zg.startPublishingStream(streamID, localStream);

      setIsStreaming(true);
      // Optionally inform backend the stream has started
      try { await streamService.startStream(streamId); } catch (_) {}
    } catch (err) {
      console.error('Start stream error', err);
      alert(`Failed to join streaming room or start stream.`);
    }
  };

  // End stream and leave room
  const endStream = async () => {
    setIsStreaming(false);
    if (zegoClient) {
      try {
        const streamID = streamId;
        zegoClient.stopPublishingStream(streamID);
        if (localPublishStream) {
          try { zegoClient.destroyStream(localPublishStream); } catch(_) {}
        }
        zegoClient.logoutRoom(zegoUserID);
      } catch (err) {
        // ignore
      }
    }
    // Clean up video
    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      if (localPublishStream && typeof localPublishStream.getTracks === 'function') {
        localPublishStream.getTracks().forEach(t => t.stop());
      }
    } catch(_) {}
    try {
      const res = await streamService.endStream(streamId);
      setStreamData(res.data);
    } catch (_) {}
    await loadEndedStats();
    router.push('/profile');
  };

  // Chat, product, and UI logic (unchanged)
  const chatContainerRef = useRef(null);

  const filteredProducts = SAMPLE_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Only show camera preview before streaming
  useEffect(() => {
    if (!isStreaming && typeof navigator !== 'undefined') {
      const startCamera = async () => {
        try {
          const constraints = { video: true, audio: true };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);

          if (!useZegoPlayerMode && videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera and microphone:", err);
        }
      };

      startCamera();

      // Clean up function to stop all tracks when component unmounts
      return () => {
        if (!useZegoPlayerMode && videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    }
  }, [isStreaming, useZegoPlayerMode]);

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
    if (streamData?.status === 'ended') {
      alert('This stream has ended and cannot be started again.');
      return;
    }
    startStream();
  };

  const handleEndStream = () => {
    endStream();
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
    const stream = localPublishStream || (videoRef.current ? videoRef.current.srcObject : null);
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !isMicOn;
      setIsMicOn(!isMicOn);
    }
  };

  const toggleVideo = () => {
    const stream = localPublishStream || (videoRef.current ? videoRef.current.srcObject : null);
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !isVideoOn;
      setIsVideoOn(!isVideoOn);
    }
  };

  const handleShare = async () => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const url = `${origin}/live/view/${streamId}`;
      if (navigator.share) {
        await navigator.share({ title: streamTitle || 'Live Stream', url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard');
      } else {
        prompt('Copy this link', url);
      }
    } catch (_) {}
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
      {/* Sticky Video Player for Mobile */}
      <div className="lg:hidden sticky top-0 z-10 w-full bg-black">
        <div className="relative w-full aspect-video bg-black overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${useZegoPlayerMode ? 'hidden' : ''}`}
          />
          <div
            ref={zegoMobileContainerRef}
            className={`${useZegoPlayerMode ? '' : 'hidden'} absolute inset-0`}
          />

          {!isVideoOn && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <Camera className="w-16 h-16 text-gray-500" />
            </div>
          )}

          {/* Stream Status Indicators */}
          {isStreaming && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="flex items-center gap-1 bg-red-500/90 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
              <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                <Eye className="w-3 h-3" />
                {viewerCount}
              </div>
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
      </div>

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

            {/* Video Preview - Desktop Only */}
            <div className="hidden lg:block relative bg-black rounded-lg overflow-hidden flex-grow mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${useZegoPlayerMode ? 'hidden' : ''}`}
              />
              <div
                ref={zegoDesktopContainerRef}
                className={`${useZegoPlayerMode ? '' : 'hidden'} absolute inset-0`}
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
              ) : streamData?.status === 'ended' ? (
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full font-medium">
                    Stream ended
                  </div>
                  <div className="px-4 py-2 bg-white border rounded-full text-sm text-gray-700">
                    {loadingEndedStats && 'Loading stats...'}
                    {!loadingEndedStats && endedStats && (
                      <span>
                        {endedStats.duration !== null && (
                          <span className="mr-2">Duration: {endedStats.duration}m</span>
                        )}
                        <span className="mr-2">Likes: {endedStats.likesCount}</span>
                        <span>Viewers: {endedStats.viewerCount}</span>
                      </span>
                    )}
                  </div>
                </div>
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
                <button onClick={handleShare} className="p-3 rounded-full bg-gray-100">
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
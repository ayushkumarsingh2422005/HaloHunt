"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Eye, Heart, MessageCircle, Share2, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Use a set of static images for live stream backgrounds
const LIVE_BG_IMAGES = [
  "banners/b1.png",
  "banners/b2.png",
  "banners/b3.png",
  "banners/b4.png",
  "banners/b5.png",
  "banners/b6.png"
];

// Modify the LiveStreamCard component to include tagged products
const LiveStreamCard = React.forwardRef(({ stream }, ref) => {
  const router = useRouter();

  // Add mock tagged products to each stream
  const taggedProducts = stream.taggedProducts || [
    { id: `prod-${stream.id}-1`, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&crop=center" },
    { id: `prod-${stream.id}-2`, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop&crop=center" },
    { id: `prod-${stream.id}-3`, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=80&h=80&fit=crop&crop=center" },
  ].slice(0, 2 + Math.floor(Math.random() * 2)); // Random 2-3 products

  const handleClick = () => {
    // Navigate to the individual live stream page with the stream's ID
    router.push(`/live/view/${stream.id}`);
  };

  const handleHostClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    router.push(`/profile/creator-${stream.host.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleProductClick = (e, productId) => {
    e.stopPropagation(); // Prevent triggering the card click
    router.push(`/search/${productId}`);
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className="group relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer h-full"
    >
      {/* Thumbnail */}
      <div className="relative w-full pb-[56.25%] bg-gray-200 overflow-hidden">
        <img
          src={stream.thumbnail}
          alt={stream.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ backgroundColor: "#eee" }}
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
        {/* Live badge or duration - always in the same position */}
        <div className="absolute top-2 left-2 flex items-center gap-1 py-0.5 rounded-full text-xs font-semibold">
          {stream.isLive ? (
            <div className="flex items-center gap-1 bg-red-500/90 text-white px-2 py-0.5 rounded-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-1" />
              LIVE
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-0.5 rounded-full">
              <Play className="w-3 h-3" />
              {stream.duration}
            </div>
          )}
        </div>
        {/* Remove host avatar from here */}
        {/* Tagged Products */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
          {taggedProducts.map((product, idx) => (
            <div 
              key={product.id}
              onClick={(e) => handleProductClick(e, product.id)}
              className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-white shadow cursor-pointer hover:scale-110 transition-transform"
              title="Tagged Product"
            >
              <img
                src={product.image}
                alt="Tagged Product"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
          {taggedProducts.length > 0 && (
            <span className="text-white text-xs font-medium bg-black/50 px-1.5 py-0.5 rounded-full">
              {taggedProducts.length}
            </span>
          )}
        </div>
        {/* Viewers */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow">
          <Eye className="w-3 h-3" />
          {stream.viewers.toLocaleString()}
        </div>
        {/* Action buttons - now always visible instead of on hover */}
        <div className="absolute top-2 right-2 flex flex-col items-end gap-2 z-10">
          <button 
            className="w-8 h-8 flex items-center justify-center bg-black/40 rounded-full"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking the heart button
              console.log('Like clicked for stream:', stream.id);
            }}
          >
            <Heart className="w-4 h-4 text-white" />
          </button>
          <button 
            className="w-8 h-8 flex items-center justify-center bg-black/40 rounded-full"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking the comment button
              console.log('Comment clicked for stream:', stream.id);
            }}
          >
            <MessageCircle className="w-4 h-4 text-white" />
          </button>
          <button 
            className="w-8 h-8 flex items-center justify-center bg-black/40 rounded-full"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking the share button
              console.log('Share clicked for stream:', stream.id);
            }}
          >
            <Share2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      {/* Stream info - YouTube style */}
      <div className="flex-1 flex px-3 py-2 bg-white">
        {/* Creator avatar - ensuring it's a circle */}
        <div 
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer flex-shrink-0 mr-3"
          onClick={handleHostClick}
        >
          <img
            src={stream.host.image}
            alt={stream.host.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        {/* Content column */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
            {stream.title}
          </h3>
          
          {/* Channel name and stats */}
          <div className="flex items-center text-xs text-gray-700 mb-1">
            <span 
              className="font-medium truncate cursor-pointer hover:text-purple-600"
              onClick={handleHostClick}
            >
              {stream.host.name}
            </span>
            <span className="mx-1">•</span>
            <span className="text-gray-500">
              {stream.viewers.toLocaleString()} {stream.isLive ? 'watching' : 'views'}
            </span>
          </div>
          
          {/* Description */}
          <p className="text-xs text-gray-600 line-clamp-1">
            {stream.description || `Check out this amazing stream about ${stream.title.toLowerCase()}`}
          </p>
        </div>
      </div>
    </div>
  );
});
LiveStreamCard.displayName = "LiveStreamCard";

// Fix the MobileReelsView component to prevent overlapping and account for bottom navigation
const MobileReelsView = ({ streams, lastStreamRef, loading, hasMore }) => {
  return (
    <div className="pb-16 pt-2 px-2">
      <div className="flex flex-col gap-4">
        {streams.map((stream, index) => (
          <div 
            key={stream.id} 
            ref={index === streams.length - 1 ? lastStreamRef : null}
          >
            <LiveStreamCard stream={stream} />
          </div>
        ))}
      </div>
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

const LiveGrid = () => {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const observer = useRef();
  const lastStreamRef = useRef();

  // Use static images for thumbnails, repeat if needed
  const getThumbnail = (idx) => LIVE_BG_IMAGES[idx % LIVE_BG_IMAGES.length];

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Mock data generator for infinite scroll
  const generateMockStreams = (startIndex, count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `stream-${startIndex + i}`,
      title: `Live Stream ${startIndex + i}`,
      description: `Join our stream #${startIndex + i} where we showcase the latest trending products. Perfect for fashion enthusiasts and tech lovers alike!`,
      host: {
        name: `Creator ${startIndex + i}`,
        image: `https://i.pravatar.cc/150?img=${(startIndex + i) % 70}`
      },
      thumbnail: getThumbnail(startIndex + i),
      viewers: Math.floor(Math.random() * 10000) + 100,
      likes: Math.floor(Math.random() * 5000) + 50,
      comments: Math.floor(Math.random() * 1000) + 10,
      isLive: Math.random() > 0.3,
      duration: Math.floor(Math.random() * 60) + ":" + Math.floor(Math.random() * 60).toString().padStart(2, '0'),
      taggedProducts: [
        { id: `prod-${startIndex + i}-1`, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&crop=center" },
        { id: `prod-${startIndex + i}-2`, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop&crop=center" },
        { id: `prod-${startIndex + i}-3`, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=80&h=80&fit=crop&crop=center" },
      ].slice(0, 2 + Math.floor(Math.random() * 2)) // Random 2-3 products
    }));
  };

  // Infinite scroll mechanism
  const loadMoreStreams = useCallback(() => {
    if (!loading && hasMore) {
      setLoading(true);
      setTimeout(() => {
        const newStreams = generateMockStreams(streams.length, 12);
        setStreams(prev => [...prev, ...newStreams]);
        setHasMore(streams.length + 12 < 100); // Limit to 100 items for demo
        setLoading(false);
      }, 1000);
    }
  }, [loading, hasMore, streams.length]);

  useEffect(() => {
    if (streams.length === 0) {
      setStreams(generateMockStreams(0, 12));
    }
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!hasMore) return;
    if (!lastStreamRef.current) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreStreams();
        }
      },
      { threshold: 0.1 }
    );

    observer.current.observe(lastStreamRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [streams, loading, hasMore, loadMoreStreams]);

  return (
    <div className="min-h-screen bg-gray-50">
      {isMobile ? (
        // Mobile reels-style view with snap scrolling
        <MobileReelsView 
          streams={streams} 
          lastStreamRef={lastStreamRef} 
          loading={loading} 
          hasMore={hasMore} 
        />
      ) : (
        // Desktop grid view
        <div className="pt-6 pb-10 max-w-7xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {streams.map((stream, index) => (
              <LiveStreamCard
                key={stream.id}
                stream={stream}
                ref={index === streams.length - 1 ? lastStreamRef : null}
              />
            ))}
          </div>
          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
            </div>
          )}
          {!hasMore && (
            <div className="flex justify-center py-8 text-gray-400 text-sm">
              No more streams to load.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveGrid;

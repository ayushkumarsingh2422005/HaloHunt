"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Eye, Heart, MessageCircle, Share2, Play } from 'lucide-react';

// Use a set of static images for live stream backgrounds
const LIVE_BG_IMAGES = [
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
];

const LiveStreamCard = React.forwardRef(({ stream }, ref) => (
  <div
    ref={ref}
    className="group relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
    style={{ minHeight: 0 }}
  >
    {/* Thumbnail */}
    <div className="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden">
      <img
        src={stream.thumbnail}
        alt={stream.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: "#eee" }}
        loading="lazy"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
      {/* Live badge or duration */}
      {stream.isLive ? (
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500/90 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-1" />
          LIVE
        </div>
      ) : (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow">
          <Play className="w-3 h-3" />
          {stream.duration}
        </div>
      )}
      {/* Host avatar */}
      <div className="absolute bottom-2 left-2 flex items-center gap-2">
        <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white shadow">
          <img
            src={stream.host.image}
            alt={stream.host.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <span className="text-white text-xs font-medium bg-black/50 px-2 py-0.5 rounded">{stream.host.name}</span>
      </div>
      {/* Viewers */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow">
        <Eye className="w-3 h-3" />
        {stream.viewers.toLocaleString()}
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center gap-8 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <button className="flex flex-col items-center hover:scale-110 transition-transform">
          <Heart className="w-6 h-6 text-white" />
          <span className="text-white text-xs mt-1">{stream.likes}</span>
        </button>
        <button className="flex flex-col items-center hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="text-white text-xs mt-1">{stream.comments}</span>
        </button>
        <button className="flex flex-col items-center hover:scale-110 transition-transform">
          <Share2 className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
    {/* Stream info */}
    <div className="flex-1 flex flex-col px-3 py-2 bg-white">
      <h3 className="font-semibold text-sm text-gray-900 mb-1 truncate">{stream.title}</h3>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="truncate">{stream.host.name}</span>
        <span>
          <Eye className="inline w-3 h-3 mr-1" />
          {stream.viewers.toLocaleString()}
        </span>
      </div>
    </div>
  </div>
));
LiveStreamCard.displayName = "LiveStreamCard";

const LiveGrid = () => {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const lastStreamRef = useRef();

  // Use static images for thumbnails, repeat if needed
  const getThumbnail = (idx) => LIVE_BG_IMAGES[idx % LIVE_BG_IMAGES.length];

  // Mock data generator for infinite scroll
  const generateMockStreams = (startIndex, count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: startIndex + i,
      title: `Live Stream ${startIndex + i}`,
      host: {
        name: `Creator ${startIndex + i}`,
        image: `https://i.pravatar.cc/150?img=${(startIndex + i) % 70}`
      },
      thumbnail: getThumbnail(startIndex + i),
      viewers: Math.floor(Math.random() * 10000) + 100,
      likes: Math.floor(Math.random() * 5000) + 50,
      comments: Math.floor(Math.random() * 1000) + 10,
      isLive: Math.random() > 0.3,
      duration: Math.floor(Math.random() * 60) + ":" + Math.floor(Math.random() * 60).toString().padStart(2, '0')
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
    <div className="min-h-screen bg-gray-50 pt-6 pb-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </div>
  );
};

export default LiveGrid;

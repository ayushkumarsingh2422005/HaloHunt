"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  User, Store, Video, ShoppingBag, 
  Heart, MessageCircle, Share2, 
  MapPin, Calendar, Instagram, Twitter, 
  Globe, ChevronDown, ChevronUp, Play, Eye
} from 'lucide-react';
import Image from 'next/image';

// Dummy creator data
const DUMMY_CREATOR = {
  id: "creator-1",
  name: "Fashion Forward",
  username: "@fashionforward",
  bio: "Fashion enthusiast sharing the latest trends and styles. Join my live streams for exclusive discounts and fashion tips!",
  avatar: "https://i.pravatar.cc/150?img=32",
  coverImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=400&fit=crop",
  location: "New York, USA",
  joinedDate: "March 2022",
  followers: 15400,
  following: 245,
  totalLives: 127,
  totalProducts: 89,
  verified: true,
  socialLinks: {
    instagram: "fashion_forward",
    twitter: "fashionforward",
    website: "fashionforward.com"
  },
  stats: {
    totalViews: 1245000,
    totalLikes: 87600,
    averageRating: 4.8
  }
};

// Dummy products data
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    name: "Summer Breeze Dress",
    price: 79.99,
    discountPrice: 59.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop",
    rating: 4.8,
    reviews: 124
  },
  {
    id: "p2",
    name: "Ocean Wave Sunglasses",
    price: 45.00,
    discountPrice: null,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=400&fit=crop",
    rating: 4.5,
    reviews: 89
  },
  {
    id: "p3",
    name: "Tropical Paradise Shirt",
    price: 65.00,
    discountPrice: 49.99,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=400&fit=crop",
    rating: 4.7,
    reviews: 56
  },
  {
    id: "p4",
    name: "Beach Day Sandals",
    price: 35.99,
    discountPrice: null,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop",
    rating: 4.4,
    reviews: 42
  },
  {
    id: "p5",
    name: "Sunset Tote Bag",
    price: 49.99,
    discountPrice: 39.99,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=300&h=400&fit=crop",
    rating: 4.9,
    reviews: 78
  },
  {
    id: "p6",
    name: "Summer Hat Collection",
    price: 29.99,
    discountPrice: 24.99,
    image: "https://images.unsplash.com/photo-1582791694770-cbdc9dda338f?w=300&h=400&fit=crop",
    rating: 4.6,
    reviews: 63
  }
];

// Dummy past lives data
const DUMMY_PAST_LIVES = [
  {
    id: "live-1",
    title: "Summer Fashion Collection Launch",
    thumbnail: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop",
    date: "2 days ago",
    duration: "1:24:35",
    views: 12450,
    likes: 3240
  },
  {
    id: "live-2",
    title: "Beach Accessories Showcase",
    thumbnail: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=600&h=400&fit=crop",
    date: "1 week ago",
    duration: "45:12",
    views: 8760,
    likes: 2130
  },
  {
    id: "live-3",
    title: "How to Style Summer Outfits",
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop",
    date: "2 weeks ago",
    duration: "1:02:18",
    views: 15320,
    likes: 4210
  },
  {
    id: "live-4",
    title: "Accessories Must-Haves for 2024",
    thumbnail: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&h=400&fit=crop",
    date: "3 weeks ago",
    duration: "58:42",
    views: 9870,
    likes: 2760
  }
];

const TabButton = ({ active, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        active 
          ? 'text-purple-600 border-b-2 border-purple-600' 
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {children}
    </button>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-[3/4] bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100">
          <Heart className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
        <div className="flex items-center justify-between mt-1">
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
            <span className="text-yellow-400">★</span>
            <span>{product.rating}</span>
            <span className="mx-1">·</span>
            <span>{product.reviews} reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LiveCard = ({ live }) => {
  return (
    <Link href={`/live/${live.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-video bg-gray-100">
          <img 
            src={live.thumbnail} 
            alt={live.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow">
            <Play className="w-3 h-3" />
            {live.duration}
          </div>
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow">
              <Eye className="w-3 h-3" />
              {live.views.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow">
              <Heart className="w-3 h-3" />
              {live.likes.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-900 truncate">{live.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{live.date}</p>
        </div>
      </div>
    </Link>
  );
};

export default function CreatorProfilePage() {
  const params = useParams();
  const { id } = params;
  
  const [creator, setCreator] = useState(DUMMY_CREATOR);
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [pastLives, setPastLives] = useState(DUMMY_PAST_LIVES);
  const [activeTab, setActiveTab] = useState('products');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllBio, setShowAllBio] = useState(false);
  
  // In a real app, you would fetch the creator data based on the ID
  useEffect(() => {
    console.log(`Fetching creator data for ID: ${id}`);
    // Simulating API call
    // setCreator(fetchedCreator);
    // setProducts(fetchedProducts);
    // setPastLives(fetchedPastLives);
  }, [id]);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      setCreator(prev => ({
        ...prev,
        followers: prev.followers + 1
      }));
    } else {
      setCreator(prev => ({
        ...prev,
        followers: prev.followers - 1
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-48 sm:h-64 md:h-80 bg-gray-200 overflow-hidden">
        <img 
          src={creator.coverImage} 
          alt={`${creator.name}'s cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 pb-8">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md overflow-hidden -mt-16 sm:-mt-20 bg-white">
                <img 
                  src={creator.avatar} 
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Creator Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{creator.name}</h1>
                  {creator.verified && (
                    <span className="relative inline-flex items-center justify-center">
                      <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full">
                        <Image src="/images/varify.png" alt="Verified" width={40} height={40} className="w-8 h-8" />
                      </span>
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-2">{creator.username}</p>
                
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-gray-600">
                  {creator.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{creator.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Joined {creator.joinedDate}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-3 text-sm">
                  <div>
                    <span className="font-bold text-gray-900">{creator.totalLives}</span>
                    <span className="text-gray-600 ml-1">Lives</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">{creator.totalProducts}</span>
                    <span className="text-gray-600 ml-1">Products</span>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex gap-2 mb-4">
                  {creator.socialLinks.instagram && (
                    <a href={`https://instagram.com/${creator.socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 hover:text-purple-600">
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {creator.socialLinks.twitter && (
                    <a href={`https://twitter.com/${creator.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 hover:text-purple-600">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {creator.socialLinks.website && (
                    <a href={`https://${creator.socialLinks.website}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 hover:text-purple-600">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 sm:self-start sm:ml-auto">
                <button 
                  onClick={handleFollow}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    isFollowing
                      ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:shadow-md hover:from-purple-700 hover:to-purple-600'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <span className="w-4 h-4 flex items-center justify-center">✓</span>
                      Following
                    </>
                  ) : (
                    <>
                      <span className="w-4 h-4 flex items-center justify-center">+</span>
                      Follow
                    </>
                  )}
                </button>
                <button className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Bio */}
            {creator.bio && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-700">
                  {showAllBio || creator.bio.length <= 150 
                    ? creator.bio 
                    : `${creator.bio.substring(0, 150)}...`}
                </p>
                {creator.bio.length > 150 && (
                  <button 
                    onClick={() => setShowAllBio(!showAllBio)}
                    className="text-xs text-purple-600 font-medium mt-1 flex items-center"
                  >
                    {showAllBio ? (
                      <>
                        Show less <ChevronUp className="w-3 h-3 ml-1" />
                      </>
                    ) : (
                      <>
                        Show more <ChevronDown className="w-3 h-3 ml-1" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
            
            {/* Stats */}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{creator.stats.totalViews.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Total Views</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{creator.stats.totalLikes.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Total Likes</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{creator.stats.averageRating}</div>
                  <div className="text-xs text-gray-500">Avg. Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-100">
            <TabButton
              active={activeTab === 'products'}
              onClick={() => setActiveTab('products')}
            >
              Products
            </TabButton>
            <TabButton
              active={activeTab === 'lives'}
              onClick={() => setActiveTab('lives')}
            >
              Past Lives
            </TabButton>
          </div>
          
          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'products' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Products ({products.length})</h2>
                  <div className="flex items-center gap-2">
                    {/* Add filters or sorting options here */}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
            
            {activeTab === 'lives' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Past Lives ({pastLives.length})</h2>
                  <div className="flex items-center gap-2">
                    {/* Add filters or sorting options here */}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {pastLives.map(live => (
                    <LiveCard key={live.id} live={live} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
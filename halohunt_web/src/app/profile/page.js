"use client";
import { useState, useEffect } from 'react';
import {
  User, Store, Plus, ChevronDown,
  ShoppingBag, Video, Menu, X,
  LogOut, Bell, Heart, HelpCircle,
  Settings, Warehouse, Shield, CreditCard,
  MessageSquare, ChevronRight, UserCheck,
  MapPin, Calendar, Instagram, Twitter, Globe,
  Edit, ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const TabButton = ({ active, icon: Icon, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? 'bg-purple-100 text-purple-600' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      {children}
    </button>
  );
};

const QuickActionButton = ({ icon: Icon, children }) => {
  return (
    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 w-full text-left text-sm">
      <Icon className="w-4 h-4" />
      {children}
    </button>
  );
};

const ActionButton = ({ icon: Icon, children, onClick, className }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${className}`}
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </button>
  );
};

const MenuOption = ({ icon: Icon, label, href, onClick }) => {
  const content = (
    <>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-purple-600" />
        </div>
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center justify-between p-4 hover:bg-gray-50">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="flex items-center justify-between p-4 hover:bg-gray-50 w-full">
      {content}
    </button>
  );
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('lives');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [showAllBio, setShowAllBio] = useState(false);
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Default placeholder data for fields not available in the user object
  const defaultUserData = {
    username: user ? `@${user?.fullName?.toLowerCase().replace(/\s+/g, '') || 'user'}` : '@user',
    bio: "No bio available",
    coverImage: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&h=400&fit=crop",
    location: "Not specified",
    joinedDate: user ? new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently",
    isSeller: user?.role === 'seller',
    listingsCount: 0,
    livesCount: 0,
    followers: 0,
    following: 0,
    socialLinks: {
      instagram: "",
      twitter: "",
      website: ""
    },
    stats: {
      totalViews: 0,
      totalLikes: 0,
      averageRating: 0
    }
  };

  // Sample products data - would be fetched from API in a real app
  const products = [
    {
      id: "p1",
      name: "Modern Desk Lamp",
      price: 59.99,
      discountPrice: 49.99,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=400&fit=crop",
      rating: 4.8,
      reviews: 32
    },
    {
      id: "p2",
      name: "Minimalist Watch",
      price: 129.99,
      discountPrice: null,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop",
      rating: 4.9,
      reviews: 47
    },
    {
      id: "p3",
      name: "Wireless Earbuds",
      price: 89.99,
      discountPrice: 69.99,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=400&fit=crop",
      rating: 4.7,
      reviews: 28
    },
    {
      id: "p4",
      name: "Leather Wallet",
      price: 45.00,
      discountPrice: null,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=400&fit=crop",
      rating: 4.6,
      reviews: 19
    }
  ];

  // Sample past lives data - would be fetched from API in a real app
  const pastLives = [
    {
      id: "live-1",
      title: "Product Design Masterclass",
      thumbnail: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&h=400&fit=crop",
      date: "3 days ago",
      duration: "1:15:22",
      views: 1450,
      likes: 324
    },
    {
      id: "live-2",
      title: "New Product Showcase",
      thumbnail: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
      date: "1 week ago",
      duration: "42:18",
      views: 2760,
      likes: 512
    },
    {
      id: "live-3",
      title: "Design Tips & Tricks",
      thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
      date: "2 weeks ago",
      duration: "58:45",
      views: 1890,
      likes: 276
    }
  ];

  const menuItems = [
    { icon: Heart, label: 'Favorites', href: '/favorites' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: HelpCircle, label: 'Help & Support', href: '/support' },
    { icon: LogOut, label: 'Sign Out', onClick: () => handleLogout() },
  ];

  const fullMenuOptions = [
    { icon: ShoppingBag, label: 'My Orders', href: '/profile/orders' },
    { icon: Store, label: 'My Sales', href: '/profile/sales' },
    { icon: Warehouse, label: 'Manage Warehouses', href: '/warehouses' },
    { icon: CreditCard, label: 'Transactions', href: '/profile/transactions' },
    { icon: Heart, label: 'Favorites', href: '/favorites' },
    { icon: UserCheck, label: 'KYC Verification', href: '/kyc' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: Settings, label: 'Notification Settings', href: '/profile/notification-settings' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: CreditCard, label: 'Payment Methods', href: '/payments' },
    { icon: Shield, label: 'Privacy & Security', href: '/privacy' },
    { icon: Settings, label: 'Account Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', href: '/support' },
    { icon: LogOut, label: 'Logout', onClick: () => handleLogout() }
  ];

  const handleStartStream = () => {
    console.log('Start stream clicked');
    router.push('/live/host');
  };

  const handleAddProduct = () => {
    console.log('Add product clicked');
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  // If loading, show a simple loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

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
              <Video className="w-3 h-3" />
              {live.duration}
            </div>
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow">
                <User className="w-3 h-3" />
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full Screen Menu */}
      {showFullMenu && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              <button 
                onClick={() => setShowFullMenu(false)}
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Menu</h1>
              <div className="w-10"></div> {/* Empty div for centering */}
            </div>

            {/* User Info */}
            <div className="py-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <img
                  src={user?.avatar || defaultUserData.avatar}
                  alt={user?.fullName || "User"}
                  className="w-16 h-16 rounded-full object-cover border-4 border-purple-100"
                />
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{user?.fullName || "User"}</h2>
                  <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
                </div>
              </div>
            </div>

            {/* Menu Options */}
            <div className="py-4 divide-y divide-gray-100">
              {fullMenuOptions.map((option, index) => (
                <MenuOption
                  key={index}
                  icon={option.icon}
                  label={option.label}
                  href={option.href}
                  onClick={option.onClick}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-purple-600">HaloHunt</span>
              </Link>
            </div>

            {/* Right Side - Hamburger Menu */}
            <div className="relative">
              <button
                onClick={() => setShowFullMenu(true)}
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-48 sm:h-64 md:h-80 bg-gray-200 overflow-hidden">
        <img 
          src={defaultUserData.coverImage} 
          alt={`${user?.fullName || "User"}'s cover`}
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
                  src={user?.avatar || defaultUserData.avatar}
                  alt={user?.fullName || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{user?.fullName || "User"}</h1>
                <p className="text-sm text-gray-500 mb-2">{defaultUserData.username}</p>
                
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{defaultUserData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Joined {defaultUserData.joinedDate}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-3 text-sm">
                  <div>
                    <span className="font-bold text-gray-900">{defaultUserData.livesCount}</span>
                    <span className="text-gray-600 ml-1">Lives</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">{defaultUserData.listingsCount}</span>
                    <span className="text-gray-600 ml-1">Products</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 sm:self-start sm:ml-auto">
                <button 
                  onClick={handleStartStream}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Start Stream</span>
                </button>
                <button 
                  onClick={handleAddProduct}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
                <button 
                  onClick={handleEditProfile}
                  className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Bio */}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-700">
                {showAllBio || defaultUserData.bio.length <= 150 
                  ? defaultUserData.bio 
                  : `${defaultUserData.bio.substring(0, 150)}...`}
              </p>
              {defaultUserData.bio.length > 150 && (
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
            
            {/* Stats */}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{defaultUserData.stats.totalViews.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Total Views</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{defaultUserData.stats.totalLikes.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Total Likes</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{defaultUserData.stats.averageRating}</div>
                  <div className="text-xs text-gray-500">Avg. Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('lives')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'lives' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Lives
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'products' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Products
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'lives' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">My Lives ({pastLives.length})</h2>
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
            
            {activeTab === 'products' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">My Products ({products.length})</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
} 
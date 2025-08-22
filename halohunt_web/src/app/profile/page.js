"use client";
import { useState, useEffect } from 'react';
import {
  User, Store, Plus, ChevronDown,
  ShoppingBag, Video, Menu, X,
  LogOut, Bell, Heart, HelpCircle,
  Settings, Warehouse, Shield, CreditCard,
  MessageSquare, ChevronRight, UserCheck,
  MapPin, Calendar, Instagram, Twitter, Globe,
  Edit, ChevronUp, MoreVertical, Trash2
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import LiveModel from '../../components/liveModel';
import ProductModal from '../components/ProductModal';
import { streamService } from '../services/streamService';
import { productService } from '../services/productService';

const TabButton = ({ active, icon: Icon, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active
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
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [liveStreamSuccess, setLiveStreamSuccess] = useState(false);
  const [userStreams, setUserStreams] = useState([]);
  const [loadingStreams, setLoadingStreams] = useState(false);
  const [editingStream, setEditingStream] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productSuccess, setProductSuccess] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openDropdown]);
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  // Default placeholder data for fields not available in the user object
  const defaultUserData = {
    username: user ? `@${user?.fullName?.toLowerCase().replace(/\s+/g, '') || 'user'}` : '@user',
    bio: "No bio available",
    coverImage: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&h=400&fit=crop",
    location: "Not specified",
    joinedDate: user ? new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently",
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
    },
    avatar: "https://ui-avatars.com/api/?name=User&background=EEE&color=888",
    fullName: "User",
    email: "No email"
  };

  // Helper to get user data with fallback to default
  const getUserData = (key) => {
    // console.log(user)
    if (!user || user[key] === undefined || user[key] === null || user[key] === "") {
      return defaultUserData[key];
    }
    return user[key];
  };

  // Helper for nested stats
  const getUserStat = (statKey) => {
    if (!user || !user.stats || user.stats[statKey] === undefined || user.stats[statKey] === null) {
      return defaultUserData.stats[statKey];
    }
    return user.stats[statKey];
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch user streams
  const fetchUserStreams = async () => {
    if (!user) return;

    try {
      setLoadingStreams(true);
      const result = await streamService.getMyStreams();
      setUserStreams(result.data || []);
    } catch (error) {
      console.error('Error fetching user streams:', error);
    } finally {
      setLoadingStreams(false);
    }
  };

  // Fetch user products
  const fetchUserProducts = async () => {
    if (!user) return;

    try {
      setLoadingProducts(true);
      const result = await productService.getMyProducts();
      setUserProducts(result.data || []);
    } catch (error) {
      console.error('Error fetching user products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch streams when user is loaded
  useEffect(() => {
    if (user) {
      fetchUserStreams();
      fetchUserProducts();
    }
  }, [user]);



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

  const handleAddProduct = () => {
    setShowAddProductModal(true);
  };

  const handleProductModalSubmit = async (formData) => {
    try {
      console.log('Product data:', formData);

      if (editingProduct) {
        // Update existing product
        const result = await productService.updateProduct(editingProduct._id, formData);
        console.log('Product updated successfully!', result);
        setProductSuccess(true);
        setEditingProduct(null);
      } else {
        // Create new product
        const result = await productService.createProduct(formData);
        console.log('Product created successfully!', result);
        setProductSuccess(true);
      }

      // Refresh the products list
      await fetchUserProducts();

    } catch (error) {
      console.error('Error saving product:', error);
      alert(`Failed to save product: ${error.message}`);
      throw error; // Re-throw to prevent modal from closing
    }
  };

  const handleEditProduct = (product) => {
    console.log('handleEditProduct called with product:', product);
    setEditingProduct(product);
    setShowAddProductModal(true);
    setOpenDropdown(null); // Close dropdown
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        await productService.deleteProduct(productId);
        console.log('Product deleted successfully!');
        await fetchUserProducts(); // Refresh the products list
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(`Failed to delete product: ${error.message}`);
      }
    }
    setOpenDropdown(null); // Close dropdown
  };

  const handleLiveModalSubmit = async (formData) => {
    try {
      console.log('Live stream data:', formData);

      if (editingStream) {
        // Update existing stream
        const result = await streamService.updateStream(editingStream._id, formData);
        console.log('Live stream updated successfully!', result);
        setLiveStreamSuccess(true);
        setEditingStream(null);
      } else {
        // Create new stream
        const result = await streamService.createStream(formData);
        console.log('Live stream created successfully!', result);
        setLiveStreamSuccess(true);
      }

      // Refresh the streams list
      await fetchUserStreams();

    } catch (error) {
      console.error('Error saving live stream:', error);
      alert(`Failed to save live stream: ${error.message}`);
      throw error; // Re-throw to prevent modal from closing
    }
  };

  const handleEditStream = (stream) => {
    console.log('handleEditStream called with stream:', stream);
    setEditingStream(stream);
    setShowLiveModal(true);
    setOpenDropdown(null); // Close dropdown
  };

  const handleDeleteStream = async (streamId) => {
    if (window.confirm('Are you sure you want to delete this stream? This action cannot be undone.')) {
      try {
        await streamService.deleteStream(streamId);
        console.log('Stream deleted successfully!');
        await fetchUserStreams(); // Refresh the streams list
      } catch (error) {
        console.error('Error deleting stream:', error);
        alert(`Failed to delete stream: ${error.message}`);
      }
    }
    setOpenDropdown(null); // Close dropdown
  };

  const handleStreamClick = (streamId) => {
    router.push(`/live/host/${streamId}`);
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    router.push('/profile/edit');
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
    const isDropdownOpen = openDropdown === product._id;

    // Get primary image or first image
    const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
    const imageUrl = primaryImage?.url || "https://via.placeholder.com/300x400?text=No+Image";

    // Calculate discounted price
    const discountedPrice = product.discountPercentage && product.discountPercentage > 0
      ? product.price - (product.price * product.discountPercentage / 100)
      : null;

    // Get status badge color
    const getStatusColor = (status) => {
      switch (status) {
        case 'approved': return 'bg-green-500';
        case 'pending': return 'bg-yellow-500';
        case 'draft': return 'bg-gray-500';
        default: return 'bg-gray-400';
      }
    };

    return (
      <div className="block">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow relative cursor-pointer">
          {/* Three-dot menu */}
          <div
            className="absolute top-2 right-2 z-20 dropdown-container"
            onClick={e => {
              e.stopPropagation();
              // Do not allow event to bubble to parent
            }}
            style={{ zIndex: 30 }}
          >
            <button
              onClick={e => {
                e.stopPropagation();
                setOpenDropdown(isDropdownOpen ? null : product._id);
              }}
              className="p-1.5 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors"
              tabIndex={0}
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-30 dropdown-container"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleEditProduct(product);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleDeleteProduct(product._id);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            <span className={`${getStatusColor(product.status)} text-white px-2 py-1 rounded-full text-xs font-medium shadow`}>
              {product.status}
            </span>
          </div>

          {/* Product Image and Info - Make the rest clickable */}
          <Link
            href={`/search/${product._id}`}
            className="block"
            tabIndex={-1}
            onClick={e => {
              // If the click originated from the 3-dot menu or dropdown, do nothing
              if (
                e.target.closest('.dropdown-container')
              ) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
            }}
          >
            {/* Product Image */}
            <div className="relative aspect-[3/4] bg-gray-100">
              <img
                src={imageUrl}
                alt={product.name || "Product"}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-2 right-12 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100">
                <Heart className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-900 truncate">{product.name || "Product"}</h3>
              <p className="text-xs text-gray-500 mt-1 truncate">{product.shortDescription || product.description?.substring(0, 50)}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-baseline gap-1">
                  {discountedPrice ? (
                    <>
                      <span className="text-sm font-bold text-purple-600">${discountedPrice.toFixed(2)}</span>
                      <span className="text-xs text-gray-500 line-through">${product.price?.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-sm font-bold text-gray-900">${product.price?.toFixed(2) || '0.00'}</span>
                  )}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="text-yellow-400">★</span>
                  <span>{product.averageRating || 0}</span>
                  <span className="mx-1">·</span>
                  <span>{product.totalReviews || 0} reviews</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${product.isInStock
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {product.isInStock ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}
                </span>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                  {product.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{product.tags.length - 3} more</span>
                  )}
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    );
  };

  const LiveCard = ({ live }) => {
    // Format date for display
    const formatDate = (dateString) => {
      if (!dateString) return "Unknown date";
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return "Today";
      if (diffDays === 2) return "Yesterday";
      if (diffDays <= 7) return `${diffDays - 1} days ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Format duration
    const formatDuration = (duration) => {
      if (!duration) return "00:00:00";
      const minutes = Math.floor(duration / 60);
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const seconds = duration % 60;

      if (hours > 0) {
        return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      return `${remainingMinutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Get status badge color
    const getStatusColor = (status) => {
      switch (status) {
        case 'live': return 'bg-red-500';
        case 'scheduled': return 'bg-blue-500';
        case 'ended': return 'bg-gray-500';
        default: return 'bg-gray-400';
      }
    };

    const isDropdownOpen = openDropdown === live._id;

    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow relative">
        {/* Three-dot menu */}
        <div className="absolute top-2 right-2 z-10 dropdown-container">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdown(isDropdownOpen ? null : live._id);
            }}
            className="p-1.5 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-20 dropdown-container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditStream(live);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteStream(live._id);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Clickable card content */}
        <div
          onClick={() => handleStreamClick(live._id)}
          className="cursor-pointer"
        >
          <div className="relative aspect-video bg-gray-100">
            <img
              src={live.thumbnail || "https://via.placeholder.com/600x400?text=No+Thumbnail"}
              alt={live.title || "Live"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

            {/* Status Badge */}
            <div className="absolute top-2 left-2">
              <span className={`${getStatusColor(live.status)} text-white px-2 py-1 rounded-full text-xs font-medium shadow`}>
                {live.status}
              </span>
            </div>

            {/* Duration */}
            {live.duration && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow">
                <Video className="w-3 h-3" />
                {formatDuration(live.duration)}
              </div>
            )}

            {/* Stats */}
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow">
                <User className="w-3 h-3" />
                {(live.viewerCount !== undefined && live.viewerCount !== null) ? live.viewerCount.toLocaleString() : "0"}
              </div>
              <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow">
                <Heart className="w-3 h-3" />
                {(live.likesCount !== undefined && live.likesCount !== null) ? live.likesCount.toLocaleString() : "0"}
              </div>
            </div>
          </div>
          <div className="p-3">
            <h3 className="text-sm font-medium text-gray-900 truncate">{live.title || "Live"}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {live.scheduledAt ? formatDate(live.scheduledAt) : formatDate(live.createdAt)}
            </p>
            {live.hashtags && live.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {live.hashtags.slice(0, 3).map((hashtag, index) => (
                  <span key={index} className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                    #{hashtag}
                  </span>
                ))}
                {live.hashtags.length > 3 && (
                  <span className="text-xs text-gray-500">+{live.hashtags.length - 3} more</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
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
                  src={getUserData('avatar')}
                  alt={getUserData('fullName')}
                  className="w-16 h-16 rounded-full object-cover border-4 border-purple-100"
                />
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{getUserData('fullName')}</h2>
                  <p className="text-sm text-gray-500">{getUserData('email')}</p>
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

      {/* Success Messages */}
      {liveStreamSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mx-4 mt-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Live stream created successfully!</p>
              <p className="text-xs text-green-600">Your stream is now ready to go live.</p>
            </div>
            <button
              onClick={() => setLiveStreamSuccess(false)}
              className="ml-auto text-green-400 hover:text-green-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {productSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mx-4 mt-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Product saved successfully!</p>
              <p className="text-xs text-green-600">Your product has been saved and is ready for review.</p>
            </div>
            <button
              onClick={() => setProductSuccess(false)}
              className="ml-auto text-green-400 hover:text-green-600"
            >
              <X className="w-4 h-4" />
            </button>
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
          src={getUserData('coverImage')}
          alt={`${getUserData('fullName')}'s cover`}
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
                  src={getUserData('avatar')}
                  alt={getUserData('fullName')}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{getUserData('fullName')}</h1>
                <p className="text-sm text-gray-500 mb-2">{getUserData('username')}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{getUserData('location')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      Joined {user && user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                        : defaultUserData.joinedDate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-3 text-sm">
                  <div>
                    <span className="font-bold text-gray-900">{userStreams.length}</span>
                    <span className="text-gray-600 ml-1">Lives</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">{userProducts.length}</span>
                    <span className="text-gray-600 ml-1">Products</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 sm:self-start sm:ml-auto">
                <button
                  onClick={() => setShowLiveModal(true)}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Go Live</span>
                </button>
                <button
                  onClick={() => setShowAddProductModal(true)}
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
                {(() => {
                  const bio = getUserData('bio');
                  if (!bio) return defaultUserData.bio;
                  if (showAllBio || bio.length <= 150) return bio;
                  return `${bio.substring(0, 150)}...`;
                })()}
              </p>
              {(() => {
                const bio = getUserData('bio');
                return bio && bio.length > 150;
              })() && (
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
                  <div className="text-lg font-bold text-gray-900">{getUserStat('totalViews').toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Total Views</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{getUserStat('totalLikes').toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Total Likes</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{getUserStat('averageRating')}</div>
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
              className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'lives'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Lives
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'products'
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
                  <h2 className="text-lg font-medium text-gray-900">
                    My Lives ({userStreams.length})
                    {loadingStreams && <span className="text-sm text-gray-500 ml-2">Loading...</span>}
                  </h2>
                  <div className="flex items-center gap-2">
                    {/* Add filters or sorting options here */}
                  </div>
                </div>

                {loadingStreams ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <span className="ml-2 text-gray-600">Loading streams...</span>
                  </div>
                ) : userStreams.length === 0 ? (
                  <div className="text-center py-8">
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No streams yet</h3>
                    <p className="text-gray-500 mb-4">Start your first live stream to see it here</p>
                    <button
                      onClick={() => setShowLiveModal(true)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Create Your First Stream
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userStreams.map(stream => (
                      <LiveCard key={stream._id} live={stream} />
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'products' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    My Products ({userProducts.length})
                    {loadingProducts && <span className="text-sm text-gray-500 ml-2">Loading...</span>}
                  </h2>
                  <div className="flex items-center gap-2">
                    {/* Add filters or sorting options here */}
                  </div>
                </div>

                {loadingProducts ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <span className="ml-2 text-gray-600">Loading products...</span>
                  </div>
                ) : userProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                    <p className="text-gray-500 mb-4">Start selling by adding your first product</p>
                    <button
                      onClick={() => setShowAddProductModal(true)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Add Your First Product
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {userProducts.map(product => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Live Model */}
      <LiveModel
        isOpen={showLiveModal}
        onClose={() => {
          setShowLiveModal(false);
          setEditingStream(null);
        }}
        onSubmit={handleLiveModalSubmit}
        initialData={editingStream}
        mode={editingStream ? "edit" : "create"}
      />

      {/* Product Modal */}
      <ProductModal
        isOpen={showAddProductModal}
        onClose={() => {
          setShowAddProductModal(false);
          setEditingProduct(null);
        }}
        onSubmit={handleProductModalSubmit}
        initialData={editingProduct}
        mode={editingProduct ? "edit" : "create"}
      />
    </div>
  );
} 
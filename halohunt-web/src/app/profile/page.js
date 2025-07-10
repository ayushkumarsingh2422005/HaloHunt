"use client";
import { useState } from 'react';
import {
  User, Store, Plus, ChevronDown,
  ShoppingBag, Video, Menu, X,
  LogOut, Bell, Heart, HelpCircle,
  Settings, Warehouse, Shield, CreditCard,
  MessageSquare, ChevronRight, UserCheck
} from 'lucide-react';
import Link from 'next/link';

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

  // Sample user data - in a real app this would come from your auth/user state
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces&auto=format",
    joinedDate: "March 2024",
    isSeller: true,
    listingsCount: 12,
    livesCount: 8
  };

  const menuItems = [
    { icon: Heart, label: 'Favorites', href: '/favorites' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: HelpCircle, label: 'Help & Support', href: '/support' },
    { icon: LogOut, label: 'Sign Out', onClick: () => console.log('Sign out clicked') },
  ];

  const fullMenuOptions = [
    { icon: Store, label: 'My Store', href: '/store' },
    { icon: Warehouse, label: 'Manage Warehouses', href: '/warehouses' },
    { icon: Heart, label: 'Favorites', href: '/favorites' },
    { icon: UserCheck, label: 'KYC Verification', href: '/kyc' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: CreditCard, label: 'Payment Methods', href: '/payments' },
    { icon: Shield, label: 'Privacy & Security', href: '/privacy' },
    { icon: Settings, label: 'Account Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', href: '/support' },
    { icon: LogOut, label: 'Logout', onClick: () => console.log('Logout clicked') }
  ];

  const handleStartStream = () => {
    console.log('Start stream clicked');
  };

  const handleAddProduct = () => {
    console.log('Add product clicked');
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
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-purple-100"
                />
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-center gap-4 sm:gap-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-purple-100"
              />
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-medium text-gray-900">{user.name}</h1>
                <p className="text-sm text-gray-500">Member since {user.joinedDate}</p>
              </div>
            </div>
            
            {/* Action Buttons - Hidden on mobile, visible on PC */}
            <div className="hidden sm:flex items-center gap-3 sm:ml-auto">
              <ActionButton 
                icon={Video} 
                onClick={handleStartStream}
                className="bg-purple-600 text-white hover:bg-purple-700"
              >
                Start Stream
              </ActionButton>
              <ActionButton 
                icon={ShoppingBag} 
                onClick={handleAddProduct}
                className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Add Product
              </ActionButton>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:gap-6 gap-4">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-900">{user.livesCount}</div>
                <div className="text-xs sm:text-sm text-gray-500">Lives</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-gray-900">{user.listingsCount}</div>
                <div className="text-xs sm:text-sm text-gray-500">Products</div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons - Visible on mobile, hidden on PC */}
          <div className="flex items-center gap-3 mt-6 sm:hidden">
            <ActionButton 
              icon={Video} 
              onClick={handleStartStream}
              className="bg-purple-600 text-white hover:bg-purple-700 flex-1"
            >
              Start Stream
            </ActionButton>
            <ActionButton 
              icon={ShoppingBag} 
              onClick={handleAddProduct}
              className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex-1"
            >
              Add Product
            </ActionButton>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-200 -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabButton
            active={activeTab === 'lives'}
            icon={Video}
            onClick={() => setActiveTab('lives')}
          >
            Lives
          </TabButton>
          <TabButton
            active={activeTab === 'products'}
            icon={ShoppingBag}
            onClick={() => setActiveTab('products')}
          >
            Products
          </TabButton>
        </div>

        {/* Content Sections */}
        <div className="grid gap-6">
          {activeTab === 'lives' && (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-medium mb-4">My Lives</h2>
              {/* Lives content */}
            </div>
          )}
          
          {activeTab === 'products' && (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-medium mb-4">My Products</h2>
              {/* Products content */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
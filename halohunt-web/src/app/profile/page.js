"use client";
import { useState } from 'react';
import {
  User, Store, MapPin, CreditCard, Bell, Lock, Package, 
  Settings, ChevronRight, Edit2, Shield, Truck, Wallet,
  BarChart, MessageSquare, Heart, Clock, LogOut, Plus, ChevronDown,
  ShoppingBag, Video
} from 'lucide-react';
import Link from 'next/link';

const ProfileSection = ({ icon: Icon, title, description, href, onClick, badge }) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${href || onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 truncate">{description}</p>
        </div>
        {badge && (
          <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-600 rounded-full">
            {badge}
          </span>
        )}
        {(href || onClick) && <ChevronRight className="w-5 h-5 text-gray-400" />}
      </div>
    </div>
  );
};

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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('activity');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [role, setRole] = useState('both'); // 'buyer', 'seller', 'both'

  // Sample user data - in a real app this would come from your auth/user state
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces&auto=format",
    phone: "+1 (555) 123-4567",
    joinedDate: "March 2024",
    isSeller: true,
    storeName: "John's Electronics",
    ordersCount: 25,
    listingsCount: 12,
    revenue: "5,230",
    rating: 4.8
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

            {/* Action Buttons */}
            <div className="flex items-center justify-between sm:justify-end gap-3 mt-4 sm:mt-0 sm:ml-auto">
              {/* Quick Actions Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add New</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showQuickActions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                    <QuickActionButton icon={Video}>
                      Start Live Stream
                    </QuickActionButton>
                    <QuickActionButton icon={ShoppingBag}>
                      Add New Product
                    </QuickActionButton>
                  </div>
                )}
              </div>
              {/* Settings Link */}
              <Link
                href="/settings"
                className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          {user.isSeller && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 sm:flex sm:items-center sm:gap-6 gap-4">
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-900">{user.ordersCount}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-900">{user.listingsCount}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Listings</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-900">${user.revenue}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-900">{user.rating}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Rating</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-200 -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabButton
            active={activeTab === 'activity'}
            icon={User}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </TabButton>
          <TabButton
            active={activeTab === 'orders'}
            icon={Package}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </TabButton>
          <TabButton
            active={activeTab === 'wishlist'}
            icon={Heart}
            onClick={() => setActiveTab('wishlist')}
          >
            Wishlist
          </TabButton>
          {user.isSeller && (
            <>
              <TabButton
                active={activeTab === 'store'}
                icon={Store}
                onClick={() => setActiveTab('store')}
              >
                Store
              </TabButton>
              <TabButton
                active={activeTab === 'analytics'}
                icon={BarChart}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics
              </TabButton>
            </>
          )}
          <TabButton
            active={activeTab === 'messages'}
            icon={MessageSquare}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </TabButton>
        </div>

        {/* Content Sections */}
        <div className="grid gap-6">
          {activeTab === 'activity' && (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
              {/* Activity content */}
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-medium mb-4">My Orders</h2>
              {/* Orders content */}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-medium mb-4">Wishlist</h2>
              {/* Wishlist content */}
            </div>
          )}

          {activeTab === 'store' && user.isSeller && (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-medium mb-4">Store Management</h2>
              {/* Store content */}
            </div>
          )}

          {activeTab === 'analytics' && user.isSeller && (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-medium mb-4">Analytics</h2>
              {/* Analytics content */}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-medium mb-4">Messages</h2>
              {/* Messages content */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
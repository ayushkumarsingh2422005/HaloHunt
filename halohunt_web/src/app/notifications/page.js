"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, ShoppingBag, Video, Tag, AlertCircle, 
  MessageCircle, Heart, Calendar, User
} from 'lucide-react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Your order has been shipped',
      message: 'Your order #12345 has been shipped and will arrive in 2-3 days.',
      time: '10m',
      read: false,
      actionUrl: '/orders/12345',
      image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      type: 'live',
      title: 'TechGadgets is live now',
      message: 'TechGadgets started a live stream with new product launches!',
      time: '15m',
      read: true,
      actionUrl: '/live/view/123',
      image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      type: 'price',
      title: 'Price drop on your wishlist item',
      message: 'Premium Watch is now 15% off!',
      time: '2h',
      read: false,
      actionUrl: '/search/456',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      type: 'system',
      title: 'Account verified',
      message: 'Your account has been successfully verified.',
      time: '1d',
      read: true,
      actionUrl: '/profile',
      image: null
    },
    {
      id: 5,
      type: 'message',
      title: 'New message from ElectronicsHub',
      message: 'Hello! I wanted to follow up on your inquiry about the product.',
      time: '2d',
      read: false,
      actionUrl: '/messages/789',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      id: 6,
      type: 'follow',
      title: 'LuxuryTimepieces started following you',
      message: '',
      time: '3d',
      read: true,
      actionUrl: '/profile/luxurytimepieces',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    },
    {
      id: 7,
      type: 'like',
      title: 'TechEnthusiast liked your review',
      message: 'Your review on Premium Watch received a like',
      time: '5d',
      read: true,
      actionUrl: '/reviews/my',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
    }
  ]);

  // Mark notification as read when clicked
  const handleNotificationClick = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-5 h-5 text-purple-600" />;
      case 'live':
        return <Video className="w-5 h-5 text-red-500" />;
      case 'price':
        return <Tag className="w-5 h-5 text-green-500" />;
      case 'system':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-indigo-500" />;
      case 'promotion':
        return <Calendar className="w-5 h-5 text-orange-500" />;
      case 'like':
        return <Heart className="w-5 h-5 text-pink-500" />;
      case 'follow':
        return <User className="w-5 h-5 text-cyan-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="p-1 rounded-full hover:bg-gray-100 mr-3">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <Link 
                key={notification.id} 
                href={notification.actionUrl}
                onClick={() => handleNotificationClick(notification.id)}
                className={`block px-4 py-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-purple-50' : 'bg-white'}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {notification.image ? (
                      <img 
                        src={notification.image} 
                        alt="" 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <span className={`text-xs ${!notification.read ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
                        {notification.time}
                      </span>
                    </div>
                    {notification.message && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications yet</h3>
            <p className="text-sm text-gray-500">
              When you get notifications, they'll show up here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage; 
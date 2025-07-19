"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, ShoppingBag, Clock, Tag, AlertCircle, 
  MessageCircle, Heart, Video, Calendar, ExternalLink,
  Trash2, ArrowLeft, ArrowRight
} from 'lucide-react';

const NotificationDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mock notifications data - in a real app, this would come from an API
  const mockNotifications = [
    {
      id: '1',
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped and will arrive in 2-3 days.',
      time: '10 minutes ago',
      read: false,
      actionUrl: '/orders/12345',
      image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=300&h=300&fit=crop',
      details: {
        orderNumber: '12345',
        status: 'Shipped',
        estimatedDelivery: 'June 15, 2023',
        trackingNumber: 'TRK123456789',
        carrier: 'FedEx',
        items: [
          { name: 'Premium Watch', quantity: 1, price: '$299.99' }
        ]
      }
    },
    {
      id: '2',
      type: 'live',
      title: 'Live Stream Starting',
      message: 'TechGadgets is going live in 15 minutes with new product launches!',
      time: '15 minutes ago',
      read: true,
      actionUrl: '/live/view/123',
      image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=300&h=300&fit=crop',
      details: {
        streamerName: 'TechGadgets',
        streamTitle: 'New Summer Tech Launches',
        startTime: 'June 10, 2023 - 3:00 PM',
        duration: '1 hour',
        products: [
          { name: 'New Smartphone XS', price: '$899.99' },
          { name: 'Wireless Earbuds Pro', price: '$149.99' }
        ]
      }
    },
    {
      id: '3',
      type: 'price',
      title: 'Price Drop Alert',
      message: 'The Premium Watch you saved is now 15% off!',
      time: '2 hours ago',
      read: false,
      actionUrl: '/search/456',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      details: {
        productName: 'Premium Watch',
        originalPrice: '$299.99',
        newPrice: '$254.99',
        discount: '15%',
        validUntil: 'June 15, 2023',
        seller: 'LuxuryTimepieces'
      }
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchNotification = () => {
      setLoading(true);
      
      try {
        // Find notification by ID from our mock data
        const found = mockNotifications.find(n => n.id === params.id);
        
        if (found) {
          setNotification(found);
          setError(null);
        } else {
          setError('Notification not found');
        }
      } catch (err) {
        setError('Failed to load notification');
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
  }, [params.id]);

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-6 h-6 text-purple-600" />;
      case 'live':
        return <Video className="w-6 h-6 text-red-500" />;
      case 'price':
        return <Tag className="w-6 h-6 text-green-500" />;
      case 'system':
        return <AlertCircle className="w-6 h-6 text-blue-500" />;
      case 'message':
        return <MessageCircle className="w-6 h-6 text-indigo-500" />;
      case 'promotion':
        return <Calendar className="w-6 h-6 text-orange-500" />;
      case 'like':
        return <Heart className="w-6 h-6 text-pink-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  // Handle delete notification
  const handleDeleteNotification = () => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      // In a real app, this would be an API call
      router.push('/notifications');
    }
  };

  // Render notification details based on type
  const renderNotificationDetails = () => {
    if (!notification || !notification.details) return null;
    
    switch (notification.type) {
      case 'order':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Order Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Order Number:</span>
                  <span className="font-medium">{notification.details.orderNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-medium text-green-600">{notification.details.status}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estimated Delivery:</span>
                  <span className="font-medium">{notification.details.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tracking Number:</span>
                  <span className="font-medium">{notification.details.trackingNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Carrier:</span>
                  <span className="font-medium">{notification.details.carrier}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Items</h3>
              <div className="space-y-3">
                {notification.details.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link 
                href={notification.actionUrl}
                className="flex-1 bg-purple-600 text-white text-center py-3 rounded-lg text-sm font-medium hover:bg-purple-700"
              >
                Track Order
              </Link>
              <Link 
                href="/orders"
                className="flex-1 bg-gray-100 text-gray-700 text-center py-3 rounded-lg text-sm font-medium hover:bg-gray-200"
              >
                View All Orders
              </Link>
            </div>
          </div>
        );
        
      case 'live':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <img 
                src={notification.image} 
                alt={notification.details.streamTitle} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{notification.details.streamTitle}</h3>
                <p className="text-sm text-gray-500 mt-1">By {notification.details.streamerName}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Start Time:</span>
                    <span className="font-medium">{notification.details.startTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{notification.details.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Featured Products</h3>
              <div className="space-y-3">
                {notification.details.products.map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <p className="text-sm font-medium">{product.name}</p>
                    <span className="text-sm font-medium">{product.price}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link 
                href={notification.actionUrl}
                className="flex-1 bg-red-500 text-white text-center py-3 rounded-lg text-sm font-medium hover:bg-red-600"
              >
                Join Live Stream
              </Link>
              <button 
                className="flex-1 bg-gray-100 text-gray-700 text-center py-3 rounded-lg text-sm font-medium hover:bg-gray-200"
              >
                Set Reminder
              </button>
            </div>
          </div>
        );
        
      case 'price':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <img 
                src={notification.image} 
                alt={notification.details.productName} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{notification.details.productName}</h3>
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                    {notification.details.discount} OFF
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Sold by {notification.details.seller}</p>
                
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-xl font-bold text-gray-900">{notification.details.newPrice}</span>
                  <span className="text-sm text-gray-500 line-through">{notification.details.originalPrice}</span>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  Offer valid until {notification.details.validUntil}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link 
                href={notification.actionUrl}
                className="flex-1 bg-purple-600 text-white text-center py-3 rounded-lg text-sm font-medium hover:bg-purple-700"
              >
                View Product
              </Link>
              <button 
                className="flex-1 bg-gray-100 text-gray-700 text-center py-3 rounded-lg text-sm font-medium hover:bg-gray-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !notification) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
        <div className="bg-white sticky top-0 z-10 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Link href="/notifications" className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Notification</h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Notification not found</h2>
          <p className="text-gray-500 mb-6">The notification you're looking for doesn't exist or has been deleted.</p>
          <Link 
            href="/notifications" 
            className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Notifications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/notifications" className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Notification</h1>
            </div>
            <button
              onClick={handleDeleteNotification}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-start gap-4">
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
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">{notification.title}</h2>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              <p className="text-gray-600 mt-2">{notification.message}</p>
            </div>
          </div>
        </div>

        {/* Notification Type-Specific Details */}
        {renderNotificationDetails()}

        {/* Navigation between notifications */}
        <div className="mt-8 flex justify-between">
          <Link 
            href={`/notifications/${Number(params.id) > 1 ? Number(params.id) - 1 : params.id}`}
            className={`flex items-center gap-1 py-2 px-3 rounded-lg text-sm ${
              Number(params.id) <= 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Link>
          <Link 
            href={`/notifications/${Number(params.id) < mockNotifications.length ? Number(params.id) + 1 : params.id}`}
            className={`flex items-center gap-1 py-2 px-3 rounded-lg text-sm ${
              Number(params.id) >= mockNotifications.length 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailPage; 
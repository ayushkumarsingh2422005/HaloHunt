"use client";
import { useState } from 'react';
import { ChevronLeft, Search, Filter, Package, Truck, CheckCircle, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Sample order data
const orders = [
  {
    id: "ORD12345678",
    date: "June 15, 2023",
    total: 449.98,
    status: "delivered",
    items: [
      {
        id: 1,
        name: "Nike Air Max 270",
        price: 150,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        quantity: 1
      },
      {
        id: 2,
        name: "Wireless Noise Cancelling Headphones",
        price: 299.98,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        quantity: 1
      }
    ],
    deliveredDate: "June 20, 2023"
  },
  {
    id: "ORD87654321",
    date: "May 28, 2023",
    total: 349.99,
    status: "delivered",
    items: [
      {
        id: 3,
        name: "Premium Smart Watch",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        quantity: 1
      }
    ],
    deliveredDate: "June 2, 2023"
  },
  {
    id: "ORD56781234",
    date: "June 25, 2023",
    total: 129.99,
    status: "processing",
    items: [
      {
        id: 4,
        name: "Bluetooth Portable Speaker",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
        quantity: 1
      }
    ],
    estimatedDelivery: "July 2, 2023"
  },
  {
    id: "ORD43218765",
    date: "June 27, 2023",
    total: 599.98,
    status: "shipped",
    items: [
      {
        id: 5,
        name: "Smartphone Flagship Model",
        price: 599.98,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9",
        quantity: 1
      }
    ],
    trackingNumber: "TRK987654321",
    estimatedDelivery: "July 5, 2023"
  }
];

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    processing: {
      color: "bg-blue-100 text-blue-600",
      icon: Clock
    },
    shipped: {
      color: "bg-orange-100 text-orange-600",
      icon: Truck
    },
    delivered: {
      color: "bg-green-100 text-green-600",
      icon: CheckCircle
    },
    cancelled: {
      color: "bg-red-100 text-red-600",
      icon: Package
    }
  };

  const config = statusConfig[status] || statusConfig.processing;
  const StatusIcon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${config.color}`}>
      <StatusIcon className="w-3.5 h-3.5" />
      <span className="text-xs font-medium capitalize">{status}</span>
    </div>
  );
};

const OrderCard = ({ order }) => {
  return (
    <Link href={`/profile/orders/${order.id}`}>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-medium text-gray-900">{order.id}</h3>
            <p className="text-xs text-gray-500">Ordered on {order.date}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          {order.items.slice(0, 2).map((item, index) => (
            <div key={item.id} className="relative w-16 h-16 rounded-md overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {index === 1 && order.items.length > 2 && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white font-medium">
                  +{order.items.length - 2}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-500">Total:</span> 
            <span className="font-medium text-gray-900 ml-1">${order.total.toFixed(2)}</span>
          </div>
          <div className="flex items-center text-purple-600 text-sm font-medium">
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="py-4 flex items-center">
            <Link href="/profile" className="mr-4">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search orders by ID or product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex-shrink-0">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-40 pl-10 pr-4 py-2.5 bg-white rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              style={{ backgroundPosition: "left 12px center" }}
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery || filterStatus !== 'all' 
                  ? "Try adjusting your search or filter criteria" 
                  : "You haven't placed any orders yet"}
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center px-6 py-2.5 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                Start Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from 'react';
import { Minus, Plus, Trash2, CreditCard, Truck, Gift, ChevronRight, Clock, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Sample data - in a real app this would come from your cart state management
const initialCartItems = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 150,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    quantity: 1,
    seller: "Nike Official Store",
    color: "Black/Red",
    size: "US 10",
    delivery: "Free delivery by Tomorrow"
  },
  {
    id: 2,
    name: "Wireless Noise Cancelling Headphones",
    price: 299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    quantity: 1,
    seller: "Sony Electronics",
    color: "Silver",
    variant: "XM4",
    delivery: "Express delivery available"
  }
];

// Sample recommended products
const recommendedProducts = [
  {
    id: 3,
    name: "Smart Watch Series 7",
    price: 399,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    seller: "Apple Store"
  },
  {
    id: 4,
    name: "Wireless Earbuds Pro",
    price: 199,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    seller: "Samsung Electronics"
  },
  {
    id: 5,
    name: "Premium Backpack",
    price: 89,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    seller: "Urban Gear"
  }
];

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex gap-4 py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden relative ml-4">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.seller}</p>
        <div className="mt-1 text-xs text-gray-500">
          <span>{item.color}</span>
          {item.size && <span> · Size: {item.size}</span>}
          {item.variant && <span> · {item.variant}</span>}
        </div>

        {/* Delivery Info */}
        <div className="mt-2 flex items-center text-xs text-green-600">
          <Truck className="w-4 h-4 mr-1" />
          <span>{item.delivery}</span>
        </div>

        {/* Price and Controls */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-purple-600">${item.price}</span>

          <div className="flex items-center gap-3">
            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-200 rounded-full">
              <button
                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => onRemove(item.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderSummary = ({ items }) => {
  const [couponCode, setCouponCode] = useState('');
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-6">Order Summary</h2>

      {/* Coupon Code Input */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-purple-500"
          />
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            Apply
          </button>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span>------</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-sm font-medium mb-3">Accepted Payment Methods</h3>
        <div className="flex gap-2">
          <div className="p-2 border border-gray-200 rounded-lg">
            <CreditCard className="w-6 h-6 text-gray-600" />
          </div>
          <div className="p-2 border border-gray-200 rounded-lg bg-gray-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Link href="/checkout">
        <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-full font-medium hover:bg-purple-700 transition-colors" href="/checkout">
          Proceed to Checkout
        </button>
      </Link>

      {/* Trust Badges */}
      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  );
};

const RecommendedProducts = ({ products }) => {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Recommended for You</h2>
        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow
                                         flex sm:block">
            <div className="w-32 sm:w-full aspect-square relative flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center">
              <h3 className="font-medium text-sm text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.seller}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium text-purple-600">${product.price}</span>
                <button className="text-xs bg-purple-100 text-purple-600 px-3 py-1.5 rounded-full hover:bg-purple-200 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <a
            href="/"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium text-gray-900 mb-8">Shopping Cart ({cartItems.length})</h1>

        <div className="relative lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pb-8 
                         scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent 
                         hover:scrollbar-thumb-purple-300 scrollbar-thumb-rounded-full 
                         [&::-webkit-scrollbar]:w-1.5">
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              {/* Delivery Banner */}
              <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-t-lg">
                <div className="px-6 py-4 flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) >= 200 ? (
                      <div className="text-purple-700 font-medium">
                        🎉 Congratulations! You've unlocked free shipping!
                      </div>
                    ) : (
                      <div>
                        <span className="text-purple-700 font-medium">
                          You're <span className="text-purple-800 font-bold">${Math.max(0, 200 - cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0))}</span> away from free shipping!
                        </span>
                        <p className="text-sm text-purple-600 mt-0.5">
                          Add more items to unlock free shipping
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            {/* Recommended Products */}
            <RecommendedProducts products={recommendedProducts} />
          </div>

          {/* Order Summary - Sticky */}
          <div className="mt-8 lg:mt-0 lg:sticky lg:top-8 lg:h-fit">
            <OrderSummary items={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
} 
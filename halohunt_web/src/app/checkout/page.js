"use client";
import { useState, useEffect } from 'react';
import { CreditCard, Truck, Shield, Clock, MapPin, ChevronRight, Package, Wallet, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import react-confetti with no SSR
const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

// Sample data - in a real app this would come from your cart state
const cartItems = [
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
    price: 299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    quantity: 1
  }
];

// Sample addresses
const savedAddresses = [
  {
    id: 1,
    name: "Home",
    recipient: "John Doe",
    line1: "123 Main Street",
    line2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    phone: "+1 (555) 123-4567",
    isDefault: true
  },
  {
    id: 2,
    name: "Office",
    recipient: "John Doe",
    line1: "456 Business Ave",
    line2: "Floor 12",
    city: "New York",
    state: "NY",
    zip: "10002",
    phone: "+1 (555) 987-6543",
    isDefault: false
  }
];

const CartItem = ({ item }) => {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden relative ml-4">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-medium text-purple-600">₹{item.price}</span>
          <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
        </div>
      </div>
    </div>
  );
};

const AddressCard = ({ address, selected, onSelect }) => {
  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        selected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-200'
      }`}
      onClick={() => onSelect(address.id)}
    >
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900">{address.name}</h3>
            {address.isDefault && (
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-600">{address.recipient}</p>
          <p className="mt-1 text-sm text-gray-500">{address.line1}</p>
          {address.line2 && <p className="text-sm text-gray-500">{address.line2}</p>}
          <p className="text-sm text-gray-500">
            {address.city}, {address.state} {address.zip}
          </p>
          <p className="mt-1 text-sm text-gray-500">{address.phone}</p>
        </div>
        <div className="flex-shrink-0">
          <div className={`w-4 h-4 rounded-full border ${
            selected ? 'border-4 border-purple-500' : 'border-gray-300'
          }`} />
        </div>
      </div>
    </div>
  );
};

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('pay_now');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Update window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Handle order placement
  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setConfettiActive(true);
    
    // Stop confetti after 6 seconds
    setTimeout(() => {
      setConfettiActive(false);
    }, 6000);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const gst = subtotal * 0.18; // 18% GST
  const codCharges = paymentMethod === 'cod' ? 49 : 0;
  const payNowDiscount = paymentMethod === 'pay_now' ? -50 : 0;
  const total = subtotal + shipping + gst + codCharges + payNowDiscount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Order Success Overlay */}
      {orderPlaced && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center animate-bounce-in shadow-xl">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4 animate-success-pulse">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
            <p className="text-lg text-gray-700 mb-6">Your order has been placed successfully!</p>
            <p className="text-sm text-gray-500 mb-6">Order confirmation details have been sent to your email.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/profile" 
                className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                View My Orders
              </Link>
              <Link 
                href="/" 
                className="px-6 py-2 border border-purple-600 text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Confetti overlay when order is placed - positioned on top of everything */}
      {confettiActive && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={600}
            gravity={0.15}
            colors={['#9333ea', '#c084fc', '#f0abfc', '#ffd700', '#ff6b6b', '#4ade80']}
            tweenDuration={5000}
            initialVelocityY={15}
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-medium text-gray-900">Checkout</h1>
          <Link
            href="/cart"
            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
          >
            Back to Cart
          </Link>
        </div>
        
        <div className="relative lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Cart Items & Address */}
          <div className="lg:col-span-2 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pb-8 
                         scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent 
                         hover:scrollbar-thumb-purple-300 scrollbar-thumb-rounded-full 
                         [&::-webkit-scrollbar]:w-1.5">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-600" />
                  <h2 className="font-medium">Order Summary ({cartItems.length} items)</h2>
                </div>
                <span className="text-sm font-medium text-purple-600">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="p-6">
                <div className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-purple-600" />
                <h2 className="font-medium">Delivery Address</h2>
              </div>
              <div className="space-y-4">
                {savedAddresses.map(address => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    selected={selectedAddress === address.id}
                    onSelect={setSelectedAddress}
                  />
                ))}
                <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-purple-200 hover:text-purple-600 transition-colors">
                  + Add New Address
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Wallet className="w-5 h-5 text-purple-600" />
                <h2 className="font-medium">Payment Details</h2>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                {codCharges > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>COD Charges</span>
                    <span>+₹{codCharges.toFixed(2)}</span>
                  </div>
                )}
                {payNowDiscount < 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Pay Now Discount</span>
                    <span>₹{payNowDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mt-6 space-y-3">
                <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'pay_now' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="pay_now"
                      checked={paymentMethod === 'pay_now'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium">Pay Now</div>
                      <div className="text-sm text-green-600">Save ₹50 with online payment</div>
                    </div>
                  </div>
                </label>

                <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-orange-600">Additional ₹49 COD charges</div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Place Order Button */}
              <button 
                className="w-full mt-6 bg-purple-600 text-white py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
                onClick={handlePlaceOrder}
              >
                {paymentMethod === 'pay_now' ? 'Pay Now' : 'Place Order'}
              </button>

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
          </div>
        </div>
      </div>
    </div>
  );
} 
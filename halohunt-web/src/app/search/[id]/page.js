"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Star, Heart, Share2, ShoppingCart, ChevronLeft, 
  MessageCircle, User, ChevronRight, Minus, Plus, Check
} from 'lucide-react';

// Dummy product data
const DUMMY_PRODUCTS = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    discountPrice: 249.99,
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for all-day listening.",
    rating: 4.8,
    reviews: 1234,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&h=600&fit=crop&q=80"
    ],
    colors: ["Black", "White", "Blue"],
    seller: {
      id: "creator-1",
      name: "Tech World",
      username: "@techworld",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&auto=format",
      rating: 4.9,
      sales: 5678,
      verified: true
    },
    category: "Electronics",
    features: [
      "Active Noise Cancellation",
      "30-hour Battery Life",
      "Bluetooth 5.2",
      "Voice Assistant Support",
      "Touch Controls"
    ],
    specifications: {
      "Brand": "SoundMaster",
      "Model": "WH-1000XM5",
      "Driver Size": "40mm",
      "Frequency Response": "4Hz-40,000Hz",
      "Weight": "250g"
    },
    stock: 45,
    relatedProducts: [2, 5, 7, 8]
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 399.99,
    discountPrice: null,
    description: "Stay connected and track your fitness with our latest smartwatch. Features include heart rate monitoring, GPS, water resistance, and a beautiful always-on display.",
    rating: 4.9,
    reviews: 856,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop&q=80"
    ],
    colors: ["Silver", "Black", "Gold"],
    seller: {
      id: "creator-2",
      name: "Smart Gear",
      username: "@smartgear",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format",
      rating: 4.7,
      sales: 3421,
      verified: true
    },
    category: "Electronics",
    features: [
      "Heart Rate Monitoring",
      "GPS Tracking",
      "Water Resistant (50m)",
      "Always-on Display",
      "5-day Battery Life"
    ],
    specifications: {
      "Brand": "TechFit",
      "Model": "Watch Pro 5",
      "Display": "1.4 inch AMOLED",
      "Battery": "420mAh",
      "Weight": "45g"
    },
    stock: 32,
    relatedProducts: [1, 5, 7]
  }
];

// Related products
const RELATED_PRODUCTS = [
  {
    id: "5",
    name: "4K Ultra HD Camera",
    price: 899.99,
    discountPrice: 799.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop&q=80",
    rating: 4.9,
    reviews: 432
  },
  {
    id: "7",
    name: "Wireless Gaming Mouse",
    price: 79.99,
    discountPrice: null,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&q=80",
    rating: 4.7,
    reviews: 345
  },
  {
    id: "8",
    name: "Mechanical Keyboard",
    price: 149.99,
    discountPrice: 129.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop&q=80",
    rating: 4.8,
    reviews: 567
  }
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // In a real app, you would fetch the product data based on the ID
  useEffect(() => {
    // Simulate API call
    const foundProduct = DUMMY_PRODUCTS.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]);
      
      // Get related products
      const related = RELATED_PRODUCTS.filter(p => 
        foundProduct.relatedProducts.includes(parseInt(p.id))
      );
      setRelatedProducts(related);
    }
  }, [id]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-purple-600">Loading product...</div>
      </div>
    );
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // In a real app, this would add the product to the cart
    console.log('Added to cart:', {
      productId: product.id,
      quantity,
      color: selectedColor
    });
    router.push('/cart');
  };

  const handleBuyNow = () => {
    // In a real app, this would add the product to the cart and redirect to checkout
    console.log('Buy now:', {
      productId: product.id,
      quantity,
      color: selectedColor
    });
    router.push('/checkout');
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Back button */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>Back to search</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-purple-600' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6 md:border-l border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                {product.discountPrice ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-purple-600">${product.discountPrice}</span>
                    <span className="text-lg text-gray-500 line-through">${product.price}</span>
                    <span className="text-sm font-medium text-green-600">
                      {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                )}
                <p className="text-sm text-gray-500 mt-1">In stock: {product.stock} units</p>
              </div>
              
              {/* Seller */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <Link href={`/profile/${product.seller.id}`} className="flex items-center gap-3 group">
                  <img 
                    src={product.seller.avatar} 
                    alt={product.seller.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                        {product.seller.name}
                      </h3>
                      {product.seller.verified && (
                        <Check className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{product.seller.username}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="flex items-center justify-end gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-gray-700">{product.seller.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{product.seller.sales.toLocaleString()} sales</p>
                  </div>
                </Link>
              </div>
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-full text-sm ${
                          selectedColor === color 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        } transition-colors`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className={`w-10 h-10 flex items-center justify-center rounded-l-lg border border-gray-300 ${
                      quantity <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className={`w-10 h-10 flex items-center justify-center rounded-r-lg border border-gray-300 ${
                      quantity >= product.stock ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-600 font-medium py-3 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg border ${
                    isWishlisted 
                      ? 'border-purple-600 bg-purple-50 text-purple-600' 
                      : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-purple-600' : ''}`} />
                </button>
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Product Info Tabs */}
          <div className="border-t border-gray-200 mt-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'description' 
                    ? 'border-b-2 border-purple-600 text-purple-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'specifications' 
                    ? 'border-b-2 border-purple-600 text-purple-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'reviews' 
                    ? 'border-b-2 border-purple-600 text-purple-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Reviews
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  
                  <h3 className="font-medium text-gray-900 mt-6 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div className="divide-y divide-gray-200">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div key={index} className="flex py-3">
                      <span className="w-1/3 text-gray-500">{key}</span>
                      <span className="w-2/3 text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">Reviews coming soon!</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <Link key={product.id} href={`/search/${product.id}`}>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-square relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
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
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                          {product.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
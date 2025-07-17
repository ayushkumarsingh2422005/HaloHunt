"use client";
import React, { useState, useEffect } from 'react';
import {
  Search, Star, X, ChevronDown, ChevronUp, Sliders, Check, Bell, Eye
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  // Remove the complex scrollbarHideStyle object

  const [searchInput, setSearchInput] = useState(query || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Add refs for scrolling the swipable sections
  const mobileScrollRef = React.useRef(null);

  // Track current slide for pagination dots
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // Update window width on client side
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    if (windowWidth >= 1024) return 4; // Desktop
    if (windowWidth >= 768) return 3;  // Tablet
    return 2; // Mobile
  };

  // Function to scroll the swipable content
  const scrollContent = (ref, direction) => {
    if (ref.current) {
      const itemsPerView = getItemsPerView();
      const newSlide = direction === 'right'
        ? Math.min(currentSlide + 1, Math.ceil(liveStreams.length / itemsPerView) - 1)
        : Math.max(currentSlide - 1, 0);

      setCurrentSlide(newSlide);

      const scrollAmount = ref.current.clientWidth * 0.9;
      const newScrollPosition = ref.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);

      ref.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Update current slide on scroll
  const handleScroll = () => {
    if (mobileScrollRef.current) {
      const scrollPosition = mobileScrollRef.current.scrollLeft;
      const viewWidth = mobileScrollRef.current.clientWidth;
      const newSlide = Math.round(scrollPosition / viewWidth);
      setCurrentSlide(newSlide);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const scrollRef = mobileScrollRef.current;
    if (scrollRef) {
      scrollRef.addEventListener('scroll', handleScroll);
      return () => scrollRef.removeEventListener('scroll', handleScroll);
    }
  }, [mobileScrollRef.current]);

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    rating: null,
    sortBy: 'popular'
  });

  // Update search input when query changes
  useEffect(() => {
    setSearchInput(query || '');
  }, [query]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      router.push('/search');
    }
  };

  // Mock categories
  const categories = [
    { id: 'fashion', name: 'Fashion', count: 1234 },
    { id: 'electronics', name: 'Electronics', count: 856 },
    { id: 'home', name: 'Home & Living', count: 643 },
    { id: 'beauty', name: 'Beauty', count: 432 },
    { id: 'sports', name: 'Sports', count: 321 },
    { id: 'toys', name: 'Toys', count: 234 },
  ];

  // Mock live streams
  const liveStreams = [
    {
      id: 1,
      title: "Summer Fashion Collection Showcase",
      host: {
        name: "Fashion Forward",
        image: "https://i.pravatar.cc/150?img=32"
      },
      thumbnail: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop",
      viewers: 1245,
      isLive: true,
      taggedProducts: [
        { id: "prod-1-1", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&crop=center" },
        { id: "prod-1-2", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=80&h=80&fit=crop&crop=center" }
      ]
    },
    {
      id: 2,
      title: "Tech Gadgets Review & Deals",
      host: {
        name: "Tech World",
        image: "https://i.pravatar.cc/150?img=45"
      },
      thumbnail: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=400&h=300&fit=crop",
      viewers: 856,
      isLive: true,
      taggedProducts: [
        { id: "prod-2-1", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&crop=center" },
        { id: "prod-2-2", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop&crop=center" },
        { id: "prod-2-3", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=80&h=80&fit=crop&crop=center" }
      ]
    },
    {
      id: 3,
      title: "Cooking Masterclass: Summer Recipes",
      host: {
        name: "Chef Julia",
        image: "https://i.pravatar.cc/150?img=20"
      },
      thumbnail: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop",
      viewers: 734,
      isLive: true,
      taggedProducts: [
        { id: "prod-3-1", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=80&h=80&fit=crop&crop=center" }
      ]
    },
    {
      id: 4,
      title: "Home Decor Ideas for Small Spaces",
      host: {
        name: "Interior Dreams",
        image: "https://i.pravatar.cc/150?img=28"
      },
      thumbnail: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=300&fit=crop",
      viewers: 512,
      isLive: true,
      taggedProducts: [
        { id: "prod-4-1", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&crop=center" },
        { id: "prod-4-2", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=80&h=80&fit=crop&crop=center" }
      ]
    }
  ];

  // Mock products with proper images and data
  const products = [
    {
      id: 1,
      name: "Premium Watch",
      price: "$299.99",
      seller: "John Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center",
      liveTaggable: true,
      tagger: {
        name: "Emma Wilson",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&auto=format"
      }
    },
    {
      id: 2,
      name: "Premium Watch",
      price: "$299.99",
      seller: "John Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
      liveTaggable: true,
      tagger: {
        name: "Alex Chen",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format"
      }
    },
    {
      id: 3,
      name: "Premium Watch",
      price: "$299.99",
      seller: "John Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&crop=center",
      liveTaggable: true,
      tagger: {
        name: "Sarah Kim",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces&auto=format"
      }
    },
    {
      id: 4,
      name: "Premium Watch",
      price: "$299.99",
      seller: "John Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      liveTaggable: true,
      tagger: {
        name: "Mike Johnson",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&auto=format"
      }
    }
  ];

  const toggleFilter = (type, value) => {
    setSelectedFilters(prev => {
      if (type === 'categories') {
        const newCategories = prev.categories.includes(value)
          ? prev.categories.filter(cat => cat !== value)
          : [...prev.categories, value];
        return { ...prev, categories: newCategories };
      }
      if (type === 'rating') {
        return { ...prev, rating: prev.rating === value ? null : value };
      }
      if (type === 'sortBy') {
        return { ...prev, sortBy: value };
      }
      return prev;
    });
  };

  const FilterSection = ({ title, children, isOpen = true }) => {
    const [sectionOpen, setSectionOpen] = useState(isOpen);

    return (
      <div className="border-b border-gray-200 py-4">
        <button
          onClick={() => setSectionOpen(!sectionOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          {sectionOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {sectionOpen && (
          <div className="mt-4 space-y-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  // Live stream card component
  const LiveStreamCard = ({ stream }) => {
    const handleProductClick = (e, productId) => {
      e.stopPropagation();
      e.preventDefault();
      router.push(`/search/${productId}`);
    };

    return (
      <Link href={`/live/view/${stream.id}`} className="block h-full">
        <div className="relative bg-white rounded-lg overflow-hidden shadow h-full">
          <div className="w-full relative">
            {/* Using a container with padding-top to maintain 16:9 aspect ratio */}
            <div className="w-full relative pb-[56.25%]">
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Live badge */}
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
              LIVE
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{stream.viewers.toLocaleString()}</span>
            </div>
            
            {/* Host avatar */}
            <div className="absolute bottom-2 left-2 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-white shadow">
                <img
                  src={stream.host.image}
                  alt={stream.host.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="p-3">
            <h3 className="text-sm font-medium truncate">{stream.title}</h3>
            <p className="text-xs text-gray-500">by {stream.host.name}</p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-purple-500"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            {/* <button
              type="submit"
              className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button> */}
            <Link href="/notifications" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Sliders className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Filters</span>
              {selectedFilters.categories.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-purple-600 text-white rounded-full">
                  {selectedFilters.categories.length}
                </span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Add the CSS for hide-scrollbar directly in a style tag */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;             /* Chrome, Safari and Opera */
        }
        
        /* Responsive grid styles */
        @media (min-width: 768px) {
          .live-card-container {
            width: calc(33.333% - 16px) !important;
            max-width: none !important;
          }
        }
        
        @media (min-width: 1024px) {
          .live-card-container {
            width: calc(25% - 16px) !important;
            max-width: none !important;
          }
        }

        /* We're now using padding-bottom technique for consistent 16:9 aspect ratio
           instead of the aspect-ratio property for better cross-browser support */
        .pb-[56.25%] {
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-8">
          {/* Live Streams Section - Show only if no query parameter */}
          {!query && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Live Now</h2>
                <Link href="/live" className="text-purple-600 text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              <div className="relative">
                {/* Single row swipable layout with one card at a time on mobile */}
                <div
                  className="flex overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
                  ref={mobileScrollRef}
                  onScroll={handleScroll}
                >
                  {/* All cards in a single container with responsive visibility */}
                  {liveStreams.map((stream) => (
                    <div
                      key={stream.id}
                      className="flex-shrink-0 snap-start mr-4 live-card-container"
                      style={{
                        width: windowWidth < 768 ? 'calc(100% - 16px)' : 'calc(50% - 16px)',
                        maxWidth: windowWidth < 768 ? 'none' : '320px',
                        height: '100%'
                      }}
                    >
                      <LiveStreamCard stream={stream} />
                    </div>
                  ))}
                </div>

                {/* Navigation buttons */}
                {/* <div className="flex justify-between mt-2">
                  <button
                    onClick={() => scrollContent(mobileScrollRef, 'left')}
                    className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
                    disabled={currentSlide === 0}
                  >
                    <ChevronLeft className={`w-5 h-5 ${currentSlide === 0 ? 'text-gray-300' : 'text-gray-600'}`} />
                  </button>
                  <button
                    onClick={() => scrollContent(mobileScrollRef, 'right')}
                    className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
                    disabled={currentSlide >= Math.ceil(liveStreams.length / getItemsPerView()) - 1}
                  >
                    <ChevronRight className={`w-5 h-5 ${currentSlide >= Math.ceil(liveStreams.length / getItemsPerView()) - 1
                        ? 'text-gray-300'
                        : 'text-gray-600'
                      }`} />
                  </button>
                </div> */}

                {/* Pagination dots */}
                <div className="flex justify-center mt-2">
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.ceil(liveStreams.length / getItemsPerView()) }).map((_, i) => (
                      <div
                        key={`dot-${i}`}
                        className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${i === currentSlide ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                        onClick={() => {
                          if (mobileScrollRef.current) {
                            const viewWidth = mobileScrollRef.current.clientWidth;
                            mobileScrollRef.current.scrollTo({
                              left: i * viewWidth,
                              behavior: 'smooth'
                            });
                            setCurrentSlide(i);
                          }
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Products</h2>
              {query && (
                <p className="text-gray-500">Showing results for "{query}"</p>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {products.map((product) => (
                <Link key={product.id} href={`/search/${product.id}`} className="block">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                    <div className="relative">
                      <div className="w-full relative pb-[56.25%]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      {product.liveTaggable && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-2">
                          <img
                            src={product.tagger.image}
                            alt={product.tagger.name}
                            className="w-6 h-6 rounded-full border-2 border-white"
                          />
                          <span className="text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded-full">
                            {product.tagger.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-sm font-medium text-purple-600">{product.price}</span>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          {product.rating}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = '/cart';
                        }}
                        className="mt-2 w-full bg-purple-100 text-purple-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Drawer - Now for both mobile and desktop */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white transform transition-transform duration-300 ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Active filters summary */}
              {selectedFilters.categories.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedFilters.categories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleFilter('categories', category)}
                      className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                    >
                      {categories.find(c => c.id === category)?.name}
                      <X className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <FilterSection title="Categories">
                {categories.map(category => (
                  <label key={category.id} className="flex items-center gap-2 cursor-pointer py-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters.categories.includes(category.id)}
                      onChange={() => toggleFilter('categories', category.id)}
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-600">{category.name}</span>
                    <span className="text-xs text-gray-400 ml-auto">{category.count}</span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Price Range">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-1.5 rounded border border-gray-200 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-1.5 rounded border border-gray-200 text-sm"
                    />
                  </div>
                  <input
                    type="range"
                    className="w-full"
                    min="0"
                    max="1000"
                    step="10"
                  />
                </div>
              </FilterSection>

              <FilterSection title="Rating">
                {[5, 4, 3, 2, 1].map(rating => (
                  <button
                    key={rating}
                    onClick={() => toggleFilter('rating', rating)}
                    className={`flex items-center gap-2 w-full px-2 py-1.5 rounded ${selectedFilters.rating === rating ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      {Array.from({ length: 5 - rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-gray-300"
                        />
                      ))}
                    </div>
                    <span className="text-sm">{rating}+ Stars</span>
                  </button>
                ))}
              </FilterSection>

              <FilterSection title="Sort By">
                {[
                  { id: 'popular', label: 'Most Popular' },
                  { id: 'newest', label: 'Newest First' },
                  { id: 'price_low', label: 'Price: Low to High' },
                  { id: 'price_high', label: 'Price: High to Low' },
                ].map(sort => (
                  <button
                    key={sort.id}
                    onClick={() => toggleFilter('sortBy', sort.id)}
                    className={`flex items-center justify-between w-full px-2 py-1.5 rounded text-sm ${selectedFilters.sortBy === sort.id ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                      }`}
                  >
                    {sort.label}
                    {selectedFilters.sortBy === sort.id && (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </FilterSection>
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedFilters({
                      categories: [],
                      priceRange: [0, 1000],
                      rating: null,
                      sortBy: 'popular'
                    });
                  }}
                  className="flex-1 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage; 
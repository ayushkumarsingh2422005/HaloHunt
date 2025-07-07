"use client";
import { Search, Home, Bell, ShoppingCart, User, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = ({ className }) => {
  const pathname = usePathname();

  return (
    <nav className={`${className} bg-white`}>
      <div className="flex md:flex-col items-center justify-between md:justify-start md:gap-8 p-4">
        <Link href="/" className={`flex flex-col items-center gap-1 ${pathname === '/' ? 'text-purple-700' : 'text-gray-500 hover:text-purple-700'}`}>
          <Home className="w-6 h-6" />
          <span className="text-xs md:text-sm">Home</span>
        </Link>
        <Link href="/live" className={`flex flex-col items-center gap-1 ${pathname === '/live' ? 'text-purple-700' : 'text-gray-500 hover:text-purple-700'}`}>
          <Bell className="w-6 h-6" />
          <span className="text-xs md:text-sm">Live</span>
        </Link>
        <Link href="/search" className={`flex flex-col items-center gap-1 ${pathname === '/search' ? 'text-purple-700' : 'text-gray-500 hover:text-purple-700'}`}>
          <Search className="w-6 h-6" />
          <span className="text-xs md:text-sm">Search</span>
        </Link>
        <Link href="/cart" className={`flex flex-col items-center gap-1 ${pathname === '/cart' ? 'text-purple-700' : 'text-gray-500 hover:text-purple-700'}`}>
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs md:text-sm">Cart</span>
        </Link>
        <Link href="/profile" className={`flex flex-col items-center gap-1 ${pathname === '/profile' ? 'text-purple-700' : 'text-gray-500 hover:text-purple-700'}`}>
          <User className="w-6 h-6" />
          <span className="text-xs md:text-sm">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by filter"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-purple-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default function ClientLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Desktop Navigation */}
      <Navigation className="hidden md:block w-24 fixed left-0 top-0 h-full border-r border-gray-200" />

      {/* Main Content */}
      <main className="flex-1 md:ml-24 pb-20 md:pb-0">
        {/* <Header /> */}
        {children}
        {/* Mobile Navigation */}
        <Navigation className="fixed bottom-0 left-0 right-0 md:hidden border-t border-gray-200 bg-white" />
      </main>
    </div>
  );
} 
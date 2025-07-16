"use client";
import { Search, Home, Bell, ShoppingCart, User, Menu, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

const Navigation = ({ className }) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  return (
    <nav className={`${className} bg-white`}>
      <div className="flex md:flex-col items-center justify-between md:justify-start md:gap-8 p-4">
        {/* Logo - only visible on desktop */}
        <div className="hidden md:flex justify-center mb-4 w-full">
          <Image 
            src="/logo/h_purple.png" 
            alt="HaloHunt Logo" 
            width={50} 
            height={50}
          />
        </div>
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
        {isAuthenticated ? (
          <Link href="/profile" className={`flex flex-col items-center gap-1 ${pathname === '/profile' ? 'text-purple-700' : 'text-gray-500 hover:text-purple-700'}`}>
            <User className="w-6 h-6" />
            <span className="text-xs md:text-sm">Profile</span>
          </Link>
        ) : (
          <Link href="/login" className={`flex flex-col items-center gap-1 ${pathname === '/login' ? 'text-purple-700' : 'text-gray-500 hover:text-purple-700'}`}>
            <LogIn className="w-6 h-6" />
            <span className="text-xs md:text-sm">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};


export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const { loading } = useAuth();
  
  // Check if current page is an auth page
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password' || pathname.startsWith('/reset-password') || pathname === '/cart' || pathname === '/checkout';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-purple-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Desktop Navigation - hide on auth pages */}
      {!isAuthPage && (
        <Navigation 
          className="hidden md:block w-24 fixed left-0 top-0 h-full border-r border-gray-200" 
        />
      )}

      {/* Main Content */}
      <main className={`flex-1 ${!isAuthPage ? 'md:ml-24' : ''} ${!isAuthPage ? 'pb-20 md:pb-0' : ''}`}>
        {/* <Header /> */}
        {children}
        {/* Mobile Navigation - hide on auth pages */}
        {!isAuthPage && (
          <Navigation 
            className="fixed bottom-0 left-0 right-0 md:hidden border-t border-gray-200 bg-white" 
          />
        )}
      </main>
    </div>
  );
} 
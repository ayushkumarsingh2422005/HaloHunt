"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md py-4 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                HaloHunt
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Features', 'How It Works', 'About', 'Contact'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          
          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
              Join Waitlist
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {['Features', 'How It Works', 'About', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-base font-medium text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {item}
                </a>
              ))}
              <button className="mt-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
                Join Waitlist
              </button>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
} 
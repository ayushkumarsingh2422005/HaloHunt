"use client"

import { FaAppStore, FaGooglePlay } from 'react-icons/fa';
import { BsGlobe } from 'react-icons/bs';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-20 sm:py-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 blur-3xl" />
        <div className="absolute top-1/2 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-200/40 blur-3xl" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 inline-block rounded-full bg-purple-100 px-4 py-1.5"
            >
              <span className="text-purple-700 text-sm font-medium">
                Coming Soon
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span className="block">Go Live.</span>
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Sell Products.
              </span>
              <span className="block">Instantly.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-8 text-lg text-gray-600 sm:text-xl"
            >
              HaloHunt lets you showcase products in real-time, tag them instantly, 
              and sell to your audience with just a few taps.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-80 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="mt-3 sm:mt-0 sm:absolute sm:right-1 sm:top-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                  Notify Me
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6"
            >
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <FaAppStore className="h-5 w-5" />
                <span>App Store</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <FaGooglePlay className="h-5 w-5" />
                <span>Google Play</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <BsGlobe className="h-5 w-5" />
                <span>Web App</span>
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[450px]">
              <div className="relative pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-purple-700 rounded-2xl">
                  <div className="absolute inset-[2px] bg-white rounded-2xl overflow-hidden">
                    {/* Placeholder for app screenshot/mockup */}
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-700 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">H</span>
                        </div>
                        <p className="text-gray-500">App Preview</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-xl bg-purple-100 p-2 shadow-lg transform rotate-6">
                <div className="h-full w-full rounded-lg bg-white p-2 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-8 w-8 mx-auto mb-1 rounded-full bg-purple-700 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">🛍️</span>
                    </div>
                    <p className="text-xs font-medium text-gray-600">Tagged</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-6 -bottom-6 h-24 w-24 rounded-xl bg-pink-100 p-2 shadow-lg transform -rotate-6">
                <div className="h-full w-full rounded-lg bg-white p-2 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-8 w-8 mx-auto mb-1 rounded-full bg-pink-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">💰</span>
                    </div>
                    <p className="text-xs font-medium text-gray-600">Sold</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
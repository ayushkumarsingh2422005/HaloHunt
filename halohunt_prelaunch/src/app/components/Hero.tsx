"use client"

import { FaPlay, FaHeart, FaShoppingCart, FaUsers, FaStar, FaBell, FaSearch } from 'react-icons/fa';
import { BsGlobe, BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="home" className="relative overflow-hidden bg-white min-h-screen">
      {/* Subtle background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-50 blur-3xl animate-float" />
        <div className="absolute top-40 right-20 h-96 w-96 rounded-full bg-pink-50 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-blue-50 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-20 pb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200 px-4 py-2"
            >
              <div className="w-2 h-2 bg-halo-purple rounded-full animate-pulse-live" />
              <span className="text-halo-purple-dark text-sm font-medium">
                Coming Soon - Join the Waitlist
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-6xl"
            >
              <span className="block">Shop, Sell, and Connect</span>
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                LIVE with HaloHunt
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-8 text-xl text-gray-600 sm:text-2xl leading-relaxed"
            >
              HaloHunt is transforming online shopping into a live show for everyone! Buyers can watch, engage, and buy as sellers showcase products in real time. Instantly connect, discover, and grow-on India’s most innovative live commerce platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <button
                onClick={() => {
                  const element = document.getElementById('newsletter');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-4 bg-halo-purple hover:bg-halo-purple-dark text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                <span className="flex items-center gap-2">
                  Join Waitlist
                  <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('newsletter');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-8 py-4 bg-white border-2 border-halo-purple text-halo-purple font-semibold rounded-full hover:bg-purple-50 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <FaPlay className="group-hover:scale-110 transition-transform" />
                  Watch Demo
                </span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 text-gray-500"
            >
              <div className="flex items-center gap-2">
                <FaUsers className="h-5 w-5 text-halo-purple" />
                <span>50K+ Early Adopters</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="h-5 w-5 text-yellow-500" />
                <span>Launch Q1 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <FaHeart className="h-5 w-5 text-red-500" />
                <span>Free Beta Access</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Platform Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[500px]">
              {/* Platform Interface Mockup */}
              <div className="relative pb-[75%] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                <div className="absolute inset-0 bg-white">
                  {/* Header */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-halo-purple flex items-center justify-center">
                        <span className="text-white font-bold text-sm">H</span>
                      </div>
                      <span className="text-gray-900 font-bold text-lg">HaloHunt</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <FaBell className="text-gray-600 text-lg" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-halo-purple rounded-full text-xs text-white flex items-center justify-center">
                          3
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="absolute top-20 left-4 right-4">
                    <div className="relative">
                      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products, brands, or live streams..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-halo-purple focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Product Category Cards */}
                  <div className="absolute top-32 left-4 right-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Featured Categories</h3>
                      <span className="text-halo-purple text-sm font-medium">View All &gt;</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { title: "Smart Watches", discount: "40% OFF", price: "From ₹1,999", bg: "bg-blue-100", image: "⌚" },
                        { title: "Premium Headphones", discount: "35% OFF", price: "From ₹2,499", bg: "bg-purple-100", image: "🎧" },
                        { title: "Fitness Trackers", discount: "50% OFF", price: "From ₹1,299", bg: "bg-green-100", image: "📱" }
                      ].map((category, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                          className={`relative ${category.bg} border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                <span className="text-2xl">{category.image}</span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">{category.title}</h4>
                                <p className="text-sm text-gray-600">{category.price}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="bg-halo-purple text-white text-xs px-2 py-1 rounded-full font-medium mb-1">
                                {category.discount}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="absolute -right-6 -top-6 h-24 w-24 rounded-xl bg-purple-50 border border-purple-200 p-2 shadow-lg"
              >
                <div className="h-full w-full rounded-lg bg-white p-2 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-8 w-8 mx-auto mb-1 rounded-full bg-halo-purple flex items-center justify-center">
                      <span className="text-white text-xs font-bold">🎯</span>
                    </div>
                    <p className="text-xs font-medium text-gray-600">Tagged</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="absolute -left-6 -bottom-6 h-24 w-24 rounded-xl bg-pink-50 border border-pink-200 p-2 shadow-lg"
              >
                <div className="h-full w-full rounded-lg bg-white p-2 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-8 w-8 mx-auto mb-1 rounded-full bg-halo-purple flex items-center justify-center">
                      <span className="text-white text-xs font-bold">💰</span>
                    </div>
                    <p className="text-xs font-medium text-gray-600">Sold</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
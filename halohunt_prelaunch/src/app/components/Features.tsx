"use client"

import { FaVideo, FaTag, FaComments, FaShoppingCart, FaHeart, FaUsers, FaChartLine, FaMobile } from 'react-icons/fa';
import { BsLightning, BsGlobe } from 'react-icons/bs';
import { motion } from 'framer-motion';

const features = [
  {
    icon: FaVideo,
    title: "Live Streaming",
    description: "Go live instantly with high-quality video streaming. Showcase your products in real-time to engage your audience.",
    gradient: "from-halo-purple to-halo-purple-dark",
    delay: 0.1
  },
  {
    icon: FaTag,
    title: "Instant Product Tagging",
    description: "Tag products during your live stream with a single tap. Viewers can see product details and prices instantly.",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.2
  },
  {
    icon: FaComments,
    title: "Real-time Chat",
    description: "Interactive chat system where viewers can ask questions, request product details, and engage with the seller.",
    gradient: "from-green-500 to-emerald-500",
    delay: 0.3
  },
  {
    icon: FaShoppingCart,
    title: "One-Click Purchase",
    description: "Seamless checkout process. Viewers can buy products directly from the live stream with just one click.",
    gradient: "from-orange-500 to-red-500",
    delay: 0.4
  },
  {
    icon: FaHeart,
    title: "Live Reactions",
    description: "Viewers can react with hearts, likes, and emojis in real-time, creating an engaging shopping experience.",
    gradient: "from-pink-500 to-rose-500",
    delay: 0.5
  },
  {
    icon: FaUsers,
    title: "Multi-Viewer Support",
    description: "Support thousands of concurrent viewers with smooth streaming and real-time interactions.",
    gradient: "from-indigo-500 to-purple-500",
    delay: 0.6
  },
  {
    icon: FaChartLine,
    title: "Analytics Dashboard",
    description: "Track your live stream performance, sales metrics, and viewer engagement in real-time.",
    gradient: "from-teal-500 to-blue-500",
    delay: 0.7
  },
  {
    icon: FaMobile,
    title: "Cross-Platform",
    description: "Stream and shop from any device - mobile, tablet, or desktop. Available on iOS, Android, and web.",
    gradient: "from-violet-500 to-purple-500",
    delay: 0.8
  }
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-purple-100 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-pink-100 blur-3xl" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200 px-4 py-2"
          >
            <BsLightning className="text-halo-purple text-lg" />
            <span className="text-halo-purple-dark text-sm font-medium">
              Revolutionary Features
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl"
          >
            Everything You Need for
            <span className="block bg-gradient-to-r from-halo-purple to-halo-purple-dark bg-clip-text text-transparent">
              Live Commerce Success
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            From going live to closing sales, HaloHunt provides all the tools you need 
            to create engaging live shopping experiences that convert.
          </motion.p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative h-full p-6 rounded-2xl bg-white border border-gray-200 hover:border-halo-purple transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col items-center text-center h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <feature.icon className="text-white text-2xl" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-halo-purple transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-halo-purple/5 to-halo-purple-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "50K+", label: "Early Adopters", icon: FaUsers },
            { number: "1M+", label: "Expected Users", icon: FaShoppingCart },
            { number: "2.5M+", label: "Live Hours", icon: FaVideo },
            { number: "Q1 2024", label: "Launch Date", icon: FaHeart }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center border border-purple-200">
                <stat.icon className="text-halo-purple text-2xl" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 
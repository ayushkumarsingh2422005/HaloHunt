"use client"

import { FaComments, FaShoppingCart, FaHeart, FaUsers, FaVideo } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    icon: FaVideo,
    title: "See Before You Buy",
    description: "Watch real people demo the product LIVE—no more surprises or Photoshop!",
    gradient: "from-purple-500 to-purple-400",
    delay: 0.1
  },
  {
    icon: FaComments,
    title: "Get Answers Instantly",
    description: "Ask anything in real time—size, color, quality, return policy—and get honest answers on the spot.",
    gradient: "from-green-500 to-emerald-500",
    delay: 0.3
  },
  {
    icon: FaUsers,
    title: "Buy Together, Share Experience",
    description: "Shop live with friends or family, vote on favorites, and enjoy a social shopping experience.",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.5
  },
  {
    icon: FaShoppingCart,
    title: "No-Hassle Returns",
    description: "Clear product understanding means fewer returns, but if you need it, our process is simple and quick.",
    gradient: "from-orange-500 to-red-500",
    delay: 0.7
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

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {[
            { number: "50K+", label: "Early Adopters", icon: FaVideo },
            { number: "1M+", label: "Expected Users", icon: FaUsers },
            { number: "5M+", label: "Expected Sales", icon: FaShoppingCart },
            { number: "2025", label: "Launch Year", icon: FaHeart }
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <motion.div
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
          </motion.div> */}
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl"
          >
            Why Halohunt ?
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
              {...(feature.title === 'Live Streaming' ? { id: 'demo-preview' } : {})}
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
      </div>
    </section>
  );
} 
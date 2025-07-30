"use client"

import { motion } from 'framer-motion';

export default function Newsletter() {
  return (
    <section className="py-20 sm:py-32 bg-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Be the First to Know
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-lg text-gray-600"
          >
            Join our waitlist to get early access and exclusive updates about HaloHunt's launch.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <div className="relative w-full max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="mt-3 sm:mt-0 sm:absolute sm:right-1 sm:top-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                Join Waitlist
              </button>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-4 text-sm text-gray-500"
          >
            We respect your privacy. No spam, just updates about our launch and early access.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex justify-center space-x-8 sm:space-x-16"
        >
          {['Early Access', 'Exclusive Updates', 'Launch Discounts'].map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="h-6 w-6 text-purple-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-900">{item}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 
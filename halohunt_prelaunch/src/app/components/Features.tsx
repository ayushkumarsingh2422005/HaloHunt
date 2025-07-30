"use client"

import { motion } from 'framer-motion';
import { FaTag, FaVideo, FaShoppingBag } from 'react-icons/fa';

const features = [
  {
    icon: <FaVideo className="h-6 w-6" />,
    title: 'Live Streaming',
    description: 'Go live instantly and connect with your audience in real-time. Our platform ensures high-quality, low-latency streaming.',
    color: 'from-purple-600 to-indigo-600',
    delay: 0.2,
  },
  {
    icon: <FaTag className="h-6 w-6" />,
    title: 'Product Tagging',
    description: 'Tag products during your livestream with just a few taps. Make your products discoverable and purchasable in seconds.',
    color: 'from-pink-600 to-rose-600',
    delay: 0.4,
  },
  {
    icon: <FaShoppingBag className="h-6 w-6" />,
    title: 'Instant Checkout',
    description: 'Viewers can purchase tagged products without leaving the stream, creating a seamless shopping experience.',
    color: 'from-blue-600 to-cyan-600',
    delay: 0.6,
  },
];

export default function Features() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            How HaloHunt Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-600"
          >
            Our platform makes selling through livestreams simple, interactive, and effective.
          </motion.p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.6 }}
              className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} text-white`}>
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-6 py-3">
            <span className="text-gray-700">
              Available soon on <span className="font-semibold">Web</span>, <span className="font-semibold">iOS</span>, and <span className="font-semibold">Android</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
"use client"

import { FaVideo, FaTag, FaShoppingCart, FaUsers, FaChartLine, FaPlay, FaHeart, FaBolt, FaRegEye, FaComments } from 'react-icons/fa';
import { BsArrowRight, BsGlobe } from 'react-icons/bs';
import { motion } from 'framer-motion';

const steps = [
  {
    step: "01",
    title: "Go Live",
    description: "Start your live stream with one click. Our platform ensures high-quality, low-latency streaming to engage your audience.",
    icon: FaVideo,
    gradient: "from-purple-500 to-pink-500",
    features: ["HD Video Quality", "Low Latency", "Multi-Platform Support"]
  },
  {
    step: "02",
    title: "Tag Products",
    description: "Tag products during your stream with instant product recognition. Viewers see prices and details in real-time.",
    icon: FaTag,
    gradient: "from-blue-500 to-cyan-500",
    features: ["Instant Recognition", "Price Display", "Inventory Sync"]
  },
  {
    step: "03",
    title: "Engage Audience",
    description: "Interact with viewers through live chat, reactions, and Q&A. Build relationships and trust in real-time.",
    icon: FaUsers,
    gradient: "from-green-500 to-emerald-500",
    features: ["Live Chat", "Reactions", "Q&A Sessions"]
  },
  {
    step: "04",
    title: "Close Sales",
    description: "Convert viewers to customers with seamless one-click purchasing. Track sales and performance in real-time.",
    icon: FaShoppingCart,
    gradient: "from-orange-500 to-red-500",
    features: ["One-Click Buy", "Secure Payment", "Instant Confirmation"]
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative pt-10 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-50 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-pink-50 blur-3xl" />
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
            <FaPlay className="text-purple-600 text-lg" />
            <span className="text-purple-700 text-sm font-medium">
              Simple 4-Step Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl"
          >
            From Live Stream to
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Successful Sales
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our streamlined process makes live commerce effortless.
            Go from concept to conversion in minutes, not hours.
          </motion.p>
        </motion.div>

        {/* Steps Section - 2x2 Grid, themed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto mb-20">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-8 bg-white border border-purple-100 rounded-2xl shadow-lg">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 mb-4 shadow">
              <FaBolt className="text-white text-3xl" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Start Instantly</h3>
            <p className="text-gray-600 text-base">Launch your live show in seconds—no tech stress, just one tap and you’re on-air</p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-8 bg-white border border-blue-100 rounded-2xl shadow-lg">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-4 shadow">
              <FaRegEye className="text-white text-3xl" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Showcase Authenticity</h3>
            <p className="text-gray-600 text-base">Demonstrate product features, usage, and details LIVE—build instant trust with your viewers</p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-8 bg-white border border-green-100 rounded-2xl shadow-lg">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 mb-4 shadow">
              <FaComments className="text-white text-3xl" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Interactive Selling</h3>
            <p className="text-gray-600 text-base">Respond to questions, highlight viewers’ names, and give exclusive live-only offers to boost conversions</p>
          </div>
          {/* Step 4 */}
          <div className="flex flex-col items-center text-center p-8 bg-white border border-orange-100 rounded-2xl shadow-lg">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 mb-4 shadow">
              <FaChartLine className="text-white text-3xl" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Real-Time Analytics</h3>
            <p className="text-gray-600 text-base">Track viewer count, engagement, and instant sales while you stream. Optimize your pitch on the fly</p>
          </div>
        </div>
        {/* Demo Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">See Halohunt in Action</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Watch how sellers connect with buyers through live streaming, creating an engaging shopping experience that drives real results.
          </p>
          <div className="flex justify-center mb-6">
            <div className="relative w-full sm:w-full md:w-full lg:w-[60vw] aspect-video rounded-2xl bg-white border border-purple-200 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 opacity-60" />
              <FaPlay className="relative z-10 text-halo-purple text-5xl mx-auto mt-20" />
              <span className="relative z-10 mt-8 text-halo-purple-dark text-base font-medium">30 sec preview of live commerce magic</span>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="group mt-2 flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/25">
              watch Full Demo <BsArrowRight className="group-hover:translate-x-1 transition-transform text-lg" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
"use client"

import { FaVideo, FaTag, FaShoppingCart, FaUsers, FaChartLine, FaPlay } from 'react-icons/fa';
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
    <section id="how-it-works" className="relative py-20 bg-white overflow-hidden">
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
        
        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mb-6 inline-flex items-center gap-3"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-600 mb-6 leading-relaxed"
                >
                  {step.description}
                </motion.p>
                
                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-600">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </motion.ul>
              </div>
              
              {/* Visual */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.6, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative pb-[56.25%] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-10`} />
                    <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                      <div className="text-center p-8">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-lg`}
                        >
                          <step.icon className="text-white text-3xl" />
                        </motion.div>
                        <h4 className="text-gray-900 text-xl font-semibold mb-2">{step.title}</h4>
                        <p className="text-gray-600 text-sm">Step {step.step}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements based on step */}
                  {index === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="absolute -right-4 -top-4 h-16 w-16 rounded-xl bg-purple-50 border border-purple-200 p-2"
                    >
                      <div className="h-full w-full rounded-lg bg-white flex items-center justify-center">
                        <span className="text-purple-600 text-xs font-medium">LIVE</span>
                      </div>
                    </motion.div>
                  )}
                  
                  {index === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="absolute -left-4 -bottom-4 h-16 w-16 rounded-xl bg-blue-50 border border-blue-200 p-2"
                    >
                      <div className="h-full w-full rounded-lg bg-white flex items-center justify-center">
                        <span className="text-blue-600 text-xs font-medium">TAGGED</span>
                      </div>
                    </motion.div>
                  )}
                  
                  {index === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="absolute -right-4 -bottom-4 h-16 w-16 rounded-xl bg-green-50 border border-green-200 p-2"
                    >
                      <div className="h-full w-full rounded-lg bg-white flex items-center justify-center">
                        <span className="text-green-600 text-xs font-medium">CHAT</span>
                      </div>
                    </motion.div>
                  )}
                  
                  {index === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="absolute -left-4 -top-4 h-16 w-16 rounded-xl bg-orange-50 border border-orange-200 p-2"
                    >
                      <div className="h-full w-full rounded-lg bg-white flex items-center justify-center">
                        <span className="text-orange-600 text-xs font-medium">SOLD</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Live Commerce Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of early adopters who are already signed up for HaloHunt's 
              revolutionary live commerce platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const element = document.getElementById('newsletter');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-halo-purple hover:bg-halo-purple-dark text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Join Waitlist
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('newsletter');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white border-2 border-halo-purple text-halo-purple font-semibold rounded-full hover:bg-purple-50 transition-all duration-300"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
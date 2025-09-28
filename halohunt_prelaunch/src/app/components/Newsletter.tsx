"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaGift, FaUsers, FaRocket } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

// Minimal country code list for demonstration; expand as needed
const COUNTRY_CODES = [
  { code: '+91', label: 'IN' },
  { code: '+1', label: 'US' },
  { code: '+44', label: 'UK' },
  { code: '+61', label: 'AU' },
  { code: '+81', label: 'JP' },
  { code: '+49', label: 'DE' },
  { code: '+33', label: 'FR' },
  { code: '+65', label: 'SG' },
  { code: '+971', label: 'AE' },
  { code: '+86', label: 'CN' },
];

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].code);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isExistingContact, setIsExistingContact] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          firstName, 
          lastName, 
          phoneNumber: phoneNumber ? `${countryCode}${phoneNumber}` : '', 
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setIsExistingContact(result.isExistingContact || false);
        console.log('Successfully subscribed:', result);
      } else {
        setError(result.error || 'Failed to subscribe. Please try again.');
        console.error('Subscription failed:', result);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Network error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: FaRocket,
      title: "Early Access",
      description: "Be among the first to experience the future of live commerce"
    },
    {
      icon: FaGift,
      title: "Exclusive Perks",
      description: "Get special discounts and features only for early adopters"
    },
    {
      icon: FaUsers,
      title: "Beta Testing",
      description: "Help shape the platform and get direct access to our team"
    },
    {
      icon: FaVideo,
      title: "Live Demos",
      description: "Attend exclusive live demonstrations and Q&A sessions"
    }
  ];

  return (
    <section id="newsletter" className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-100 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-pink-100 blur-3xl" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200 px-4 py-2"
          >
            <FaRocket className="text-purple-600 text-lg" />
            <span className="text-purple-700 text-sm font-medium">
              Early Access Program
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl"
          >
            Join the Live Commerce
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Revolution
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Be among the first to experience the future of shopping. Get early access to HaloHunt's 
            revolutionary live commerce platform and help shape the future of online retail.
          </motion.p>
          
          {/* Benefits Grid */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                  >
                    <benefit.icon className="text-white text-xl" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div> */}
          
          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
                         {!isSubmitted ? (
               <form onSubmit={handleSubmit} className="space-y-6">
                 {/* Name Fields */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <input
                     type="text"
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     placeholder="First Name"
                     className="px-6 py-4 bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                     disabled={isLoading}
                   />
                   <input
                     type="text"
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     placeholder="Last Name"
                     className="px-6 py-4 bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                     disabled={isLoading}
                   />
                 </div>
                 
                 {/* Email and Phone Fields */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Email Address"
                     className="px-6 py-4 bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                     required
                     disabled={isLoading}
                   />
                   <div className="flex">
                     <select
                       value={countryCode}
                       onChange={e => setCountryCode(e.target.value)}
                       className="px-4 py-4 bg-white border border-gray-300 rounded-l-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                       disabled={isLoading}
                       style={{ minWidth: '90px' }}
                     >
                       {COUNTRY_CODES.map((c) => (
                         <option key={c.code} value={c.code}>{c.label} {c.code}</option>
                       ))}
                     </select>
                     <input
                       type="tel"
                       value={phoneNumber}
                       onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                       placeholder="Phone Number (Optional)"
                       className="flex-1 px-6 py-4 bg-white border-t border-b border-r border-gray-300 rounded-r-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                       disabled={isLoading}
                       inputMode="tel"
                       pattern="[0-9]*"
                     />
                   </div>
                 </div>
                 
                 {/* Submit Button */}
                 <div className="flex justify-center">
                   <motion.button
                     whileHover={!isLoading ? { scale: 1.05 } : {}}
                     whileTap={!isLoading ? { scale: 0.95 } : {}}
                     type="submit"
                     disabled={isLoading}
                     className={`group px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${
                       isLoading 
                         ? 'bg-gray-400 cursor-not-allowed' 
                         : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/25'
                     }`}
                   >
                     <span className="flex items-center gap-2">
                       {isLoading ? (
                         <>
                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                           Subscribing...
                         </>
                       ) : (
                         <>
                           Get Early Access
                           <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                         </>
                       )}
                     </span>
                   </motion.button>
                 </div>
                 
                 {error && (
                   <motion.div
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="p-4 bg-red-50 border border-red-200 rounded-lg"
                   >
                     <p className="text-red-600 text-sm">{error}</p>
                   </motion.div>
                 )}
                 
                 <p className="text-gray-500 text-sm">
                   Join 10,000+ early adopters. No spam, just updates about our launch.
                 </p>
               </form>
            ) : (
                             <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className={`text-center p-8 rounded-2xl border ${
                   isExistingContact 
                     ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' 
                     : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                 }`}
               >
                 <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                   isExistingContact 
                     ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                     : 'bg-gradient-to-r from-green-500 to-emerald-500'
                 }`}>
                   <span className="text-white text-2xl">
                     {isExistingContact ? '🎉' : '✓'}
                   </span>
                 </div>
                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
                   {isExistingContact ? 'Welcome Back!' : 'Welcome to the Future!'}
                 </h3>
                 <p className="text-gray-600">
                   {isExistingContact 
                     ? 'You\'re already part of our early access community! We\'ll keep you updated on all the latest developments.'
                     : 'You\'re now on the early access list. We\'ll notify you as soon as HaloHunt launches.'
                   }
                 </p>
               </motion.div>
            )}
          </motion.div>
          
          {/* Stats */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "10K+", label: "Early Adopters" },
              { number: "50+", label: "Beta Testers" },
              { number: "95%", label: "Satisfaction Rate" },
              { number: "Q1 2024", label: "Launch Date" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </div>
    </section>
  );
} 
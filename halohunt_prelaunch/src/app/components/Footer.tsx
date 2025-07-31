"use client"

import { motion } from 'framer-motion';
import { FaVideo, FaShoppingCart, FaUsers, FaHeart, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaDiscord } from 'react-icons/fa';
import { BsGlobe, BsArrowUp } from 'react-icons/bs';

export default function Footer() {
  const scrollToTop = () => {
    const element = document.getElementById('home');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const footerLinks = {
    product: [
      { name: 'Live Streaming', href: '#' },
      { name: 'Product Tagging', href: '#' },
      { name: 'Analytics', href: '#' },
      { name: 'Mobile App', href: '#' },
    ],
    resources: [
      { name: 'Help Center', href: '#' },
      { name: 'API Documentation', href: '#' },
      { name: 'Live Commerce Guide', href: '#' },
      { name: 'Success Stories', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'GDPR', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
    { icon: FaDiscord, href: '#', label: 'Discord' },
  ];

  return (
    <footer className="relative bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-purple-50 blur-3xl" />
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-pink-50 blur-3xl" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="text-gray-900 font-bold text-2xl">HaloHunt</span>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-md">
                The future of live commerce is here. Connect with your audience, showcase products in real-time, 
                and sell instantly with our revolutionary platform.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          {/* Links Sections */}
          {Object.entries(footerLinks).map(([section, links], sectionIndex) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + sectionIndex * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-gray-900 font-semibold mb-4 capitalize">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="text-gray-600 hover:text-purple-600 transition-colors duration-300"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-gray-200 mb-8"
        >
          {[
            { icon: FaVideo, number: "50K+", label: "Early Adopters" },
            { icon: FaUsers, number: "1M+", label: "Expected Users" },
            { icon: FaShoppingCart, number: "5M+", label: "Expected Sales" },
            { icon: FaHeart, number: "Q1 2024", label: "Launch Date" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center border border-purple-200">
                <stat.icon className="text-purple-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-200"
        >
          <div className="text-gray-600 text-sm">
            © 2024 HaloHunt. All rights reserved. Made with ❤️ for the future of commerce.
          </div>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <BsArrowUp className="text-lg" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
} 
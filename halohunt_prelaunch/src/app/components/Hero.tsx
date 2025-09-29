"use client"

import { FaPlay } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Hero() {

  return (
    <section id="home" className="relative overflow-hidden bg-white mix-h-screen">
      {/* Subtle background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-50 blur-3xl animate-float" />
        <div className="absolute top-40 right-20 h-96 w-96 rounded-full bg-pink-50 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-blue-50 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-8 pb-16">
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
              <span className="block">Shopping</span>
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                Reinvented
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-8 text-xl text-gray-600 sm:text-2xl leading-relaxed"
            >
              HaloHunt brings live, interactive shopping to India. Watch. Chat. Buy - in real time
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

            {/* <motion.div
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
            </motion.div> */}
          </motion.div>

          {/* Right Content - Platform Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full max-w-[800px] mx-auto lg:rounded-2xl lg:overflow-hidden">
              {/* Carousel for Screenshots */}
              <Swiper
                spaceBetween={12}
                slidesPerView={2}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                className="w-full h-full"
                style={{
                  borderRadius: '1.5rem',
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                  padding: 0,
                }}
                modules={[Autoplay]}
                breakpoints={{
                  0: { slidesPerView: 1, spaceBetween: 8 },
                  640: { slidesPerView: 1.2, spaceBetween: 12 },
                  768: { slidesPerView: 2, spaceBetween: 16 },
                }}
              >
                <SwiperSlide>
                  <img
                    src="/ss/ss1.png"
                    alt="Screenshot 1"
                    className="w-full h-48 sm:h-64 md:h-72 lg:h-[70vh] object-contain rounded-xl bg-white"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/ss/ss2.png"
                    alt="Screenshot 2"
                    className="w-full h-48 sm:h-64 md:h-72 lg:h-[70vh] object-contain rounded-xl bg-white"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/ss/ss3.png"
                    alt="Screenshot 3"
                    className="w-full h-48 sm:h-64 md:h-72 lg:h-[70vh] object-contain rounded-xl bg-white"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/ss/ss4.png"
                    alt="Screenshot 3"
                    className="w-full h-48 sm:h-64 md:h-72 lg:h-[70vh] object-contain rounded-xl bg-white"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
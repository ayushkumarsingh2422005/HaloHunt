"use client"

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Go Live',
    description: 'Start your livestream with a single tap and connect with your audience instantly.',
    delay: 0.2,
  },
  {
    number: '02',
    title: 'Showcase Products',
    description: 'Present your products during the stream and engage with viewers in real-time.',
    delay: 0.4,
  },
  {
    number: '03',
    title: 'Tag Products',
    description: 'Easily tag products as you showcase them, making them instantly shoppable.',
    delay: 0.6,
  },
  {
    number: '04',
    title: 'Sell Instantly',
    description: 'Viewers can purchase tagged products without leaving the stream experience.',
    delay: 0.8,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Simple Process, Powerful Results
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-600"
          >
            From livestream to sale in just a few simple steps
          </motion.p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-600 hidden md:block" />
          
          <div className="space-y-16 md:space-y-24 relative">
            {steps.map((step, index) => (
              <div key={index} className={`relative ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: step.delay, duration: 0.6 }}
                  className={`md:w-1/2 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} relative`}
                >
                  {/* Step number circle */}
                  <div className="absolute top-0 md:top-1/2 md:transform md:-translate-y-1/2 
                    md:-translate-x-1/2 md:left-0 
                    left-0 
                    w-12 h-12 rounded-full bg-white border-2 border-purple-600 flex items-center justify-center z-10
                    md:left-auto md:right-0
                    md:-right-6 md:-left-6
                    md:mr-0 md:ml-0
                    md:mx-0
                    mx-auto
                    md:mx-0
                    md:right-auto
                    md:left-auto
                    md:right-0
                    md:left-0
                    md:right-[calc(100%+1.5rem)]
                    md:left-[calc(100%+1.5rem)]
                    md:right-auto
                    md:left-auto
                    md:mr-0
                    md:ml-0
                    md:mx-0
                    mx-auto
                    md:mx-0
                    ${index % 2 === 0 ? 'md:left-[calc(100%+1.5rem)]' : 'md:right-[calc(100%+1.5rem)]'}
                    "
                  >
                    <span className="text-purple-600 font-bold">{step.number}</span>
                  </div>
                  
                  <div className="pt-16 md:pt-0 pl-16 md:pl-0 md:pr-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
            Join the Waitlist
          </button>
        </motion.div>
      </div>
    </section>
  );
} 
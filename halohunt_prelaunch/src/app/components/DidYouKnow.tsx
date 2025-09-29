"use client";

import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';

const facts = [
  {
    text: 'Over 30% of online fashion items are returned, mainly due to poor fit or quality.',
    source: 'Fashion Network',
    link: 'https://in.fashionnetwork.com/news/E-commerce-fashion-platforms-scammed-by-fraudulent-product-returns,936934.html',
  },
  {
    text: 'More than 4.6 lakh complaints were made about fake or disappointing products last year alone.',
    source: 'CNBC18',
    link: 'https://www.cnbctv18.com/business/companies/consumer-complaints-against-e-comm-firms-rise-117-percent-in-four-years-consumer-affairs-ministry-in-parliament-19526029.htm?utm_source=perplexity',
  },
  {
    text: 'Indian shoppers lose nearly ₹870 crore a year to fake returns and refund issues.',
    source: 'Fashion Network',
    link: 'https://in.fashionnetwork.com/news/E-commerce-fashion-platforms-scammed-by-fraudulent-product-returns,936934.html',
  },
  {
    text: 'Still, 64% want live demos and real answers before buying.',
    source: 'Sales Operator',
    link: 'https://salesoperator.net/2025/05/23/challenges-for-indian-small-e-commerce-businesses/?utm_source=perplexity',
  },
];

export default function DidYouKnow() {
  return (
    <section className="relative py-16 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 border border-purple-200 px-4 py-2 mb-4">
            <FaInfoCircle className="text-purple-600 text-lg" />
            <span className="text-purple-700 text-sm font-medium">Did you know?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Building Trust in Online Shopping</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are some eye-opening facts about online shopping in India. We’re here to help you shop smarter and safer!
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md flex flex-col h-full"
            >
              <div className="flex-1">
                <p className="text-gray-800 text-base mb-4">{fact.text}</p>
              </div>
              <div className="mt-auto text-sm text-gray-500">
                <span className="font-semibold text-purple-700">{fact.source}</span>{' '}
                <a
                  href={fact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 underline ml-1 hover:text-pink-600"
                >
                  Source
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

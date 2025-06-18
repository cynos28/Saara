'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f3] to-[#e6e2e0]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-light text-center mb-20"
        >
          <span className="font-semibold italic text-[#84807b]" > Floral </span><span className="font-semibold italic text-[#8B7355]">Subscription</span>
        </motion.h1>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Weekly Plan */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/95 backdrop-blur-md p-10 rounded-[2rem] shadow-lg hover:shadow-[0_0_40px_rgba(139,115,85,0.15)] transition-all"
          >
            <div className="border-b border-[#8B7355]/20 pb-6 mb-8">
              <h2 className="text-4xl font-light text-[#4A4A4A] mb-3 text-center">
                Weekly <span className="font-semibold">Subscription</span>
              </h2>
              <p className="text-[#8B7355] text-center text-lg">Fresh flowers, delivered to your door — every week for one month</p>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Bring beauty into your everyday life with our Weekly Flower Subscription. Thoughtfully curated
                with seasonal blooms, each arrangement is handcrafted to brighten your home, office, or
                workspace on a regular basis. Perfect as a personal treat or a thoughtful ongoing gift.
              </p>
              
              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-semibold text-[#4A4A4A] mb-3">What's included:</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">A fresh flower delivered once per week</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Premium seasonal flowers (roses, hydrangeas, peonies, spray roses, alstroemeria)</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Custom color options: Soft Pastels, Bright Mix, White & Green</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Arranged in a vase (first delivery)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#4A4A4A] mb-3">Why you'll love it:</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Fresh flowers, no hassle</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Perfect for homes, offices, or gifting</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Pause or cancel anytime</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Seasonal designs that never get boring</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Link href="/category/floral-subscription" 
                  className="block w-full text-center bg-[#8B7355] text-white py-4 rounded-full hover:bg-[#6F5B3E] transition-all duration-300 transform hover:scale-105 font-medium text-lg">
              Subscribe Weekly
            </Link>
          </motion.div>

          {/* Monthly Plan */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/95 backdrop-blur-md p-10 rounded-[2rem] shadow-lg hover:shadow-[0_0_40px_rgba(139,115,85,0.15)] transition-all"
          >
            <div className="border-b border-[#8B7355]/20 pb-6 mb-8">
              <h2 className="text-4xl font-light text-[#4A4A4A] mb-3 text-center">
                Monthly <span className="font-semibold">Subscription</span>
              </h2>
              <p className="text-[#8B7355] text-center text-lg">A fresh touch of elegance, delivered once a month</p>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Treat yourself or someone special to a beautiful floral arrangement every month. Our Monthly
                Flower Subscription is the perfect way to enjoy premium seasonal blooms without the
                commitment of weekly deliveries. Each bouquet is handcrafted with love and thoughtfully
                designed to match the season and your preferred color palette.
              </p>
              
              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-semibold text-[#4A4A4A] mb-3">What's included:</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">One fresh floral arrangement delivered monthly</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Premium seasonal flowers (roses, hydrangeas, peonies, spray roses, alstroemeria)</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Your choice of color theme: Soft Pastels, White & Green, Bright Mix</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Arranged in a vase (first delivery)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#4A4A4A] mb-3">Why you'll love it:</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Fresh flowers, no hassle</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Perfect for homes, offices, or gifting</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Pause or cancel anytime</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#8B7355] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-700">Seasonal designs that never get boring</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Link href="/category/floral-subscription"
                  className="block w-full text-center bg-[#8B7355] text-white py-4 rounded-full hover:bg-[#6F5B3E] transition-all duration-300 transform hover:scale-105 font-medium text-lg">
              Subscribe Monthly
            </Link>
          </motion.div>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-white/10 backdrop-blur-md rounded-full py-4 px-8">
            <span className="text-[#4A4A4A] font-medium">Need Help?</span>
            <div className="h-5 w-px bg-[#8B7355]/30" />
            <a href="tel:+971586378051" className="text-[#8B7355] hover:text-[#6F5B3E] transition-colors">
              +971586378051
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionPage;

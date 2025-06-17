"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FloralSubscriptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f3] to-[#e6e2e0]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-5xl md:text-7xl font-light text-center mb-20"
        >
          <span className="font-semibold italic text-[#6e6e6e]">Customize Your</span>  <span className="font-semibold italic text-[#8B7355]">Subscription</span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white p-12 rounded-[2rem] shadow-lg">
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="block text-gray-800 text-lg font-medium">Select Flowers</label>
                <select className="w-full p-4 rounded-full bg-white text-gray-800 border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none">
                  <option>Mixed Seasonal Bouquet</option>
                  <option>Premium Roses</option>
                  <option>Wildflowers Selection</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="block text-gray-800 text-lg font-medium">Select Date</label>
                <input 
                  type="date" 
                  className="w-full p-4 rounded-full bg-white text-gray-800 border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-gray-800 text-lg font-medium">Delivery Details</label>
                <input 
                  type="text"
                  placeholder="Receiver's Name"
                  className="w-full p-4 rounded-full bg-white text-gray-800 border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none mb-4 placeholder-gray-500"
                />
                <input 
                  type="text"
                  placeholder="Delivery Location"
                  className="w-full p-4 rounded-full bg-white text-gray-800 border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none placeholder-gray-500"
                />
              </div>

              <button className="w-full bg-[#8B7355] text-white py-4 rounded-full hover:bg-[#6F5B3E] transition-all duration-300 transform hover:scale-105 font-medium text-lg">
                Confirm Subscription
              </button>
            </div>
          </div>

          <Link 
            href="/subcription"
            className="block text-center mt-8 text-[#6F5B3E] hover:text-[#8B7355] font-medium transition-colors"
          >
            ← Back to Plans
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
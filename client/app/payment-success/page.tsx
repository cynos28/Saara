'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f3] to-[#e6e2e0] flex items-center justify-center py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-lg p-12"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-light text-[#4A4A4A] mb-4"
          >
            <span className="font-semibold italic text-[#8B7355]">Payment</span> Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Thank you for your order! Your flowers will be delivered soon.
          </motion.p>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#8B7355]/5 p-6 rounded-2xl mb-8"
          >
            <h3 className="text-lg font-semibold text-[#4A4A4A] mb-4">What's Next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#8B7355] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-[#4A4A4A]">Order Confirmation</p>
                  <p className="text-gray-600 text-sm">You'll receive an email confirmation shortly</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#8B7355] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-[#4A4A4A]">Preparation</p>
                  <p className="text-gray-600 text-sm">We're carefully preparing your beautiful flowers</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#8B7355] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-[#4A4A4A]">Delivery</p>
                  <p className="text-gray-600 text-sm">Your flowers will be delivered to your doorstep</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <Link
              href="/"
              className="block w-full bg-[#8B7355] text-white py-4 rounded-2xl hover:bg-[#6F5B3E] transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
            >
              Continue Shopping
            </Link>
            <Link
              href="/subcription"
              className="block w-full bg-white text-[#8B7355] border-2 border-[#8B7355] py-4 rounded-2xl hover:bg-[#8B7355] hover:text-white transition-all duration-300 font-semibold text-lg"
            >
              Explore Subscriptions
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-gray-600 mb-2">Need help? Contact us at</p>
            <a
              href="tel:+971586378051"
              className="text-[#8B7355] hover:text-[#6F5B3E] font-semibold transition-colors"
            >
              +971 586 378 051
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 
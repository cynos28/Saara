"use client";

import { motion } from 'framer-motion';

export default function FlowersForEventsPage() {
  return (
    <div className="min-h-screen bg-[#e6e2e0] py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#4A4A4A]">
          FLOWERS FOR EVENTS
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-center"
          >
            <h2 className="text-3xl font-bold text-[#4A4A4A]">
              Event Flowers
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Stunning floral designs for weddings, corporate events, and special occasions. Contact us for custom event arrangements!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 
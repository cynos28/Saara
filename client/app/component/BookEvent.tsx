'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaUser, FaSpa } from 'react-icons/fa';

interface BookingForm {
  eventType: string;
  location: string;
  date: string;
  quantity: string;
  floralTheme: string;
  items: string[];
}

export default function BookEvent() {
  const [formData, setFormData] = useState<BookingForm>({
    eventType: '',
    location: '',
    date: '',
    quantity: '',
    floralTheme: '',
    items: []
  });

  return (
    <div className="min-h-screen bg-[#e6e2e0]">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full">
        <Image
          src="/images/IMG_8493.jpg"
          alt="Event Booking"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Book Your Event
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-center max-w-2xl px-4"
          >
            Let us make your special day unforgettable with our floral arrangements
          </motion.p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Select Event */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="flex items-center space-x-2 mb-3">
                <FaSpa className="text-[#8B7355] text-xl" />
                <label className="text-xl font-semibold text-[#4A4A4A]">SELECT EVENT</label>
              </div>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full p-4 bg-[#F5F0EB] border-2 border-transparent rounded-lg 
                         text-[#4A4A4A] text-lg focus:border-[#8B7355] transition-all
                         font-medium"
              >
                <option value="">Select event type</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="birthday">Birthday Party</option>
                <option value="anniversary">Anniversary</option>
              </select>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="flex items-center space-x-2 mb-3">
                <FaMapMarkerAlt className="text-[#8B7355] text-xl" />
                <label className="text-xl font-semibold text-[#4A4A4A]">SELECT LOCATION</label>
              </div>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter event location"
                className="w-full p-4 bg-[#F5F0EB] border-2 border-transparent rounded-lg 
                         text-[#4A4A4A] text-lg focus:border-[#8B7355] transition-all
                         placeholder:text-gray-400"
              />
            </motion.div>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="flex items-center space-x-2 mb-3">
                <FaCalendar className="text-[#8B7355] text-xl" />
                <label className="text-xl font-semibold text-[#4A4A4A]">SELECT DATE</label>
              </div>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-4 bg-[#F5F0EB] border-2 border-transparent rounded-lg 
                         text-[#4A4A4A] text-lg focus:border-[#8B7355] transition-all"
              />
            </motion.div>

            {/* Quantity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="flex items-center space-x-2 mb-3">
                <FaUser className="text-[#8B7355] text-xl" />
                <label className="text-xl font-semibold text-[#4A4A4A]">SELECT QUANTITY</label>
              </div>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="Number of guests"
                className="w-full p-4 bg-[#F5F0EB] border-2 border-transparent rounded-lg 
                         text-[#4A4A4A] text-lg focus:border-[#8B7355] transition-all
                         placeholder:text-gray-400"
              />
            </motion.div>

            {/* Floral Theme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2"
            >
              <div className="flex items-center space-x-2 mb-3">
                <FaSpa className="text-[#8B7355] text-xl" />
                <label className="text-xl font-semibold text-[#4A4A4A]">FLORAL THEME</label>
              </div>
              <textarea
                value={formData.floralTheme}
                onChange={(e) => setFormData({ ...formData, floralTheme: e.target.value })}
                placeholder="Describe your preferred floral theme"
                className="w-full p-4 bg-[#F5F0EB] border-2 border-transparent rounded-lg 
                         text-[#4A4A4A] text-lg focus:border-[#8B7355] transition-all
                         placeholder:text-gray-400 min-h-[120px]"
              />
            </motion.div>
          </div>

          {/* Book Now Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 py-4 bg-[#8B7355] text-white rounded-lg hover:bg-[#6F5B3E] 
                     transition-all text-xl font-semibold shadow-lg"
          >
            BOOK NOW
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

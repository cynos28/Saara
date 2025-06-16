"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const flowers = [
  { name: "Pretty Pink Flowers", price: "350 AED", image: "/images/box-1.jpg" },
  { name: "Green Life", price: "360 AED", image: "/images/box-2.jpg" },
  { name: "Pink Dream", price: "300 AED", image: "/images/box-3.jpg" },
  { name: "Summer Perfection", price: "540 AED", image: "/images/box-4.jpg" },
  { name: "The Prettiest", price: "400 AED", image: "/images/box-5.jpg" },
];

export default function BoxArrangementsPage() {
  return (
    <div className="min-h-screen bg-[#e6e2e0] py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#4A4A4A]">
          BOX ARRANGEMENTS
        </h1>
        <div className="space-y-24">
          {flowers.map((flower, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2">
                <div className="relative h-[400px] rounded-2xl overflow-hidden group">
                  <Image
                    src={flower.image}
                    alt={flower.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
              </div>
              {/* Content Section */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold text-[#4A4A4A]">
                    {flower.name}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0">
                    {flower.price}
                  </p>
                  {/* Add to cart or other actions here */}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 
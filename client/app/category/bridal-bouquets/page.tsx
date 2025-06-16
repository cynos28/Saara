"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const flowers = [
  { name: "Bridal Love", price: "670 AED", image: "/images/bridal-1.jpg" },
  { name: "Ranunculus Love", price: "850 AED", image: "/images/bridal-2.jpg" },
  { name: "Mix Bridal Bouquet", price: "900 AED", image: "/images/bridal-3.jpg" },
  { name: "Pretty Pink Love", price: "1200 AED", image: "/images/bridal-4.jpg" },
  { name: "The Perfection", price: "1500 AED", image: "/images/bridal-5.jpg" },
];

export default function BridalBouquetsPage() {
  return (
    <div className="min-h-screen bg-[#e6e2e0] py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#4A4A4A]">
          BRIDAL BOUQUETS
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
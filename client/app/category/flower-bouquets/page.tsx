"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const flowers = [
  { name: "PINK PERFECTION", price: "540 AED", image: "/images/IMG_850_2.jpg" },
{ name: "SUMMER LOVE", price: "450 AED", image: "/images/IMG_85.jpg" },
  { name: "LAVENDER LOVE", price: "630 AED", image: "/images/IMG_8507.jpg" },
  { name: "BLUE SKY", price: "450 AED", image: "/images/IMG_8509.jpg" },
  { name: "PRETTY PINK", price: "340 AED", image: "/images/IMG_8527.jpg" },
];

export default function FlowerBouquetsPage() {
  return (
    <div className="min-h-screen bg-[#e6e2e0] py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1400px] mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-16 text-[#4A4A4A] tracking-tight">
          FLOWER <span className="text-[#8B7355]">BOUQUETS</span>
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {flowers.map((flower, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative aspect-square">
                <Image
                  src={flower.image}
                  alt={flower.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={index < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
              
              <div className="p-6 relative">
                <div className="absolute -top-10 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                  <p className="text-[#8B7355] font-semibold">{flower.price}</p>
                </div>
                
                <h2 className="text-xl font-bold text-[#4A4A4A] mb-4 mt-2">
                  {flower.name}
                </h2>
                
                <button className="w-full bg-[#8B7355] text-white py-3.5 rounded-xl
                  hover:bg-[#6F5B3E] transition-all duration-300 text-sm font-medium
                  flex items-center justify-center gap-2 group/btn"
                >
                  <span>ADD TO CART</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

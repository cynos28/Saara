"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const flowers = [
  { id: "box-1", name: "Pretty Pink Flowers", price: "350 AED", image: "/images/IMG_8530.jpg" },
  { id: "box-2", name: "Green Life", price: "360 AED", image: "/images/IMG_8533.jpg" },
  { id: "box-3", name: "Pink Dream", price: "300 AED", image: "/images/IMG_8525.jpg" },
  { id: "box-4", name: "Summer Perfection", price: "540 AED", image: "/IMG_853555.jpg" },
  { id: "box-5", name: "The Prettiest", price: "400 AED", image: "/images/IMG_8534.jpg" },
];

export default function BoxArrangementsPage() {
  const { addToCart } = useCart();

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
          className="text-5xl md:text-7xl font-light text-center mb-20 text-[#4A4A4A]"
        >
          Box <span className="font-semibold italic text-[#8B7355]">Arrangements</span>
        </motion.h1>
        
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {flowers.map((flower, index) => (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid-column group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={flower.image}
                    alt={flower.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    priority={index < 4}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-light text-[#4A4A4A] mb-2">
                      {flower.name}
                    </h2>
                    <p className="text-[#8B7355] font-semibold text-lg mb-4">
                      {flower.price}
                    </p>
                    <button 
                      onClick={() => addToCart(flower)}
                      className="w-full bg-[#8B7355] text-white py-4 rounded-lg
                        hover:bg-[#6F5B3E] transition-colors duration-300 text-sm uppercase tracking-wider
                        flex items-center justify-center gap-3"
                    >
                      Add to Cart
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
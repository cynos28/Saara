"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const flowers = [
  {
    id: "everyday-1",
    name: "Roses",
    price: 10,
    image: "/images/IMG_85462.jpg",
    description: "The classic symbol of love and elegance, our roses bring timeless beauty to any arrangement. With velvety petals and a captivating fragrance, they brighten every occasion — from heartfelt gifts to simple everyday joy.",
    availableColors: ["Pink", "White", "Peach", "Red"],
    category: "Classic"
  },
  {
    id: "everyday-2",
    name: "Peonies",
    price: 40,
    image: "/images/IMG_8545.jpg",
    description: "Known for their large, ruffled petals and delightful fragrance, peonies are a favorite for adding romantic flair. Their graceful blooms symbolize prosperity and are perfect for elevating any floral design.",
    availableColors: ["Pink", "White"],
    category: "Romantic"
  },
  {
    id: "everyday-3",
    name: "Hydrangeas",
    price: 35,
    image: "/images/IMG_8542.jpg",
    description: "Lush and full, hydrangeas create a luxurious volume with their clustered blooms. Their soft, cloud-like petals add texture and charm, making every bouquet feel abundant and fresh.",
    availableColors: ["Pink", "White", "Blue"],
    category: "Luxury"
  },
  {
    id: "everyday-4",
    name: "Alstroemeria",
    price: 8,
    image: "/images/IMG_8546.jpg",
    description: "Also called Peruvian lilies, alstroemeria bring vibrant color and a delicate, exotic touch. Their long vase life and cheerful blooms make them ideal for brightening everyday moments.",
    availableColors: ["Pink", "White", "Orange", "Red"],
    category: "Exotic"
  },
  {
    id: "everyday-5",
    name: "Spray Roses",
    price: 15,
    image: "/images/IMG_8544.jpg",
    description: "Smaller than traditional roses but just as charming, spray roses add depth and fullness. Their multiple blooms per stem bring a soft, romantic detail that complements any floral arrangement beautifully.",
    availableColors: ["Pink", "White", "Peach", "Orange", "Red"],
    category: "Romantic"
  },
];

export default function EverydayFlowersPage() {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleQuantityChange = (id: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change)
    }));
  };

  const handleAddToCart = async (flower: typeof flowers[0]) => {
    const quantity = quantities[flower.id] || 1;
    setAddingToCart(flower.id);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addToCart({
      ...flower,
      quantity,
      price: flower.price
    });
    
    setAddingToCart(null);
    setQuantities(prev => ({ ...prev, [flower.id]: 1 }));
  };

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
          className="text-5xl md:text-7xl font-light text-center mb-8 text-[#4A4A4A]"
        >
          Everyday <span className="font-semibold italic text-[#8B7355]">Flowers</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-lg text-[#6B6B6B] mb-16 max-w-3xl mx-auto"
        >
          Discover our selection of premium individual flowers, perfect for creating your own 
          arrangements or adding that special touch to any occasion.
        </motion.p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {flowers.map((flower, index) => (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Image Section */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={flower.image}
                    alt={flower.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    priority={index < 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#8B7355]">
                      {flower.category}
                    </span>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 bg-[#8B7355]/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                      {flower.price} AED
                    </span>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <h2 className="text-2xl font-light text-[#4A4A4A] mb-3">
                    {flower.name}
                  </h2>
                  
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">
                    {flower.description}
                  </p>
                  
                  {/* Available Colors Section */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[#8B7355] mb-2 uppercase tracking-wider">
                      Available colors:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {flower.availableColors.map((color, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#F5F3F0] text-xs text-[#8B7355] rounded-full">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Per Stem Note */}
                  <div className="mb-4">
                    <p className="text-xs text-[#8B7355] font-medium">
                      Price per stem
                    </p>
                  </div>
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-[#4A4A4A]">Quantity:</span>
                    <div className="flex items-center bg-[#F5F3F0] rounded-lg p-1">
                      <button
                        onClick={() => handleQuantityChange(flower.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-[#8B7355] hover:bg-white rounded-md transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="px-4 text-[#4A4A4A] font-medium">
                        {quantities[flower.id] || 1}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(flower.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#8B7355] hover:bg-white rounded-md transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(flower)}
                    disabled={addingToCart === flower.id}
                    className="w-full bg-[#8B7355] text-white py-4 rounded-xl
                      hover:bg-[#6F5B3E] transition-all duration-300 text-sm uppercase tracking-wider
                      flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed
                      transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {addingToCart === flower.id ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </>
                    ) : (
                      <>
                        Add to Cart
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

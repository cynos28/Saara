"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const flowers = [
  {
    id: "bridal-1",
    name: "Bridal Love",
    price: 670,
    image: "/images/IMG_8503.jpg",
    description: "A timeless bouquet that captures pure elegance and romance, perfect for making your special day unforgettable. Soft whites and creams wrapped in delicate textures to complement any bridal style.",
    includes: [
      "6 Peach Roses",
      "6 White Ranunculus",
      "4 Peach Tulips",
      "5 White Matthiolla"
    ],
    presentedIn: "Classic white satin ribbon wrap (size: 25–30 cm diameter)",
    category: "Classic"
  },
  {
    id: "bridal-2",
    name: "Ranunculus Love",
    price: 850,
    image: "/images/IMG_850.jpg",
    description: "Soft, lush, and romantically layered — Ranunculus Love is designed to enchant with its delicate petals and elegant shape. Perfect for brides who adore whimsical charm.",
    includes: [
      "25 Ranunculus (mix of white and blush pink)"
    ],
    presentedIn: "Blush pink ribbon wrap with pearl accents (size: 25–30 cm diameter)",
    category: "Romantic"
  },
  {
    id: "bridal-3",
    name: "Mix Bridal Bouquet",
    price: 900,
    image: "/images/IMG_8497.jpg",
    description: "A beautifully balanced blend of seasonal blooms, this bouquet offers a fresh and romantic look with a vibrant mix of soft pastels and white flowers.",
    includes: [
      "8 Peonies (white and light pink)",
      "6 Garden Roses light pink",
      "2 Hydrangea (soft pink)",
      "4 Spray Roses (pink)"
    ],
    presentedIn: "Natural twine wrap with lace overlay (size: 30 cm diameter)",
    category: "Seasonal"
  },
  {
    id: "bridal-4",
    name: "Pretty Pink Love",
    price: 1200,
    image: "/images/IMG_8492.jpg",
    description: "Blushing with soft pinks and delicate textures, this bouquet is a perfect pick for romantic brides who want a sweet, feminine touch on their big day.",
    includes: [
      "7 Pink Roses",
      "8 Pink Peonies",
      "4 Pink Ranunculus",
      "3 Hydrangeas (light pink)",
      "3 Phalaenopsis"
    ],
    presentedIn: "Pink silk ribbon wrap (size: 25–30 cm diameter)",
    category: "Romantic"
  },
  {
    id: "bridal-5",
    name: "The Perfection",
    price: 1500,
    image: "/images/IMG_8528.jpg",
    description: "An exquisite bouquet combining classic bridal elegance with modern style. Clean lines and lush blooms create a flawless, stunning statement.",
    includes: [
      "5 White Peonies",
      "5 Pink Roses",
      "5 White Phalaenopsis",
      "4 White Lisianthus"
    ],
    presentedIn: "Ivory satin ribbon wrap with crystal detail (size: 30 cm diameter)",
    category: "Luxury"
  },
];

export default function BridalBouquetsPage() {
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
          Bridal <span className="font-semibold italic text-[#8B7355]">Collection</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-lg text-[#6B6B6B] mb-16 max-w-3xl mx-auto"
        >
          Discover our exquisite collection of bridal bouquets, each crafted with love and designed 
          to make your special day truly magical and unforgettable.
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
                  
                  {/* Includes Section */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-[#8B7355] mb-2 uppercase tracking-wider">
                      Includes:
                    </h3>
                    <ul className="space-y-1">
                      {flower.includes.map((item, idx) => (
                        <li key={idx} className="text-sm text-[#6B6B6B] flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#8B7355] rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Presented In Section */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[#8B7355] mb-2 uppercase tracking-wider">
                      Presented in:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#F5F3F0] text-xs text-[#8B7355] rounded-full">
                        {flower.presentedIn}
                      </span>
                    </div>
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
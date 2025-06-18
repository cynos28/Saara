"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const flowers = [
  {
    id: "box-1",
    name: "Pretty Pink Flowers",
    price: 350,
    image: "/images/IMG_8530.jpg",
    description: "Delicate, romantic, and full of charm — this pastel-perfect arrangement brings soft elegance to any space. Ideal for celebrations or a thoughtful gesture of love.",
    includes: [
      "5 Light Pink Roses",
      "3 Peach Dahlias", 
      "2 Light Pink Hydrangeas",
      "3 Craspedia (Billy Balls)"
    ],
    availableIn: ["Elegant Box", "Natural Basket (20–30 cm)"],
    category: "Romantic"
  },
  {
    id: "box-2", 
    name: "Green Life",
    price: 360,
    image: "/images/IMG_8533.jpg",
    description: "Fresh, modern, and effortlessly elegant — Green Life brings a serene fusion of whites and lush greens, evoking harmony and sophistication. A perfect gift for minimalist lovers or a sleek addition to any interior.",
    includes: [
      "5 White Roses",
      "3 Green Lotus Heads",
      "2 White Amaranthus",
      "15 Green Small Pampas",
      "4 White Alliums"
    ],
    availableIn: ["Luxurious Green Velvet Box (30-40cm)"],
    category: "Modern"
  },
  {
    id: "box-3",
    name: "Pink Dream", 
    price: 300,
    image: "/images/IMG_8525.jpg",
    description: "Soft, graceful, and full of charm — Pink Dream is a delicate composition of blush tones and airy textures, perfect for romantic occasions or simply brightening a beautiful day.",
    includes: [
      "10 Light Pink Roses",
      "4 White Eustoma",
      "2 Pink Ranunculus",
      "Eucalyptus Cinerea"
    ],
    availableIn: ["Pink or White Box (30-40 cm)"],
    category: "Romantic"
  },
  {
    id: "box-4",
    name: "Summer Perfection",
    price: 540,
    image: "/IMG_853555.jpg", 
    description: "A bold and radiant blend of summer's finest — this luxurious arrangement bursts with color, energy, and elegance. Designed to impress, it's perfect for joyful celebrations or vibrant spaces.",
    includes: [
      "2 Pink Anthuriums",
      "4 Pink Peonies", 
      "5 Pink Anethum",
      "10 Orange Roses"
    ],
    availableIn: ["Elegant Box", "Natural Basket (20–30 cm)"],
    category: "Luxury"
  },
  {
    id: "box-5",
    name: "The Prettiest",
    price: 400,
    image: "/images/IMG_8534.jpg",
    description: "A sweet, petite bouquet bursting with soft pinks and delicate textures — the perfect gift to brighten someone's day with love and thoughtfulness.",
    includes: [
      "10 Pink Dianthus",
      "3 Pink Matthiola",
      "Eucalyptus Foliage",
      "4 Pink Spray Roses"
    ],
    availableIn: ["White or Pink Box (30-40cm)"],
    category: "Premium"
  },
];

export default function BoxArrangementsPage() {
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
          Box <span className="font-semibold italic text-[#8B7355]">Arrangements</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-lg text-[#6B6B6B] mb-16 max-w-3xl mx-auto"
        >
          Discover our curated collection of premium floral arrangements, each crafted with care 
          and designed to bring beauty and joy to your special moments.
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
                  
                  {/* Available In Section */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[#8B7355] mb-2 uppercase tracking-wider">
                      Available in:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {flower.availableIn.map((option, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#F5F3F0] text-xs text-[#8B7355] rounded-full">
                          {option}
                        </span>
                      ))}
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
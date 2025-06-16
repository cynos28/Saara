'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    title: "FLOWER BOUQUETS",
    description: "Custom-designed bouquets featuring fresh seasonal flowers for any occasion.",
    image: "/images/IMG_8492.jpg",
    link: "/category/flower-bouquets"
  },
  {
    title: "VASE ARRANGEMENTS",
    description: "Elegant vase arrangements perfect for home decor or special events.",
    image: "/images/IMG_8496.jpg",
    link: "/category/vase-arrangements"
  },
  {
    title: "FLOWERS FOR EVENTS",
    description: "Stunning floral designs for weddings, corporate events, and special occasions.",
    image: "/images/IMG_8494.jpg",
    link: "/category/flowers-for-events"
  },
  {
    title: "FLORAL SUBSCRIPTION",
    description: "Regular flower deliveries to brighten your home or office.",
    image: "/images/IMG_8495.jpg",
    link: "/category/floral-subscription"
  },
  {
    title: "BOX ARRANGEMENTS",
    description: "Beautiful blooms artfully arranged in luxury gift boxes.",
    image: "/images/IMG_8493.jpg",
    link: "/category/box-arrangements"
  },
  {
    title: "BRIDAL BOUQUETS",
    description: "Exquisite bridal bouquets and wedding flower arrangements.",
    image: "/images/IMG_8497.jpg",
    link: "/category/bridal-bouquets"
  }
];

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-[#e6e2e0] py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#4A4A4A]">
          FLORAL CATEGORIES
        </h1>

        <div className="space-y-24">
          {categories.map((category, index) => (
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
                    src={category.image}
                    alt={category.title}
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
                    {category.title}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0">
                    {category.description}
                  </p>
                  <Link
                    href={category.link}
                    className="inline-block bg-[#8B7355] text-white px-8 py-3 rounded-lg hover:bg-[#6F5B3E] transition-colors duration-300"
                  >
                    Explore
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-block bg-white/30 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <p className="text-[#4A4A4A] mb-2">Get in touch</p>
            <div className="space-x-4">
              <a 
                href="tel:+971586378051"
                className="text-[#8B7355] hover:text-[#6F5B3E] transition-colors"
              >
                +971586378051
              </a>
              <span className="text-gray-400">|</span>
              <a 
                href="https://www.saaraflowers.ae"
                className="text-[#8B7355] hover:text-[#6F5B3E] transition-colors"
              >
                WWW.SAARAFLOWERS.AE
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

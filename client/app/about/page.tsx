'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const galleryImages = [
    '/images/IMG_8492.jpg',
    '/images/IMG_8493.jpg',
    '/images/IMG_8494.jpg',
    '/images/IMG_8495.jpg',
  ];

  return (
    <div className="min-h-screen bg-[#e6e2e0]">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left side with main image */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/IMG_8492.jpg"
                alt="Saara Flowers showcase"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right side with content */}
          <div className="lg:w-1/2">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-8 text-[#4A4A4A]"
              {...fadeIn}
            >
              ABOUT
            </motion.h1>

            <motion.p 
              className="text-lg mb-6 text-gray-700 leading-relaxed"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              Welcome to Sara Flowers, your trusted partner in bringing beauty, joy, and elegance to life's most cherished moments.
            </motion.p>

            <motion.p 
              className="text-lg mb-8 text-gray-700 leading-relaxed"
              {...fadeIn}
              transition={{ delay: 0.3 }}
            >
              Based in Dubai, Saraflowers.ae is a premier floral and event management company dedicated to delivering exceptional experiences through bespoke flower arrangements, seamless event planning, and reliable delivery services.
            </motion.p>

            <motion.div 
              className="space-y-6"
              {...fadeIn}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-[#4A4A4A] mb-4">Our services include:</h2>
              <ul className="space-y-4">
                {[
                  "Custom Floral Arrangements crafted with fresh, high-quality blooms to suit every theme and emotion.",
                  "Professional Event Planning for weddings, parties, and corporate functions, handled with creativity and attention to detail.",
                  "Flexible Flower Subscription Plans designed to bring regular floral joy to your home or office.",
                  "Same-Day Delivery within Dubai, ensuring your orders arrive fresh and right on time."
                ].map((service, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start space-x-3 text-gray-700"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                  >
                    <span className="text-[#8B7355] mt-1">•</span>
                    <span>{service}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Section */}
            <motion.div 
              className="mt-12 space-y-4"
              {...fadeIn}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-[#4A4A4A]">Get in touch</h3>
              <div className="flex items-center space-x-4">
                <a 
                  href="tel:+971586378051"
                  className="text-[#8B7355] hover:text-[#6F5B3E] transition-colors"
                >
                  +971586378051
                </a>
                <span>|</span>
                <a 
                  href="https://www.saaraflowers.ae"
                  className="text-[#8B7355] hover:text-[#6F5B3E] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WWW.SAARAFLOWERS.AE
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Gallery Section */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="grid grid-cols-4 gap-4">
            {galleryImages.map((src, index) => (
              <div 
                key={index}
                className="relative h-32 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

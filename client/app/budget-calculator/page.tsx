"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCalculator, FaUsers, FaTable, FaSpa } from 'react-icons/fa';
import { MdLocationOn, MdEventAvailable } from 'react-icons/md';

interface FormData {
  eventType: string;
  guestCount: string;
  tableCount: string;
  floralPreference: string;
  budgetRange: string;
  location: string;
}

export default function BudgetCalculatorPage() {
  const [formData, setFormData] = useState<FormData>({
    eventType: '',
    guestCount: '',
    tableCount: '',
    floralPreference: '',
    budgetRange: '',
    location: '',
  });

  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-[#e6e2e0]">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full">
        <Image
          src="/images/IMG_8494.jpg"
          alt="Budget Calculator"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Budget Calculator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-center max-w-2xl px-4"
          >
            Plan your floral arrangements with our easy-to-use budget estimator
          </motion.p>
        </div>
      </div>

      {/* Calculator Form Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "TYPE OF EVENT",
                name: "eventType",
                icon: <MdEventAvailable className="text-[#8B7355] text-xl" />,
                type: "select",
                options: ["Wedding", "Corporate Event", "Birthday", "Anniversary"]
              },
              {
                label: "NUMBER OF GUESTS",
                name: "guestCount",
                icon: <FaUsers className="text-[#8B7355] text-xl" />,
                type: "number"
              },
              {
                label: "NUMBER OF TABLES",
                name: "tableCount",
                icon: <FaTable className="text-[#8B7355] text-xl" />,
                type: "number"
              },
              {
                label: "FLORAL PREFERENCE",
                name: "floralPreference",
                icon: <FaSpa className="text-[#8B7355] text-xl" />,
                type: "select",
                options: ["Premium", "Standard", "Basic"]
              },
              {
                label: "EVENT LOCATION",
                name: "location",
                icon: <MdLocationOn className="text-[#8B7355] text-xl" />,
                type: "text",
                span: true
              }
            ].map((field) => (
              <div key={field.name} className={`${field.span ? 'md:col-span-2' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  {field.icon}
                  <label className="text-lg font-medium text-gray-700">
                    {field.label}
                  </label>
                </div>
                {field.type === 'select' ? (
                  <select
                    className="w-full p-3 bg-[#F5F0EB] border-2 border-transparent rounded-lg 
                             focus:border-[#8B7355] transition-all text-gray-700"
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="w-full p-3 bg-[#F5F0EB] border-2 border-transparent rounded-lg 
                             focus:border-[#8B7355] transition-all text-gray-700"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}

            <div className="md:col-span-2 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-[#8B7355] text-white rounded-lg text-lg font-medium
                         hover:bg-[#6F5B3E] transition-all duration-300 shadow-lg"
              >
                Calculate Estimate
              </motion.button>
            </div>
          </form>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-[#F5F0EB] rounded-lg border-l-4 border-[#8B7355]"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaCalculator className="text-2xl text-[#8B7355]" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Estimated Budget Range
                </h3>
              </div>
              <p className="text-3xl font-bold text-[#8B7355] mb-4">
                AED 5,000 - 7,000
              </p>
              <p className="text-gray-600">
                This estimate includes floral arrangements, setup, and delivery. 
                Contact us for a detailed quote and customization options.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

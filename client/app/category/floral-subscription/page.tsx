"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function FloralSubscriptionPage() {
  const [subscriptionType, setSubscriptionType] = useState('weekly');
  const [colorTheme, setColorTheme] = useState('soft-pastels');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [deliveryDates, setDeliveryDates] = useState<string[]>([]);
  const [receiverName, setReceiverName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!startDate) {
      setEndDate('');
      setDeliveryDates([]);
      return;
    }
    const start = new Date(startDate);
    let end;
    if (subscriptionType === 'weekly') {
      end = new Date(start);
      end.setDate(start.getDate() + 28); // 4 weeks
      // Calculate 4 weekly delivery dates
      const dates = [];
      for (let i = 0; i < 4; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i * 7);
        dates.push(d.toISOString().split('T')[0]);
      }
      setDeliveryDates(dates);
    } else {
      end = new Date(start);
      end.setMonth(start.getMonth() + 1); // 1 month
      setDeliveryDates([start.toISOString().split('T')[0]]);
    }
    // Format as yyyy-mm-dd for input/date display
    const yyyy = end.getFullYear();
    const mm = String(end.getMonth() + 1).padStart(2, '0');
    const dd = String(end.getDate()).padStart(2, '0');
    setEndDate(`${yyyy}-${mm}-${dd}`);
  }, [startDate, subscriptionType]);

  const handleConfirm = async () => {
    if (!subscriptionType || !colorTheme || !startDate || !endDate || deliveryDates.length === 0 || !receiverName || !phone || !address) {
      alert('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch('http://localhost:3001/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          subscriptionType,
          colorTheme,
          startDate,
          endDate,
          deliveryDates,
          receiverName,
          phone,
          address,
          specialInstructions
        })
      });
      if (res.ok) {
        alert('Subscription created successfully!');
        // Optionally redirect or reset form
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to create subscription');
      }
    } catch (err) {
      alert('Failed to create subscription');
    } finally {
      setLoading(false);
    }
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
          className="text-5xl md:text-7xl font-light text-center mb-20"
        >
          <span className="font-semibold italic text-[#6e6e6e]">Customize Your</span>  <span className="font-semibold italic text-[#8B7355]">Subscription</span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-md p-12 rounded-[2rem] shadow-lg">
            <div className="space-y-8">
              {/* Subscription Type Selection */}
              <div className="space-y-4">
                <label className="block text-gray-800 text-xl font-semibold mb-4">Subscription Type</label>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setSubscriptionType('weekly')}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      subscriptionType === 'weekly'
                        ? 'border-[#8B7355] bg-[#8B7355]/5'
                        : 'border-gray-200 hover:border-[#8B7355]/40'
                    }`}
                  >
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-[#4A4A4A] mb-2">Weekly Subscription</h3>
                      <p className="text-gray-600 text-sm">Fresh flowers every week for one month</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setSubscriptionType('monthly')}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      subscriptionType === 'monthly'
                        ? 'border-[#8B7355] bg-[#8B7355]/5'
                        : 'border-gray-200 hover:border-[#8B7355]/40'
                    }`}
                  >
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-[#4A4A4A] mb-2">Monthly Subscription</h3>
                      <p className="text-gray-600 text-sm">A fresh touch of elegance, delivered once a month</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Color Theme Selection */}
              <div className="space-y-4">
                <label className="block text-gray-800 text-xl font-semibold mb-4">Color Theme</label>
                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setColorTheme('soft-pastels')}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      colorTheme === 'soft-pastels'
                        ? 'border-[#8B7355] bg-[#8B7355]/5'
                        : 'border-gray-200 hover:border-[#8B7355]/40'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 mx-auto mb-3"></div>
                      <h3 className="text-lg font-semibold text-[#4A4A4A]">Soft Pastels</h3>
                      <p className="text-gray-600 text-sm mt-1">Gentle, romantic hues</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setColorTheme('white-green')}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      colorTheme === 'white-green'
                        ? 'border-[#8B7355] bg-[#8B7355]/5'
                        : 'border-gray-200 hover:border-[#8B7355]/40'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-green-200 mx-auto mb-3"></div>
                      <h3 className="text-lg font-semibold text-[#4A4A4A]">White & Green</h3>
                      <p className="text-gray-600 text-sm mt-1">Clean, natural elegance</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setColorTheme('bright-mix')}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      colorTheme === 'bright-mix'
                        ? 'border-[#8B7355] bg-[#8B7355]/5'
                        : 'border-gray-200 hover:border-[#8B7355]/40'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-red-400 mx-auto mb-3"></div>
                      <h3 className="text-lg font-semibold text-[#4A4A4A]">Bright Mix</h3>
                      <p className="text-gray-600 text-sm mt-1">Vibrant, energetic colors</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Flower Selection */}
              <div className="space-y-4">
                <label className="block text-gray-800 text-xl font-semibold">Flower Selection</label>
                <select className="w-full p-4 rounded-2xl bg-white text-gray-800 border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300">
                  <option>Mixed Seasonal Bouquet</option>
                  <option>Premium Roses Collection</option>
                  <option>Wildflowers Selection</option>
                  <option>Hydrangeas & Peonies</option>
                  <option>Spray Roses & Alstroemeria</option>
                </select>
              </div>

              {/* Delivery Date */}
              <div className="space-y-4">
                <label className="block text-gray-800 text-xl font-semibold">Start Date</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-white text-gray-800 border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300"
                />
              </div>

              {/* Delivery Details */}
              <div className="space-y-4">
                <label className="block text-gray-800 text-xl font-semibold">Delivery Details</label>
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text"
                    placeholder="Receiver's Name"
                    value={receiverName}
                    onChange={e => setReceiverName(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-white text-gray-800 border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none placeholder-gray-500 transition-all duration-300"
                  />
                  <input 
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-white text-gray-800 border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none placeholder-gray-500 transition-all duration-300"
                  />
                </div>
                <textarea 
                  placeholder="Delivery Address"
                  rows={3}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-white text-gray-800 border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none placeholder-gray-500 transition-all duration-300 resize-none"
                />
              </div>

              {/* Special Instructions */}
              <div className="space-y-4">
                <label className="block text-gray-800 text-xl font-semibold">Special Instructions (Optional)</label>
                <textarea 
                  placeholder="Any special requests or delivery instructions..."
                  rows={3}
                  value={specialInstructions}
                  onChange={e => setSpecialInstructions(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-white text-gray-800 border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none placeholder-gray-500 transition-all duration-300 resize-none"
                />
              </div>

              {/* Summary */}
              <div className="bg-[#8B7355]/5 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-[#4A4A4A] mb-3">Subscription Summary</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium">{subscriptionType === 'weekly' ? 'Weekly' : 'Monthly'} Subscription</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Color Theme:</span>
                    <span className="font-medium capitalize">{colorTheme.replace('-', ' & ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Start Date:</span>
                    <span className="font-medium">{startDate ? new Date(startDate).toLocaleDateString() : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>End Date:</span>
                    <span className="font-medium">{endDate ? new Date(endDate).toLocaleDateString() : '-'}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <span>Delivery Dates:</span>
                    <span className="font-medium">
                      {deliveryDates.length === 0 ? '-' : deliveryDates.map((date, idx) => (
                        <span key={date} className="inline-block mr-2">
                          {new Date(date).toLocaleDateString()}{deliveryDates.length > 1 && idx < deliveryDates.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vase Included:</span>
                    <span className="font-medium">Yes (first delivery)</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleConfirm}
                disabled={loading || !subscriptionType || !colorTheme || !startDate || !endDate || deliveryDates.length === 0 || !receiverName || !phone || !address}
                className="w-full bg-[#8B7355] text-white py-5 rounded-2xl hover:bg-[#6F5B3E] transition-all duration-300 transform hover:scale-105 font-semibold text-xl"
              >
                {loading ? 'Processing...' : 'Confirm Subscription'}
              </button>
            </div>
          </div>

          <Link 
            href="/subcription"
            className="block text-center mt-8 text-[#6F5B3E] hover:text-[#8B7355] font-medium transition-colors text-lg"
          >
            ← Back to Plans
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
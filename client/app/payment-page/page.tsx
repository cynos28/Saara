'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Notification from '@/app/component/Notification';

export default function PaymentPage() {
  const { items, totalItems, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    specialInstructions: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showAuthNotification, setShowAuthNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }
    
    // Pre-fill form with user data if available
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        address: user.address || ''
      }));
    }
    
    setIsLoading(false);
  }, [isAuthenticated, user, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f5f3] to-[#e6e2e0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment page...</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      let price: number;
      
      // Handle both string and number price types
      if (typeof item.price === 'string') {
        price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      } else if (typeof item.price === 'number') {
        price = item.price;
      } else {
        price = 0; // fallback
      }
      
      return total + (price * item.quantity);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowAuthNotification(true);
      return;
    }

    setIsProcessing(true);
    
    try {
      const token = localStorage.getItem('userToken');
      
      const orderData = {
        items,
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        deliveryAddress: {
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode
        },
        paymentInfo: {
          cardNumber: formData.cardNumber,
          cardName: formData.cardName,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv
        },
        totalAmount: calculateTotal(),
        specialInstructions: formData.specialInstructions
      };

      const response = await fetch('http://localhost:3001/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        // Simulate payment processing
        setTimeout(() => {
          setIsProcessing(false);
          clearCart();
          router.push('/payment-success');
        }, 2000);
      } else {
        throw new Error(data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleAuthAction = () => {
    setShowAuthNotification(false);
    router.push('/auth'); // Navigate to auth page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f3] to-[#e6e2e0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-light text-center text-[#4A4A4A]">
            <span className="font-semibold italic text-[#8B7355]">Payment</span> Details
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Payment Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-lg p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-2xl font-semibold text-[#4A4A4A] mb-6">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 rounded-2xl border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 rounded-2xl border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 rounded-2xl border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 rounded-2xl border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h2 className="text-2xl font-semibold text-[#4A4A4A] mb-6">Delivery Address</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 rounded-2xl border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full p-4 rounded-2xl border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className="w-full p-4 rounded-2xl border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h2 className="text-2xl font-semibold text-[#4A4A4A] mb-6">Payment Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                        className="w-full p-4 rounded-2xl border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 rounded-2xl border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: formatExpiryDate(e.target.value) }))}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                          className="w-full p-4 rounded-2xl border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={4}
                          required
                          className="w-full p-4 rounded-2xl border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Special Instructions (Optional)</label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="Any special requests or delivery instructions..."
                    rows={3}
                    className="w-full p-4 rounded-2xl border-2 border-[#8B7355]/40 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] outline-none placeholder-gray-500 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#8B7355] text-white py-5 rounded-2xl hover:bg-[#6F5B3E] transition-all duration-300 transform hover:scale-105 font-semibold text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay AED ${calculateTotal().toFixed(2)}`
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right Side - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-semibold text-[#4A4A4A] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#4A4A4A] text-sm truncate">{item.name}</h3>
                      <p className="text-[#8B7355] font-semibold">{item.price}</p>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#4A4A4A]">
                        AED {(() => {
                          let price: number;
                          if (typeof item.price === 'string') {
                            price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
                          } else if (typeof item.price === 'number') {
                            price = item.price;
                          } else {
                            price = 0;
                          }
                          return (price * item.quantity).toFixed(2);
                        })()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>AED {calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-[#4A4A4A] border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>AED {calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#8B7355]/5 rounded-2xl">
                <div className="flex items-center text-[#8B7355]">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Authentication Notification */}
      <Notification
        isOpen={showAuthNotification}
        onClose={() => setShowAuthNotification(false)}
        title="Authentication Required"
        message="You need to be logged in to complete your purchase. Please sign in or create an account to continue."
        type="warning"
        onAction={handleAuthAction}
        actionText="Sign In / Sign Up"
      />
    </div>
  );
}

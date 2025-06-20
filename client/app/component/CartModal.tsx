import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Notification from '@/app/component/Notification';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeFromCart, updateQuantity, totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [showAuthNotification, setShowAuthNotification] = useState(false);

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

  const handleCheckout = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowAuthNotification(true);
      return;
    }

    // If authenticated, proceed to checkout
    onClose();
    router.push('/payment-page');
  };

  const handleAuthAction = () => {
    setShowAuthNotification(false);
    onClose(); // Close cart modal
    router.push('/auth'); // Navigate to auth page
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white w-full max-w-md h-full overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-[#4A4A4A]">
                Shopping Cart ({totalItems} items)
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#4A4A4A]">{item.name}</h3>
                      <p className="text-[#8B7355]">{item.price}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="mt-6 space-y-4">
                {/* Authentication Status */}
                {!isAuthenticated && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-sm text-yellow-800">
                        Please sign in to complete your purchase
                      </span>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>AED {calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-[#4A4A4A] border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>AED {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#8B7355] text-white py-4 rounded-lg
                    hover:bg-[#6F5B3E] transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
                >
                  {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Authentication Notification */}
      <Notification
        isOpen={showAuthNotification}
        onClose={() => setShowAuthNotification(false)}
        title="Authentication Required"
        message="You need to be registered and logged in to proceed to checkout. Please sign up or sign in to continue with your purchase."
        type="warning"
        onAction={handleAuthAction}
        actionText="Sign Up / Sign In"
      />
    </AnimatePresence>
  );
} 
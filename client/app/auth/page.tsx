'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SignIn from '@/app/component/SignIn';
import SignUp from '@/app/component/SignUp';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  const handleSwitchToSignUp = () => {
    setIsSignIn(false);
  };

  const handleSwitchToSignIn = () => {
    setIsSignIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f3] to-[#e6e2e0] flex items-center justify-center py-8">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-light text-[#4A4A4A] mb-4">
            <span className="font-semibold italic text-[#8B7355]">Welcome</span> Back
          </h1>
          <p className="text-gray-600 text-lg">
            {isSignIn ? 'Sign in to your account' : 'Create your account'}
          </p>
        </motion.div>

        {isSignIn ? (
          <SignIn 
            onClose={handleClose} 
            onSwitchToSignUp={handleSwitchToSignUp} 
          />
        ) : (
          <SignUp 
            onClose={handleClose} 
            onSwitchToSignIn={handleSwitchToSignIn} 
          />
        )}
      </div>
    </div>
  );
} 
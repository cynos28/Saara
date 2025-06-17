"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SignInProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export default function SignIn({ onClose, onSwitchToSignUp }: SignInProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('isAdmin', data.isAdmin);
        onClose();

        if (data.isAdmin) {
          window.location.href = '/admin'; // Force page reload and navigation
        } else {
          router.push('/profile');
          window.location.reload();
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50">
      <div className="bg-white/95 rounded-lg p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#8B7355] text-white py-2 rounded mt-6 hover:bg-[#6F5B3E] cursor='pointer'"
          >
            Sign In
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignUp}
            className="text-[#8B7355] hover:underline"
          >
            Sign Up
          </button>
        </p>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}


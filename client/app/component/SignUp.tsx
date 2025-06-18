"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface SignUpProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

export default function SignUp({ onClose, onSwitchToSignIn }: SignUpProps) {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    gender: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        // Store user data and token using AuthContext
        // Server returns user data directly, not nested under 'user' property
        login(data.token, {
          id: data._id,
          name: data.name,
          email: data.email,
          address: data.address,
          gender: data.gender,
          isAdmin: data.isAdmin || false // Handle admin status
        });
        
        // Close the modal first
        onClose();
        
        // Redirect based on user role
        if (data.isAdmin) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50">
      <div className="bg-white/95 rounded-lg p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
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
            <label className="block text-gray-700 mb-2">Address</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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

          <button
            type="submit"
            className="w-full bg-[#8B7355] text-white py-2 rounded mt-6 hover:bg-[#6F5B3E]"
          >
            Sign Up
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onSwitchToSignIn}
            className="text-[#8B7355] hover:underline"
          >
            Sign In
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

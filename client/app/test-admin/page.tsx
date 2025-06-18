'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function TestAdminPage() {
  const { isAuthenticated, isAdmin, user, login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: 'admin@gmail.com',
    password: 'admin'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleTestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));

      if (response.ok) {
        console.log('Login successful:', data);
        login(data.token, {
          id: data._id,
          name: data.name,
          email: data.email,
          address: data.address || '',
          gender: data.gender || '',
          isAdmin: data.isAdmin || false
        });
        
        // Wait a moment then redirect
        setTimeout(() => {
          if (data.isAdmin) {
            router.push('/admin');
          } else {
            router.push('/');
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setResult('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Login Test</h1>
        
        {/* Current State */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Authentication State</h2>
          <div className="space-y-2">
            <p><strong>isAuthenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
            <p><strong>isAdmin:</strong> {isAdmin ? '✅ Yes' : '❌ No'}</p>
            <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'None'}</p>
            <p><strong>localStorage userToken:</strong> {localStorage.getItem('userToken') ? '✅ Present' : '❌ Missing'}</p>
            <p><strong>localStorage isAdmin:</strong> {localStorage.getItem('isAdmin')}</p>
          </div>
        </div>

        {/* Test Login Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Admin Login</h2>
          <form onSubmit={handleTestLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Login'}
            </button>
          </form>
        </div>

        {/* Actions */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/admin')}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Try to Navigate to /admin
            </button>
            <button
              onClick={handleClearStorage}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Clear localStorage & Reload
            </button>
          </div>
        </div>

        {/* API Response */}
        {result && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">API Response</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 
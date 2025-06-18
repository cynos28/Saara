"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface UserData {
  name: string;
  username: string;
  email: string;
  address: string;
  gender: string;
  bio: string;
  title: string;
  language: string;
  profileImage: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    name: '',
    username: '',
    email: '',
    address: '',
    gender: '',
    bio: '',
    title: 'Administrator',
    language: 'English',
    profileImage: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        router.push('/auth');
        return;
      }

      const response = await fetch('http://localhost:3001/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        router.push('/auth');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      router.push('/auth');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      try {
        const base64 = await convertToBase64(file);
        setUserData(prev => ({ ...prev, profileImage: base64 }));
        
        // Update profile image immediately
        const token = localStorage.getItem('userToken');
        const response = await fetch('http://localhost:3001/api/users/profile/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ profileImage: base64 })
        });

        if (response.ok) {
          window.location.reload(); // Refresh to update header
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleLogout = () => {
    logout();
    router.replace('/');
    
    // Force page refresh to update all components with new auth state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleUpdate = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:3001/api/users/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        const data = await response.json();
        alert(data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update profile');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('http://localhost:3001/api/users/profile', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          logout();
          router.replace('/');
          
          // Force page refresh to update all components with new auth state
          setTimeout(() => {
            window.location.reload();
          }, 100);
        } else {
          const data = await response.json();
          alert(data.message || 'Delete failed');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete account');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-md p-10">
        {/* Header with actions */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-[#4A4A4A]">
            User: {userData.username || 'Loading...'}
          </h2>
          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              className="bg-[#8B7355] hover:bg-[#6F5B3E] text-white px-6 py-2 rounded transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Avatar Section */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
              <Image
                src={userData.profileImage || '/default-avatar.png'}
                alt="User avatar"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xl font-semibold text-[#4A4A4A]">{userData.name}</p>
            <p className="text-[#666666]">{userData.email} - {userData.title}</p>
            <p className="text-sm text-[#888888] mt-1">Avatar by gravatar.com. Or upload your own...</p>

            {isEditing && (
              <label className="border-dashed border-2 border-gray-300 p-4 mt-4 text-center text-gray-500 w-full rounded cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                Drop your files here or <span className="text-blue-600 underline">click in this area</span>
              </label>
            )}
          </div>

          {/* Form Section with editable fields */}
          <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-2/3 grid grid-cols-1 gap-4">
            {[
              { label: 'Username', key: 'username', type: 'text' },
              { label: 'Email', key: 'email', type: 'email' },
              { label: 'Full name', key: 'name', type: 'text' },
              { label: 'Title', key: 'title', type: 'text' },
              { label: 'Bio', key: 'bio', type: 'textarea' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                  {label}
                </label>
                {type === 'textarea' ? (
                  <textarea
                    value={(userData as any)[key]}
                    onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded text-[#4A4A4A] bg-white disabled:bg-gray-50 disabled:text-[#666666]"
                    rows={3}
                  />
                ) : (
                  <input
                    type={type}
                    value={(userData as any)[key]}
                    onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded text-[#4A4A4A] bg-white disabled:bg-gray-50 disabled:text-[#666666]"
                  />
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Language</label>
              <select
                value={userData.language}
                disabled={!isEditing}
                onChange={(e) => setUserData({ ...userData, language: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>
          </form>
        </div>

        {/* Delete Account Button */}
        <div className="mt-8 pt-8 border-t">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
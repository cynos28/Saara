"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  ShoppingBag, 
  Settings, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Edit3, 
  Save, 
  X,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Eye,
  RefreshCw,
  LogOut,
  Trash2,
  Camera
} from 'lucide-react';

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

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string | number;
  image: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  deliveryAddress: {
    address: string;
    city: string;
    zipCode: string;
  };
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  specialInstructions?: string;
  createdAt: string;
}

type TabType = 'profile' | 'orders' | 'settings';

export default function ProfilePage() {
  const router = useRouter();
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    username: '',
    email: '',
    address: '',
    gender: '',
    bio: '',
    title: 'Customer',
    language: 'English',
    profileImage: ''
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
    fetchUserOrders();
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
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserOrders = async () => {
    setOrdersLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:3001/api/orders/user-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
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
          window.location.reload();
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateItemTotal = (item: OrderItem) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
    return price * item.quantity;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f5f3] to-[#e6e2e0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f3] to-[#e6e2e0] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light text-center text-[#4A4A4A]">
            <span className="font-semibold italic text-[#8B7355]">My</span> Profile
          </h1>
          <p className="text-center text-gray-600 mt-2">Manage your account and view your order history</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-[#8B7355]/20">
                <Image
                  src={userData.profileImage || '/default-avatar.png'}
                  alt="User avatar"
                  fill
                  className="object-cover"
                />
                {isEditing && (
                  <label className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                    <Camera className="h-6 w-6 text-white" />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
              <h2 className="text-2xl font-semibold text-[#4A4A4A]">{userData.name || 'User'}</h2>
              <p className="text-[#8B7355] font-medium">{userData.title}</p>
              <p className="text-gray-500 text-sm">{userData.email}</p>
            </div>

            {/* Quick Stats */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-[#8B7355]/5 rounded-2xl">
                <ShoppingBag className="h-8 w-8 text-[#8B7355] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#4A4A4A]">{orders.length}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="text-center p-4 bg-[#8B7355]/5 rounded-2xl">
                <DollarSign className="h-8 w-8 text-[#8B7355] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#4A4A4A]">
                  AED {orders.reduce((total, order) => total + order.totalAmount, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
              <div className="text-center p-4 bg-[#8B7355]/5 rounded-2xl">
                <Calendar className="h-8 w-8 text-[#8B7355] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#4A4A4A]">
                  {orders.filter(order => order.status === 'delivered').length}
                </div>
                <div className="text-sm text-gray-600">Delivered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'profile', label: 'Profile Info', icon: User },
              { id: 'orders', label: 'Order History', icon: ShoppingBag },
              { id: 'settings', label: 'Account Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#8B7355] border-b-2 border-[#8B7355] bg-[#8B7355]/5'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-[#4A4A4A]">Personal Information</h3>
                  <button
                    onClick={handleUpdate}
                    className="flex items-center gap-2 px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6F5B3E] transition-colors"
                  >
                    {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={userData.address}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent disabled:bg-gray-50 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={userData.gender}
                      onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent disabled:bg-gray-50"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={userData.bio}
                      onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent disabled:bg-gray-50 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-[#4A4A4A]">Order History</h3>
                  <button
                    onClick={fetchUserOrders}
                    disabled={ordersLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6F5B3E] transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`h-4 w-4 ${ordersLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>

                {ordersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-6 w-6 animate-spin text-[#8B7355]" />
                      <span className="text-gray-600">Loading orders...</span>
                    </div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">Start shopping to see your order history here.</p>
                    <button
                      onClick={() => router.push('/')}
                      className="bg-[#8B7355] text-white px-6 py-3 rounded-lg hover:bg-[#6F5B3E] transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <span className="text-sm font-medium text-gray-500">#{order._id.slice(-8)}</span>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                <span className="ml-1 capitalize">{order.status}</span>
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Order Date:</span>
                                <div className="font-medium">{formatDate(order.orderDate)}</div>
                              </div>
                              <div>
                                <span className="text-gray-500">Items:</span>
                                <div className="font-medium">{order.items.length} item{order.items.length > 1 ? 's' : ''}</div>
                              </div>
                              <div>
                                <span className="text-gray-500">Total:</span>
                                <div className="font-medium text-[#8B7355]">AED {order.totalAmount.toFixed(2)}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                // View order details - could open a modal
                                alert(`Order details for #${order._id.slice(-8)}`);
                              }}
                              className="flex items-center gap-2 px-4 py-2 text-[#8B7355] border border-[#8B7355] rounded-lg hover:bg-[#8B7355] hover:text-white transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#4A4A4A]">Account Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={userData.language}
                      onChange={(e) => setUserData({ ...userData, language: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Arabic">Arabic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                    <input
                      type="text"
                      value={userData.title}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-medium text-[#4A4A4A] mb-4">Account Actions</h4>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
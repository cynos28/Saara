"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Search, RefreshCw, Edit3, XCircle, Save, Eye, CheckCircle, AlertCircle } from 'lucide-react';

const statusOptions = ['All', 'active', 'cancelled'];

// Helper for status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border bg-green-100 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4" /> Active
        </span>
      );
    case 'cancelled':
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border bg-red-100 border-red-200 text-red-800">
          <AlertCircle className="h-4 w-4" /> Cancelled
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border bg-gray-100 border-gray-200 text-gray-800">
          {status}
        </span>
      );
  }
};

export default function AdminSubscriptionsPage() {
  const { isAuthenticated } = useAuth();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<any>({});
  const [actionLoading, setActionLoading] = useState(false);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch('http://localhost:3001/api/subscriptions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setSubscriptions(data);
      }
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchSubscriptions();
  }, [isAuthenticated]);

  const handleCancel = async (subId: string) => {
    if (!window.confirm('Are you sure you want to cancel this subscription?')) return;
    setActionLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch(`http://localhost:3001/api/subscriptions/${subId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchSubscriptions();
        setSelectedSub(null);
      } else {
        alert('Failed to cancel subscription.');
      }
    } catch (err) {
      alert('Failed to cancel subscription.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (sub: any) => {
    setEditForm({
      colorTheme: sub.colorTheme,
      receiverName: sub.receiverName,
      phone: sub.phone,
      address: sub.address,
      specialInstructions: sub.specialInstructions || '',
      status: sub.status
    });
    setEditMode(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    setActionLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch(`http://localhost:3001/api/subscriptions/${selectedSub._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        fetchSubscriptions();
        setEditMode(false);
        setSelectedSub(null);
      } else {
        alert('Failed to update subscription.');
      }
    } catch (err) {
      alert('Failed to update subscription.');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const userName = typeof sub.userId === 'object' ? sub.userId.name?.toLowerCase() : '';
    const userEmail = typeof sub.userId === 'object' ? sub.userId.email?.toLowerCase() : '';
    const matchesSearch = userName.includes(searchTerm.toLowerCase()) ||
      userEmail.includes(searchTerm.toLowerCase()) ||
      sub._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || sub.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin text-[#8B7355]" />
          <span className="text-gray-600">Loading subscriptions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscriptions Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            {subscriptions.length} total subscriptions • Manage customer subscriptions and track status
          </p>
        </div>
        <button
          onClick={fetchSubscriptions}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6d5a44] transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user name, email, or subscription ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent transition-all"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-900 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-900 uppercase">User</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-900 uppercase">User Name</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-900 uppercase">User Email</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-900 uppercase">Type</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-900 uppercase">Start</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-900 uppercase">End</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-900 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-900 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.map((sub) => (
                <tr key={sub._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 text-sm text-gray-900 font-medium">{sub._id.slice(-8)}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 font-medium">{typeof sub.userId === 'object' ? sub.userId._id?.slice(-8) : sub.userId}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 font-medium">{typeof sub.userId === 'object' ? sub.userId.name : '-'}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 font-medium">{typeof sub.userId === 'object' ? sub.userId.email : '-'}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 font-medium">{sub.subscriptionType}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 font-medium">{sub.startDate ? new Date(sub.startDate).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 font-medium">{sub.endDate ? new Date(sub.endDate).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 font-medium">
                    {getStatusBadge(sub.status)}
                  </td>
                  <td className="px-4 py-2 text-sm flex gap-2">
                    <button
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-md font-semibold border bg-yellow-100 border-yellow-200 text-yellow-800 hover:opacity-90 focus:ring-2 focus:ring-yellow-300 transition-all"
                      onClick={() => setSelectedSub(sub)}
                    >
                      <Eye className="h-4 w-4" />
                      See Details
                    </button>
                    <button
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-md font-semibold border bg-blue-100 border-blue-200 text-blue-800 hover:opacity-90 focus:ring-2 focus:ring-blue-300 transition-all"
                      onClick={() => { setSelectedSub(sub); handleEdit(sub); }}
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-md font-semibold border bg-red-100 border-red-200 text-red-800 hover:opacity-90 focus:ring-2 focus:ring-red-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={() => handleCancel(sub._id)}
                      disabled={actionLoading}
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details/Edit Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-xl border border-gray-200 max-w-lg w-full max-h-[90vh] overflow-y-auto p-0 relative">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Subscription Details</h2>
              <button onClick={() => { setSelectedSub(null); setEditMode(false); }} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <div className="px-6 py-4">
              {!editMode ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">User Name</div>
                      <div className="font-medium text-gray-900">{typeof selectedSub.userId === 'object' ? selectedSub.userId.name : '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">User Email</div>
                      <div className="font-medium text-gray-900">{typeof selectedSub.userId === 'object' ? selectedSub.userId.email : '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Receiver Name</div>
                      <div className="font-medium text-gray-900">{selectedSub.receiverName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Phone</div>
                      <div className="font-medium text-gray-900">{selectedSub.phone}</div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="text-xs text-gray-500 mb-1">Address</div>
                      <div className="font-medium text-gray-900">{selectedSub.address}</div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="text-xs text-gray-500 mb-1">Special Instructions</div>
                      <div className="font-medium text-gray-900">{selectedSub.specialInstructions || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Type</div>
                      <div className="font-medium text-gray-900">{selectedSub.subscriptionType}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Status</div>
                      <div className="font-medium text-gray-900">{getStatusBadge(selectedSub.status)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Start Date</div>
                      <div className="font-medium text-gray-900">{selectedSub.startDate ? new Date(selectedSub.startDate).toLocaleDateString() : '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">End Date</div>
                      <div className="font-medium text-gray-900">{selectedSub.endDate ? new Date(selectedSub.endDate).toLocaleDateString() : '-'}</div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="text-xs text-gray-500 mb-1">Delivery Dates</div>
                      <div className="font-medium text-gray-900">{selectedSub.deliveryDates && selectedSub.deliveryDates.length > 0 ? selectedSub.deliveryDates.map((d: string, i: number) => new Date(d).toLocaleDateString()).join(', ') : '-'}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end pt-4 border-t border-gray-100 mt-4">
                    <button
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-md font-semibold border bg-blue-100 border-blue-200 text-blue-800 hover:opacity-90 focus:ring-2 focus:ring-blue-300 transition-all"
                      onClick={() => handleEdit(selectedSub)}
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-md font-semibold border bg-red-100 border-red-200 text-red-800 hover:opacity-90 focus:ring-2 focus:ring-red-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={() => handleCancel(selectedSub._id)}
                      disabled={actionLoading}
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel
                    </button>
                    <button
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-md font-semibold border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-all focus:ring-2 focus:ring-gray-300"
                      onClick={() => { setSelectedSub(null); setEditMode(false); }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Color Theme</label>
                      <select name="colorTheme" value={editForm.colorTheme} onChange={handleEditChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="soft-pastels">Soft Pastels</option>
                        <option value="white-green">White & Green</option>
                        <option value="bright-mix">Bright Mix</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Receiver Name</label>
                      <input name="receiverName" value={editForm.receiverName} onChange={handleEditChange} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                      <input name="phone" value={editForm.phone} onChange={handleEditChange} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                      <input name="address" value={editForm.address} onChange={handleEditChange} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Special Instructions</label>
                      <textarea name="specialInstructions" value={editForm.specialInstructions} onChange={handleEditChange} className="w-full p-2 border border-gray-300 rounded-md resize-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                      <select name="status" value={editForm.status} onChange={handleEditChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="active">Active</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end pt-4 border-t border-gray-100 mt-4">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-md font-semibold border bg-[#8B7355] border-[#8B7355] text-white hover:opacity-90 focus:ring-2 focus:ring-[#8B7355] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={actionLoading}
                    >
                      <Save className="h-4 w-4" />
                      {actionLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-md font-semibold border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-all focus:ring-2 focus:ring-gray-300"
                      onClick={() => setEditMode(false)}
                    >
                      Close
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  CheckCircle,
  Clock,
  AlertCircle,
  Package,
  Truck,
  MapPin,
  Phone,
  Mail,
  Calendar,
  RefreshCw,
  DollarSign,
  UserCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string | number;
  image: string;
}

interface Order {
  _id: string;
  userId: string;
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
  paymentInfo: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  };
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

const statusOptions = ['All', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:3001/api/orders/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`http://localhost:3001/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Update the order in local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId 
              ? { ...order, status: newStatus as Order['status'] }
              : order
          )
        );
        if (selectedOrder?._id === orderId) {
          setSelectedOrder(prev => prev ? { ...prev, status: newStatus as Order['status'] } : null);
        }
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const filteredOrders = orders.filter(order => {
    const customerName = `${order.personalInfo.firstName} ${order.personalInfo.lastName}`.toLowerCase();
    const matchesSearch = customerName.includes(searchTerm.toLowerCase()) ||
                         order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin text-[#8B7355]" />
          <span className="text-gray-600">Loading orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            {orders.length} total orders • Manage customer orders and track delivery status
          </p>
        </div>
        <button
          onClick={fetchOrders}
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
                placeholder="Search by customer name, order ID, or email..."
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

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">
            {searchTerm || selectedStatus !== 'All' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No orders have been placed yet.'
            }
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">#{order._id.slice(-8)}</div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {order.personalInfo.firstName} {order.personalInfo.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{order.personalInfo.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{formatDate(order.orderDate)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm font-semibold text-gray-900">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-[#8B7355] hover:text-[#6d5a44] transition-colors p-1 rounded"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          disabled={updatingStatus === order._id}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-[#8B7355] focus:border-[#8B7355]"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Order #{selectedOrder._id.slice(-8)}</h2>
                  <p className="text-gray-500">Placed on {formatDate(selectedOrder.orderDate)}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Customer Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="font-semibold text-gray-900">
                        {selectedOrder.personalInfo.firstName} {selectedOrder.personalInfo.lastName}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {selectedOrder.personalInfo.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {selectedOrder.personalInfo.phone}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Delivery Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Address:</span>
                        <div className="text-gray-600 mt-1">
                          {selectedOrder.deliveryAddress.address}
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">City:</span>
                        <span className="text-gray-600 ml-2">{selectedOrder.deliveryAddress.city}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">ZIP Code:</span>
                        <span className="text-gray-600 ml-2">{selectedOrder.deliveryAddress.zipCode}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      Order Status
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Order Status:</span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.status)}`}>
                          {getStatusIcon(selectedOrder.status)}
                          <span className="ml-1 capitalize">{selectedOrder.status}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Total Amount:</span>
                        <span className="text-sm font-semibold text-gray-900">
                          ${selectedOrder.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedOrder.specialInstructions && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Special Instructions</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">{selectedOrder.specialInstructions}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Order Items</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Item</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-100 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-12 w-12 rounded-lg object-cover mr-3 border border-gray-200"
                              />
                              <span className="text-sm font-medium text-gray-900">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            ${typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')).toFixed(2) : item.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                            ${calculateItemTotal(item).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-100">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-right">Total:</td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">${selectedOrder.totalAmount.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    // Add edit functionality here
                    alert('Edit functionality coming soon!');
                  }}
                  className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6d5a44] transition-colors"
                >
                  Edit Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
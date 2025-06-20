'use client';

import { useState } from 'react';
import { 
  ShoppingBag, 
  Calendar, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Eye,
  BarChart3
} from 'lucide-react';

const stats = [
  {
    name: 'Total Orders',
    value: '2,847',
    change: '+12.5%',
    changeType: 'increase',
    icon: ShoppingBag,
    color: 'bg-blue-500',
  },
  {
    name: 'Upcoming Events',
    value: '64',
    change: '+8.2%',
    changeType: 'increase',
    icon: Calendar,
    color: 'bg-green-500',
  },
  {
    name: 'Active Subscriptions',
    value: '1,234',
    change: '+3.1%',
    changeType: 'increase',
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    name: 'Low Stock Items',
    value: '23',
    change: '-15.3%',
    changeType: 'decrease',
    icon: Package,
    color: 'bg-red-500',
  },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Sarah Johnson', product: 'Wedding Bouquet', amount: 'AED 185.00', status: 'Pending' },
  { id: '#ORD-002', customer: 'Mike Chen', product: 'Anniversary Arrangement', amount: 'AED 95.50', status: 'Shipped' },
  { id: '#ORD-003', customer: 'Emily Davis', product: 'Birthday Flowers', amount: 'AED 67.25', status: 'Delivered' },
  { id: '#ORD-004', customer: 'David Wilson', product: 'Sympathy Arrangement', amount: 'AED 125.00', status: 'Pending' },
  { id: '#ORD-005', customer: 'Lisa Brown', product: 'Valentine Special', amount: 'AED 89.99', status: 'Shipped' },
];

const upcomingEvents = [
  { id: 1, client: 'Johnson Wedding', date: '2024-12-20', type: 'Wedding', status: 'Confirmed' },
  { id: 2, client: 'Corporate Gala', date: '2024-12-22', type: 'Corporate', status: 'Pending' },
  { id: 3, client: 'Birthday Party', date: '2024-12-25', type: 'Birthday', status: 'Confirmed' },
  { id: 4, client: 'Anniversary Dinner', date: '2024-12-28', type: 'Anniversary', status: 'Confirmed' },
];

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your floral business.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#8B7355] focus:outline-none focus:ring-1 focus:ring-[#8B7355]"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 3 months</option>
            <option value="year">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <div className={`ml-2 flex items-center text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.changeType === 'increase' ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              <button className="text-sm text-[#8B7355] hover:text-[#6d5a44] font-medium">
                View all
              </button>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.id}</div>
                          <div className="text-sm text-gray-500">{order.product}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
              <button className="text-sm text-[#8B7355] hover:text-[#6d5a44] font-medium">
                View all
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{event.client}</h4>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date} • {event.type}
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    event.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Revenue Overview</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Revenue Chart</h3>
              <p className="mt-1 text-sm text-gray-500">
                Chart integration will be implemented here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
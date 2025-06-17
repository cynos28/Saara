'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

interface Event {
  id: string;
  clientName: string;
  eventType: string;
  date: string;
  time: string;
  venue: string;
  budget: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  requirements: string;
  contact: {
    phone: string;
    email: string;
  };
  services: string[];
}

const events: Event[] = [
  {
    id: 'EVT-001',
    clientName: 'Sarah & Michael Johnson',
    eventType: 'Wedding',
    date: '2024-12-20',
    time: '14:00',
    venue: 'Grand Ballroom, Hilton Hotel',
    budget: 5000,
    status: 'confirmed',
    requirements: 'Bridal bouquet, 8 centerpieces, ceremony arch, aisle petals',
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@email.com'
    },
    services: ['Bridal Bouquet', 'Centerpieces', 'Ceremony Arch', 'Delivery']
  },
  {
    id: 'EVT-002',
    clientName: 'Tech Corp Inc.',
    eventType: 'Corporate',
    date: '2024-12-22',
    time: '18:00',
    venue: 'Convention Center',
    budget: 2500,
    status: 'pending',
    requirements: '12 table arrangements, entrance display, lounge area flowers',
    contact: {
      phone: '+1 (555) 987-6543',
      email: 'events@techcorp.com'
    },
    services: ['Table Arrangements', 'Entrance Display', 'Lounge Decor']
  },
  {
    id: 'EVT-003',
    clientName: 'Emma Davis',
    eventType: 'Birthday',
    date: '2024-12-25',
    time: '16:00',
    venue: 'Private Residence',
    budget: 800,
    status: 'confirmed',
    requirements: '50th birthday celebration, pink and gold theme',
    contact: {
      phone: '+1 (555) 456-7890',
      email: 'emma.davis@email.com'
    },
    services: ['Birthday Arrangements', 'Table Decor', 'Delivery']
  },
  {
    id: 'EVT-004',
    clientName: 'Robert & Lisa Wilson',
    eventType: 'Anniversary',
    date: '2024-12-28',
    time: '19:00',
    venue: 'Sunset Restaurant',
    budget: 1200,
    status: 'confirmed',
    requirements: '25th anniversary, silver and white theme, romantic setup',
    contact: {
      phone: '+1 (555) 234-5678',
      email: 'r.wilson@email.com'
    },
    services: ['Anniversary Bouquet', 'Table Centerpiece', 'Ambient Lighting']
  },
  {
    id: 'EVT-005',
    clientName: 'Memorial Service Family',
    eventType: 'Memorial',
    date: '2024-12-15',
    time: '11:00',
    venue: 'St. Mary\'s Church',
    budget: 600,
    status: 'completed',
    requirements: 'Peaceful white arrangements, sympathy flowers',
    contact: {
      phone: '+1 (555) 345-6789',
      email: 'memorial.family@email.com'
    },
    services: ['Sympathy Arrangements', 'Delivery', 'Setup']
  }
];

const eventTypes = ['All', 'Wedding', 'Corporate', 'Birthday', 'Anniversary', 'Memorial'];
const statusOptions = ['All', 'pending', 'confirmed', 'completed', 'cancelled'];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.eventType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || event.eventType === selectedType;
    const matchesStatus = selectedStatus === 'All' || event.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Bookings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your event bookings and client requests.
          </p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#8B7355] hover:bg-[#6d5a44]">
          <Plus className="h-4 w-4 mr-2" />
          New Event
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>{type} Events</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
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

      {/* Events List */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{event.clientName}</div>
                      <div className="text-sm text-gray-500">{event.eventType} • {event.id}</div>
                      <div className="text-xs text-gray-400 mt-1 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.venue}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-900">{event.date}</div>
                        <div className="text-sm text-gray-500">{event.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${event.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {getStatusIcon(event.status)}
                      <span className="ml-1 capitalize">{event.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="text-[#8B7355] hover:text-[#6d5a44]"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedEvent.clientName}</h2>
                  <p className="text-gray-500">{selectedEvent.eventType} • {selectedEvent.id}</p>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Event Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">{selectedEvent.date} at {selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">{selectedEvent.venue}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Budget: ${selectedEvent.budget.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">{selectedEvent.contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">{selectedEvent.contact.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Requirements</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">{selectedEvent.requirements}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.services.map((service, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs font-medium bg-[#8B7355] text-white rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEvent.status)}`}>
                      {getStatusIcon(selectedEvent.status)}
                      <span className="ml-1 capitalize">{selectedEvent.status}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Edit Event
                </button>
                <button className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#6d5a44]">
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
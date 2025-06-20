'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  ShoppingCart,
  Star
} from 'lucide-react';

interface Arrangement {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  status: 'active' | 'inactive' | 'out-of-stock';
  rating: number;
  description: string;
}

const arrangements: Arrangement[] = [
  {
    id: '1',
    name: 'Classic Rose Bouquet',
    price: 89.99,
    category: 'Bouquets',
    image: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 15,
    status: 'active',
    rating: 4.8,
    description: 'Beautiful arrangement of 12 red roses with baby\'s breath and greenery'
  },
  {
    id: '2',
    name: 'Wedding Centerpiece',
    price: 145.00,
    category: 'Wedding',
    image: 'https://images.pexels.com/photos/1666816/pexels-photo-1666816.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 8,
    status: 'active',
    rating: 4.9,
    description: 'Elegant white and pink centerpiece perfect for wedding tables'
  },
  {
    id: '3',
    name: 'Seasonal Mixed Bouquet',
    price: 67.50,
    category: 'Seasonal',
    image: 'https://images.pexels.com/photos/1666005/pexels-photo-1666005.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 0,
    status: 'out-of-stock',
    rating: 4.6,
    description: 'Vibrant mix of seasonal flowers including tulips, daffodils, and carnations'
  },
  {
    id: '4',
    name: 'Sympathy Arrangement',
    price: 125.00,
    category: 'Sympathy',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 12,
    status: 'active',
    rating: 4.7,
    description: 'Peaceful white lily and chrysanthemum arrangement'
  },
  {
    id: '5',
    name: 'Birthday Celebration',
    price: 75.99,
    category: 'Birthday',
    image: 'https://images.pexels.com/photos/1666020/pexels-photo-1666020.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 20,
    status: 'active',
    rating: 4.5,
    description: 'Colorful and cheerful arrangement perfect for birthday celebrations'
  },
  {
    id: '6',
    name: 'Corporate Arrangement',
    price: 95.00,
    category: 'Corporate',
    image: 'https://images.pexels.com/photos/1666024/pexels-photo-1666024.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 6,
    status: 'active',
    rating: 4.4,
    description: 'Professional arrangement suitable for office spaces and corporate events'
  }
];

const categories = ['All', 'Bouquets', 'Wedding', 'Seasonal', 'Sympathy', 'Birthday', 'Corporate'];

export default function ArrangementsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArrangement, setSelectedArrangement] = useState<Arrangement | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredArrangements = arrangements.filter(arrangement => {
    const matchesSearch = arrangement.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || arrangement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Floral Arrangements</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your floral products, inventory, and pricing.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#8B7355] hover:bg-[#6d5a44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B7355]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Arrangement
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search arrangements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#8B7355] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Arrangements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArrangements.map((arrangement) => (
          <div key={arrangement.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-w-16 aspect-h-12 relative">
              <img
                src={arrangement.image}
                alt={arrangement.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(arrangement.status)}`}>
                  {arrangement.status.replace('-', ' ')}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-medium">{arrangement.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{arrangement.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{arrangement.category}</p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{arrangement.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-xl font-bold text-gray-900">AED {arrangement.price}</span>
                  <span className="text-sm text-gray-500 ml-2">Stock: {arrangement.stock}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedArrangement(arrangement)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-blue-600"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  className="w-full flex items-center justify-center px-4 py-2 border border-[#8B7355] text-[#8B7355] text-sm font-medium rounded-lg hover:bg-[#8B7355] hover:text-white transition-colors"
                  disabled={arrangement.status === 'out-of-stock'}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {arrangement.status === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedArrangement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedArrangement.name}</h2>
                <button
                  onClick={() => setSelectedArrangement(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <img
                src={selectedArrangement.image}
                alt={selectedArrangement.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Price</span>
                  <p className="text-lg font-bold text-gray-900">AED {selectedArrangement.price}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Category</span>
                  <p className="text-gray-900">{selectedArrangement.category}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Stock</span>
                  <p className="text-gray-900">{selectedArrangement.stock} units</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Rating</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span>{selectedArrangement.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="text-sm font-medium text-gray-500">Description</span>
                <p className="text-gray-900 mt-1">{selectedArrangement.description}</p>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-[#8B7355] text-white px-4 py-2 rounded-lg hover:bg-[#6d5a44]">
                  Edit Arrangement
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Duplicate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface FlowerType {
  name: string;
  colors: string[];
  wrappingColors: string[];
}

const flowers: FlowerType[] = [
  {
    name: "ROSE",
    colors: ["PINK", "WHITE", "PEACH", "RED", "ORANGE"],
    wrappingColors: ["PINK", "WHITE", "BROWN", "BLACK", "GOLD", "SILVER"]
  },
  {
    name: "HYDREANGEA",
    colors: ["PINK", "WHITE", "BLUE", "PURPLE", "GREEN"],
    wrappingColors: ["PINK", "WHITE", "BROWN", "BLACK", "GOLD", "SILVER"]
  },
  {
    name: "PEONEY",
    colors: ["PINK", "WHITE", "CORAL", "BURGUNDY"],
    wrappingColors: ["PINK", "WHITE", "BROWN", "BLACK", "GOLD", "SILVER"]
  },
  {
    name: "EUSTOMA",
    colors: ["PINK", "WHITE", "PURPLE", "CHAMPAGNE", "YELLOW"],
    wrappingColors: ["PINK", "WHITE", "BROWN", "BLACK", "GOLD", "SILVER"]
  },
  {
    name: "CARNATION",
    colors: ["PINK", "WHITE", "RED", "PURPLE", "YELLOW"],
    wrappingColors: ["PINK", "WHITE", "BROWN", "BLACK", "GOLD", "SILVER"]
  },
  {
    name: "GREENERY",
    colors: ["GREEN", "SAGE", "DARK GREEN"],
    wrappingColors: ["PINK", "WHITE", "BROWN", "BLACK", "GOLD", "SILVER"]
  }
];

export default function OwnBouquet() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [selectedWrapping, setSelectedWrapping] = useState<Record<string, string>>({});

  const handleQuantityChange = (flowerName: string, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [flowerName]: Math.max(0, value)
    }));
  };

  return (
    <div className="min-h-screen bg-[#e6e2e0] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#4A4A4A]">CREATE YOUR OWN BOUQUET</h1>
          <button className="bg-[#8B7355] text-white px-8 py-3 rounded-lg hover:bg-[#6F5B3E] transition-all">
            ADD TO CART
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header row */}
          <div className="grid grid-cols-4 gap-4 mb-6 border-b border-gray-200 pb-4">
            <div className="text-lg font-semibold text-[#4A4A4A]">ADD FLOWERS</div>
            <div className="text-lg font-semibold text-[#4A4A4A]">ADD QUANTITY</div>
            <div className="text-lg font-semibold text-[#4A4A4A]">CHOOSE COLOR</div>
            <div className="text-lg font-semibold text-[#4A4A4A]">WRAPPING COLOR</div>
          </div>

          {/* Flower rows */}
          {flowers.map((flower) => (
            <div key={flower.name} className="grid grid-cols-4 gap-4 py-6 border-b border-gray-100">
              <div className="flex items-center text-[#4A4A4A] font-medium">
                {flower.name}
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => handleQuantityChange(flower.name, (quantities[flower.name] || 0) - 1)}
                  className="w-10 h-10 flex items-center justify-center bg-[#F5F0EB] hover:bg-[#E8E0D8] text-[#8B7355] rounded-lg transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantities[flower.name] || 0}
                  onChange={(e) => handleQuantityChange(flower.name, parseInt(e.target.value) || 0)}
                  className="w-16 h-10 text-center border border-gray-200 rounded-lg text-[#4A4A4A]"
                  min="0"
                />
                <button 
                  onClick={() => handleQuantityChange(flower.name, (quantities[flower.name] || 0) + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-[#F5F0EB] hover:bg-[#E8E0D8] text-[#8B7355] rounded-lg transition-colors"
                >
                  +
                </button>
              </div>

              <div className="relative">
                <select
                  value={selectedColors[flower.name] || ''}
                  onChange={(e) => setSelectedColors(prev => ({
                    ...prev,
                    [flower.name]: e.target.value
                  }))}
                  className="w-full h-10 pl-4 pr-10 bg-[#F5F0EB] border-2 border-transparent focus:border-[#8B7355] rounded-lg appearance-none text-[#4A4A4A] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!quantities[flower.name]}
                >
                  <option value="">Select color</option>
                  {flower.colors.map(color => (
                    <option key={color} value={color} className="text-[#4A4A4A]">
                      {color}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B7355] pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedWrapping[flower.name] || ''}
                  onChange={(e) => setSelectedWrapping(prev => ({
                    ...prev,
                    [flower.name]: e.target.value
                  }))}
                  className="w-full h-10 pl-4 pr-10 bg-[#F5F0EB] border-2 border-transparent focus:border-[#8B7355] rounded-lg appearance-none text-[#4A4A4A] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!quantities[flower.name]}
                >
                  <option value="">Select wrapping</option>
                  {flower.wrappingColors.map(color => (
                    <option key={color} value={color} className="text-[#4A4A4A]">
                      {color}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B7355] pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

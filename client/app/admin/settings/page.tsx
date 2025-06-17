'use client';

import { useState } from 'react';
import { 
  Building, 
  Globe, 
  Palette, 
  Mail, 
  CreditCard, 
  Save,
  Upload,
  MapPin,
  Phone,
  Clock
} from 'lucide-react';

interface BusinessSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  logo: string;
  operatingHours: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
}

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('business');
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    name: 'Elegant Blooms Floral Studio',
    address: '123 Garden Street, Flower City, FC 12345',
    phone: '+1 (555) 123-BLOOM',
    email: 'hello@elegantblooms.com',
    website: 'www.elegantblooms.com',
    description: 'Creating beautiful floral arrangements for life\'s special moments since 2010. We specialize in weddings, corporate events, and custom arrangements.',
    logo: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=100',
    operatingHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '19:00', closed: false },
      saturday: { open: '08:00', close: '17:00', closed: false },
      sunday: { open: '10:00', close: '16:00', closed: false },
    }
  });

  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    primaryColor: '#8B7355',
    secondaryColor: '#F5F0EB',
    accentColor: '#000000',
    fontFamily: 'Inter'
  });

  const tabs = [
    { id: 'business', name: 'Business Info', icon: Building },
    { id: 'theme', name: 'Theme & Branding', icon: Palette },
    { id: 'payments', name: 'Payment Settings', icon: CreditCard },
    { id: 'email', name: 'Email Templates', icon: Mail },
    { id: 'delivery', name: 'Delivery Options', icon: MapPin },
  ];

  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  const handleBusinessChange = (field: string, value: any) => {
    setBusinessSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHoursChange = (day: string, field: string, value: string | boolean) => {
    setBusinessSettings(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleThemeChange = (field: string, value: string) => {
    setThemeSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your business information, branding, and system preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#8B7355] text-[#8B7355]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Business Information */}
      {activeTab === 'business' && (
        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Business Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your business details and contact information.
              </p>
            </div>
            <div className="p-6 space-y-6">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Logo
                </label>
                <div className="flex items-center space-x-4">
                  <img
                    src={businessSettings.logo}
                    alt="Business Logo"
                    className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                  />
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Logo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessSettings.name}
                    onChange={(e) => handleBusinessChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={businessSettings.phone}
                    onChange={(e) => handleBusinessChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={businessSettings.email}
                    onChange={(e) => handleBusinessChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={businessSettings.website}
                    onChange={(e) => handleBusinessChange('website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Address
                </label>
                <textarea
                  value={businessSettings.address}
                  onChange={(e) => handleBusinessChange('address', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description
                </label>
                <textarea
                  value={businessSettings.description}
                  onChange={(e) => handleBusinessChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Operating Hours</h3>
              <p className="mt-1 text-sm text-gray-500">
                Set your business hours for each day of the week.
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(businessSettings.operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-4">
                    <div className="w-24">
                      <span className="text-sm font-medium text-gray-700">
                        {dayNames[day as keyof typeof dayNames]}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={!hours.closed}
                        onChange={(e) => handleHoursChange(day, 'closed', !e.target.checked)}
                        className="h-4 w-4 text-[#8B7355] focus:ring-[#8B7355] border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-500">Open</span>
                    </div>
                    {!hours.closed && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="time"
                          value={hours.open}
                          onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                        />
                      </div>
                    )}
                    {hours.closed && (
                      <span className="text-sm text-gray-500">Closed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theme & Branding */}
      {activeTab === 'theme' && (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Theme & Branding</h3>
            <p className="mt-1 text-sm text-gray-500">
              Customize your website's appearance and colors.
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={themeSettings.primaryColor}
                    onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeSettings.primaryColor}
                    onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accent Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={themeSettings.accentColor}
                    onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeSettings.accentColor}
                    onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <select
                value={themeSettings.fontFamily}
                onChange={(e) => handleThemeChange('fontFamily', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>

            {/* Color Preview */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Color Preview</h4>
              <div className="flex space-x-4">
                <div
                  className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center"
                  style={{ backgroundColor: themeSettings.primaryColor }}
                >
                  <span className="text-white text-xs font-medium">Primary</span>
                </div>
                <div
                  className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center"
                  style={{ backgroundColor: themeSettings.secondaryColor }}
                >
                  <span className="text-gray-700 text-xs font-medium">Secondary</span>
                </div>
                <div
                  className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center"
                  style={{ backgroundColor: themeSettings.accentColor }}
                >
                  <span className="text-white text-xs font-medium">Accent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs content would go here */}
      {activeTab === 'payments' && (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Payment Settings</h3>
            <p className="mt-1 text-sm text-gray-500">
              Configure your payment gateways and options.
            </p>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Payment Gateway Configuration</h3>
              <p className="mt-1 text-sm text-gray-500">
                Payment gateway integration will be implemented here
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#8B7355] hover:bg-[#6d5a44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B7355]">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { Calendar, DollarSign, Package, Star, Plus, Download, Upload, BarChart3 } from 'lucide-react';

const DashboardContent = ({ totalPackages }) => (
  <div className="space-y-6">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Bookings</p>
            <p className="text-2xl font-bold text-white">1,234</p>
            <p className="text-green-400 text-sm">+12% from last month</p>
          </div>
          <div className="bg-purple-500/20 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>
      <div className="bg-gray-800/50 border border-pink-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Revenue</p>
            <p className="text-2xl font-bold text-white">$89,432</p>
            <p className="text-green-400 text-sm">+8% from last month</p>
          </div>
          <div className="bg-pink-500/20 p-3 rounded-lg">
            <DollarSign className="w-6 h-6 text-pink-400" />
          </div>
        </div>
      </div>
      <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Active Packages</p>
            <p className="text-2xl font-bold text-white">{totalPackages}</p>
            <p className="text-green-400 text-sm">From API</p>
          </div>
          <div className="bg-purple-500/20 p-3 rounded-lg">
            <Package className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>
      <div className="bg-gray-800/50 border border-pink-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Customer Rating</p>
            <p className="text-2xl font-bold text-white">4.8</p>
            <p className="text-green-400 text-sm">Excellent service</p>
          </div>
          <div className="bg-pink-500/20 p-3 rounded-lg">
            <Star className="w-6 h-6 text-pink-400" />
          </div>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
          <Plus className="w-5 h-5 mx-auto mb-2" />
          <span className="text-sm">Add Package</span>
        </button>
        <button className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600 transition-colors">
          <Download className="w-5 h-5 mx-auto mb-2" />
          <span className="text-sm">Export Data</span>
        </button>
        <button className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600 transition-colors">
          <Upload className="w-5 h-5 mx-auto mb-2" />
          <span className="text-sm">Import Data</span>
        </button>
        <button className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600 transition-colors">
          <BarChart3 className="w-5 h-5 mx-auto mb-2" />
          <span className="text-sm">View Reports</span>
        </button>
      </div>
    </div>
  </div>
);

export default DashboardContent;
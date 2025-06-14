import React from 'react';
import { Plus, Edit } from 'lucide-react';

const TrendingContent = ({ trendingDestinations }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-2xl font-bold text-white">Trending Destinations</h2>
      <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
        <Plus className="w-4 h-4 inline mr-2" />
        Add Destination
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {trendingDestinations.map((destination) => (
        <div key={destination.id} className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">{destination.name}</h3>
              <p className="text-gray-400">{destination.country}</p>
            </div>
            <div className="text-right">
              <span className="text-green-400 font-semibold">{destination.growth}</span>
              <p className="text-gray-400 text-sm">growth</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
              <p className="text-purple-400 text-sm">Searches</p>
              <p className="text-white font-semibold">{destination.searches.toLocaleString()}</p>
            </div>
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3">
              <p className="text-pink-400 text-sm">Bookings</p>
              <p className="text-white font-semibold">{destination.bookings}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-sm">
              View Details
            </button>
            <button className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TrendingContent;
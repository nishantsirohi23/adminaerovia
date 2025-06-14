import React from 'react';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

const FormsContent = ({ forms, StatusBadge }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-2xl font-bold text-white">Booking Forms</h2>
      <div className="flex gap-2">
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
          <Plus className="w-4 h-4 inline mr-2" />
          New Form
        </button>
      </div>
    </div>

    <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4 text-gray-300">Customer</th>
              <th className="text-left p-4 text-gray-300">Destination</th>
              <th className="text-left p-4 text-gray-300">Date</th>
              <th className="text-left p-4 text-gray-300">Status</th>
              <th className="text-left p-4 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                <td className="p-4">
                  <div>
                    <p className="text-white font-medium">{form.name}</p>
                    <p className="text-gray-400 text-sm">{form.email}</p>
                  </div>
                </td>
                <td className="p-4 text-gray-300">{form.destination}</td>
                <td className="p-4 text-gray-300">{form.date}</td>
                <td className="p-4">
                  <StatusBadge status={form.status} />
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-400 hover:text-green-300">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default FormsContent;
// Full PackageEditor with Editable All Details (Fully Responsive + Timeline Column Layout)
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PackageEditor = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(`http://192.168.31.61:5003/api/packages/${id}`);
        if (response.data.success) {
          setPackageData(response.data.data);
        } else {
          setError('Package not found.');
        }
      } catch (err) {
        setError('Error fetching package details.');
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  const handleChange = (field, value) => {
    setPackageData({ ...packageData, [field]: value });
  };

  const handleItineraryChange = (dayIdx, key, value) => {
    const newItinerary = [...packageData.itinerary];
    newItinerary[dayIdx][key] = value;
    setPackageData({ ...packageData, itinerary: newItinerary });
  };

  const handleTimelineChange = (dayIdx, itemIdx, key, value) => {
    const newItinerary = [...packageData.itinerary];
    newItinerary[dayIdx].timeline[itemIdx][key] = value;
    setPackageData({ ...packageData, itinerary: newItinerary });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `https://api.perpenny.in/api/packages/edit/${id}`,
        packageData
      );
      alert('Package updated successfully.');
    } catch (err) {
      alert('Failed to update package.');
    }
  };

  if (loading) return <div className="p-4 text-white">Loading package details...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Edit Package: {packageData.title}</h1>

      <div className="grid gap-6 max-w-7xl mx-auto w-full">
        {['title', 'tagline', 'duration', 'landPackageCost'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              value={packageData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Travel Date</label>
          <input
            type="date"
            value={packageData.travelDate?.substring(0, 10)}
            onChange={(e) => handleChange('travelDate', e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Itinerary</label>
          {packageData.itinerary.map((day, dayIdx) => (
            <div key={day._id} className="border border-gray-700 rounded p-4 mb-4">
              <input
                type="text"
                value={day.title}
                onChange={(e) => handleItineraryChange(dayIdx, 'title', e.target.value)}
                className="mb-2 w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
                placeholder="Day Title"
              />
              <input
                type="text"
                value={day.highlight}
                onChange={(e) => handleItineraryChange(dayIdx, 'highlight', e.target.value)}
                className="mb-2 w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
                placeholder="Highlight"
              />
              <div className="text-sm text-gray-300 mb-2">Timeline:</div>
              <div className="flex flex-col gap-4">
                {day.timeline.map((entry, itemIdx) => (
                  <div key={entry._id} className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={entry.time}
                      onChange={(e) => handleTimelineChange(dayIdx, itemIdx, 'time', e.target.value)}
                      className="px-3 py-2 bg-gray-800 border border-gray-600 rounded"
                      placeholder="Time"
                    />
                    <input
                      type="text"
                      value={entry.activity}
                      onChange={(e) => handleTimelineChange(dayIdx, itemIdx, 'activity', e.target.value)}
                      className="px-3 py-2 bg-gray-800 border border-gray-600 rounded"
                      placeholder="Activity"
                    />
                    <input
                      type="text"
                      value={entry.type}
                      onChange={(e) => handleTimelineChange(dayIdx, itemIdx, 'type', e.target.value)}
                      className="px-3 py-2 bg-gray-800 border border-gray-600 rounded"
                      placeholder="Type (e.g., transport)"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Inclusions</label>
          <textarea
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg"
            rows={5}
            value={packageData.inclusions.join('\n')}
            onChange={(e) => handleChange('inclusions', e.target.value.split('\n'))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Exclusions</label>
          <textarea
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg"
            rows={5}
            value={packageData.exclusions.join('\n')}
            onChange={(e) => handleChange('exclusions', e.target.value.split('\n'))}
          />
        </div>

        <button
          className="mt-6 w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
          onClick={handleSave}
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default PackageEditor;

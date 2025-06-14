import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Clock, Tag, Plane, Users, DollarSign, AlertCircle } from 'lucide-react';
import axios from 'axios';

const AddPackage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const initialPackage = {
    title: "",
    tagline: "",
    duration: "",
    noOfAdults: 2,
    travelDate: "",
    citiesCovered: ["Munnar", "Thekkady", "Alleppey", "Kochi"],
    flightDetails: {
      airline: "",
      farePerPerson: "",
      baggage: { checkIn: "", hand: "" },
      flights: []
    },
    hotelDetails: [],
    itinerary: [],
    imageUrls: [],
    landPackageCost: "",
    inclusions: [],
    exclusions: [],
    notes: [],
    termsAndConditions: [],
    cancellationPolicy: [],
    bookingConditions: [],
    additionalNotes: [],
    createdAt: new Date().toISOString()
  };

  const [formData, setFormData] = useState(initialPackage);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Package title is required';
    }
    
    if (!formData.tagline.trim()) {
      newErrors.tagline = 'Tagline is required';
    }
    
    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }
    
    if (!formData.landPackageCost.trim()) {
      newErrors.landPackageCost = 'Package cost is required';
    }
    
    if (!formData.travelDate.trim()) {
      newErrors.travelDate = 'Travel date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const handleArrayChange = (key, value) => {
    setFormData({ ...formData, [key]: value.split('\n') });
  };

  const handleAddItineraryDay = () => {
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        {
          day: formData.itinerary.length + 1,
          title: "",
          highlight: "",
          icon: "",
          timeline: []
        }
      ]
    });
  };

  const handleAddTimelineItem = (dayIdx) => {
    const updated = [...formData.itinerary];
    updated[dayIdx].timeline.push({ time: "", activity: "", type: "" });
    setFormData({ ...formData, itinerary: updated });
  };

  const handleTimelineChange = (dayIdx, itemIdx, key, value) => {
    const updated = [...formData.itinerary];
    updated[dayIdx].timeline[itemIdx][key] = value;
    setFormData({ ...formData, itinerary: updated });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    try {
      // Simulating API call since axios is not available
      await axios.post('http://192.168.31.61:5003/api/packages', formData);
      setMessage('Package added successfully.');
      setFormData(initialPackage);
      setErrors({});
    } catch (error) {
      setMessage('Error adding package.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Add New Package</h1>
              <p className="text-slate-300 mt-1">Create a beautiful travel package for your customers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Basic Information Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Basic Information</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Package Title *</label>
              <input 
                className={`w-full bg-white/10 backdrop-blur-sm p-4 rounded-xl border ${errors.title ? 'border-red-500/50' : 'border-white/20'} text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`} 
                placeholder="Kerala Paradise Tour" 
                value={formData.title} 
                onChange={e => handleChange('title', e.target.value)} 
              />
              {errors.title && (
                <div className="flex items-center text-red-400 text-xs mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Tagline *</label>
              <input 
                className={`w-full bg-white/10 backdrop-blur-sm p-4 rounded-xl border ${errors.tagline ? 'border-red-500/50' : 'border-white/20'} text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`} 
                placeholder="God's Own Country Awaits" 
                value={formData.tagline} 
                onChange={e => handleChange('tagline', e.target.value)} 
              />
              {errors.tagline && (
                <div className="flex items-center text-red-400 text-xs mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.tagline}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Duration *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  className={`w-full bg-white/10 backdrop-blur-sm p-4 pl-12 rounded-xl border ${errors.duration ? 'border-red-500/50' : 'border-white/20'} text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`} 
                  placeholder="7 Days 6 Nights" 
                  value={formData.duration} 
                  onChange={e => handleChange('duration', e.target.value)} 
                />
              </div>
              {errors.duration && (
                <div className="flex items-center text-red-400 text-xs mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.duration}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Land Package Cost *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  className={`w-full bg-white/10 backdrop-blur-sm p-4 pl-12 rounded-xl border ${errors.landPackageCost ? 'border-red-500/50' : 'border-white/20'} text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`} 
                  placeholder="₹25,000" 
                  value={formData.landPackageCost} 
                  onChange={e => handleChange('landPackageCost', e.target.value)} 
                />
              </div>
              {errors.landPackageCost && (
                <div className="flex items-center text-red-400 text-xs mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.landPackageCost}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Travel Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="date" 
                  className={`w-full bg-white/10 backdrop-blur-sm p-4 pl-12 rounded-xl border ${errors.travelDate ? 'border-red-500/50' : 'border-white/20'} text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`} 
                  value={formData.travelDate} 
                  onChange={e => handleChange('travelDate', e.target.value)} 
                />
              </div>
              {errors.travelDate && (
                <div className="flex items-center text-red-400 text-xs mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.travelDate}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Itinerary Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Itinerary</h2>
            </div>
            <button 
              onClick={handleAddItineraryDay} 
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-lg text-white font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Day</span>
            </button>
          </div>
          
          <div className="space-y-6">
            {formData.itinerary.map((day, dayIdx) => (
              <div key={dayIdx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {day.day}
                  </div>
                  <h3 className="text-lg font-medium text-white">Day {day.day}</h3>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Day Title</label>
                    <input 
                      className="w-full bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      placeholder="Arrival in Munnar" 
                      value={day.title} 
                      onChange={(e) => { 
                        const updated = [...formData.itinerary]; 
                        updated[dayIdx].title = e.target.value; 
                        setFormData({ ...formData, itinerary: updated }); 
                      }} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Highlight</label>
                    <input 
                      className="w-full bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      placeholder="Tea Gardens Visit" 
                      value={day.highlight} 
                      onChange={(e) => { 
                        const updated = [...formData.itinerary]; 
                        updated[dayIdx].highlight = e.target.value; 
                        setFormData({ ...formData, itinerary: updated }); 
                      }} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Icon</label>
                    <input 
                      className="w-full bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      placeholder="sightseeing" 
                      value={day.icon} 
                      onChange={(e) => { 
                        const updated = [...formData.itinerary]; 
                        updated[dayIdx].icon = e.target.value; 
                        setFormData({ ...formData, itinerary: updated }); 
                      }} 
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-slate-300">Timeline</h4>
                    <button 
                      onClick={() => handleAddTimelineItem(dayIdx)} 
                      className="flex items-center space-x-1 bg-blue-500/20 px-3 py-1.5 rounded-lg text-blue-300 text-sm hover:bg-blue-500/30 transition-all duration-200"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Timeline</span>
                    </button>
                  </div>
                  
                  {day.timeline.map((item, itemIdx) => (
                    <div key={itemIdx} className="grid gap-3 md:grid-cols-3 p-3 bg-white/5 rounded-lg">
                      <input 
                        className="w-full bg-white/10 backdrop-blur-sm p-2 rounded border border-white/20 text-white placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                        placeholder="09:00 AM" 
                        value={item.time} 
                        onChange={(e) => handleTimelineChange(dayIdx, itemIdx, 'time', e.target.value)} 
                      />
                      <input 
                        className="w-full bg-white/10 backdrop-blur-sm p-2 rounded border border-white/20 text-white placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                        placeholder="Check-in at hotel" 
                        value={item.activity} 
                        onChange={(e) => handleTimelineChange(dayIdx, itemIdx, 'activity', e.target.value)} 
                      />
                      <input 
                        className="w-full bg-white/10 backdrop-blur-sm p-2 rounded border border-white/20 text-white placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                        placeholder="hotel" 
                        value={item.type} 
                        onChange={(e) => handleTimelineChange(dayIdx, itemIdx, 'type', e.target.value)} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Inclusions</h2>
            </div>
            <textarea 
              rows={8} 
              className="w-full bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none" 
              placeholder="• Accommodation in 3-star hotels&#10;• Daily breakfast&#10;• Airport transfers&#10;• Sightseeing as per itinerary&#10;• Professional tour guide" 
              value={formData.inclusions.join('\n')} 
              onChange={(e) => handleArrayChange('inclusions', e.target.value)} 
            />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Exclusions</h2>
            </div>
            <textarea 
              rows={8} 
              className="w-full bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none" 
              placeholder="• International flights&#10;• Personal expenses&#10;• Travel insurance&#10;• Meals not mentioned&#10;• Tips and gratuities" 
              value={formData.exclusions.join('\n')} 
              onChange={(e) => handleArrayChange('exclusions', e.target.value)} 
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleSubmit} 
            disabled={submitting} 
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {submitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Submit Package</span>
              </div>
            )}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`mt-6 p-4 ${message.includes('success') ? 'bg-green-500/20 border-green-500/30' : 'bg-red-500/20 border-red-500/30'} border rounded-xl text-center`}>
            <p className={`${message.includes('success') ? 'text-green-300' : 'text-red-300'} font-medium`}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPackage;
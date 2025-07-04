import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  Package, 
  TrendingUp, 
  Settings, 
  Users, 
  BarChart3,
  Bell,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  Loader
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Packages state
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPackages, setTotalPackages] = useState(0);
  const [packageSearch, setPackageSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const itemsPerPage = 50;

  // Forms state
  const [forms, setForms] = useState([]);
  const [formsLoading, setFormsLoading] = useState(false);
  const [formsError, setFormsError] = useState(null);

  const trendingDestinations = [
    { id: 1, name: 'Bali', country: 'Indonesia', growth: '+45%', searches: 12500, bookings: 890 },
    { id: 2, name: 'Santorini', country: 'Greece', growth: '+32%', searches: 9800, bookings: 567 },
    { id: 3, name: 'Dubai', country: 'UAE', growth: '+28%', searches: 11200, bookings: 743 },
    { id: 4, name: 'Maldives', country: 'Maldives', growth: '+55%', searches: 8900, bookings: 456 },
  ];

  // Fetch packages from API
  const fetchPackages = async (page = 1, search = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
      const url = `https://api.perpenny.in/api/packages?page=${page}&limit=${itemsPerPage}${searchParam}`;
      
      console.log('Fetching packages from:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.success && data.data && Array.isArray(data.data)) {
        setPackages(data.data);
        setTotalPackages(data.total || 0);
        setTotalPages(Math.ceil((data.total || 0) / itemsPerPage));
      } else {
        console.error('Unexpected API response structure:', data);
        setPackages([]);
        setTotalPackages(0);
        setTotalPages(1);
      }
      
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError(err.message);
      setPackages([]);
      setTotalPackages(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Fetch forms from API
  const fetchForms = async () => {
    setFormsLoading(true);
    setFormsError(null);
    
    try {
      const response = await fetch('https://api.perpenny.in/api/queryform');
      if (!response.ok) {
        throw new Error('Failed to fetch forms');
      }
      const data = await response.json();
      // Sort forms by createdAt date (newest first)
      const sortedForms = data.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setForms(sortedForms);
    } catch (err) {
      setFormsError(err.message);
    } finally {
      setFormsLoading(false);
    }
  };

  // Fetch data when tab changes
  useEffect(() => {
    if (activeTab === 'packages') {
      fetchPackages(currentPage, packageSearch);
    } else if (activeTab === 'forms') {
      fetchForms();
    }
  }, [activeTab, currentPage, packageSearch]);

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput !== packageSearch) {
        setPackageSearch(searchInput);
        setCurrentPage(1); // Reset to first page when searching
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput, packageSearch]);

  const sidebarItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'forms', icon: FileText, label: 'Booking Forms' },
    { id: 'packages', icon: Package, label: 'Packages' },
    { id: 'trending', icon: TrendingUp, label: 'Trending Destinations' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const StatusBadge = ({ status }) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      confirmed: 'bg-green-500/20 text-green-300 border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
      active: 'bg-green-500/20 text-green-300 border-green-500/30',
      inactive: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${colors[status] || colors.inactive}`}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
      </span>
    );
  };

  const DashboardContent = () => (
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

  const FormsContent = () => {
    // Refresh forms function
    const refreshForms = () => {
      fetchForms();
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-white">Booking Forms</h2>
          <div className="flex gap-2">
            <button 
              onClick={refreshForms}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Download className="w-4 h-4 inline mr-2" />
              Refresh
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
              <Plus className="w-4 h-4 inline mr-2" />
              New Form
            </button>
          </div>
        </div>

        {/* Loading State */}
        {formsLoading && (
          <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 text-gray-300">Customer</th>
                    <th className="text-left p-4 text-gray-300">Destination</th>
                    <th className="text-left p-4 text-gray-300">Date</th>
                    <th className="text-left p-4 text-gray-300">Travellers</th>
                    <th className="text-left p-4 text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(3)].map((_, i) => (
                    <tr key={i} className="border-b border-gray-700/50">
                      <td className="p-4">
                        <div className="animate-pulse">
                          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="animate-pulse h-4 bg-gray-700 rounded w-1/2"></div>
                      </td>
                      <td className="p-4">
                        <div className="animate-pulse h-4 bg-gray-700 rounded w-1/2"></div>
                      </td>
                      <td className="p-4">
                        <div className="animate-pulse h-4 bg-gray-700 rounded w-1/2"></div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 animate-pulse">
                          <div className="h-6 w-6 bg-gray-700 rounded"></div>
                          <div className="h-6 w-6 bg-gray-700 rounded"></div>
                          <div className="h-6 w-6 bg-gray-700 rounded"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Error State */}
        {formsError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-red-400">Error loading forms: {formsError}</p>
            <button 
              onClick={refreshForms}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success State */}
        {!formsLoading && !formsError && (
          <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 text-gray-300">Customer</th>
                    <th className="text-left p-4 text-gray-300">Destination</th>
                    <th className="text-left p-4 text-gray-300">Date</th>
                    <th className="text-left p-4 text-gray-300">Travellers</th>
                    <th className="text-left p-4 text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {forms.length > 0 ? (
                    forms.map((form) => (
                      <tr key={form._id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                        <td className="p-4">
                          <div>
                            <p className="text-white font-medium">{form.name}</p>
                            <p className="text-gray-400 text-sm">{form.email}</p>
                            <p className="text-gray-400 text-sm">{form.mobile}</p>
                          </div>
                        </td>
                        <td className="p-4 text-gray-300">{form.destination}</td>
                        <td className="p-4 text-gray-300">
                          {new Date(form.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="p-4 text-gray-300">{form.numberOfTravellers}</td>
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-400">
                        No forms found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const PackagesContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Travel Packagessss</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => fetchPackages(currentPage, packageSearch)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Download className="w-4 h-4 inline mr-2" />
            Refresh
          </button>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
            <Plus className="w-4 h-4 inline mr-2" />
            Add Package
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2 text-gray-400">
            <Loader className="w-5 h-5 animate-spin" />
            <span>Loading packages...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-400">Error loading packages: {error}</p>
          <button 
            onClick={() => fetchPackages(currentPage, packageSearch)}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Packages Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg._id} className="bg-gray-800/50 border border-purple-500/20 rounded-xl overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  {pkg.imageUrls && pkg.imageUrls.length > 0 ? (
                    <img src={pkg.imageUrls[0]} alt={pkg.title} className="w-full h-full object-cover" />
                  ) : (
                    <MapPin className="w-12 h-12 text-purple-400" />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{pkg.title || 'Unnamed Package'}</h3>
                    <StatusBadge status={pkg.status || 'active'} />
                  </div>
                  <p className="text-2xl font-bold text-purple-400 mb-2">
                    {pkg.landPackageCost || 'Price not specified'}
                  </p>
                  <p className="text-gray-400 mb-4">{pkg.duration || 'Duration not specified'}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white">4.5</span> {/* Rating not in API, using default */}
                    </div>
                    <span className="text-gray-400">{pkg.noOfAdults || 2} adults</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                      <Edit className="w-4 h-4 inline mr-2" />
                      Edit
                    </button>
                    <button className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-gray-800/50 border border-purple-500/20 rounded-xl p-4">
              <div className="text-gray-400 text-sm">
                Showing {packages.length} of {totalPackages} packages
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* No Results */}
          {packages.length === 0 && !loading && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No packages found</p>
              {packageSearch && (
                <p className="text-gray-500 text-sm mt-2">
                  Try adjusting your search terms
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  const TrendingContent = () => (
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'forms':
        return <FormsContent />;
      case 'packages':
        return <PackagesContent />;
      case 'trending':
        return <TrendingContent />;
        case 'users':
          return <TrendingContent />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">Content for {activeTab} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Aerovia Holidays
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transition-transform duration-300 ease-in-out`}>
          
          {/* Logo */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Aerovia Holidays
            </h1>
            <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Top Bar */}
          <div className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <button className="text-gray-400 hover:text-white">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-white relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">A</span>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
import React from 'react';
import { Download, Plus, Search, Loader, ChevronLeft, ChevronRight, MapPin, Edit, Eye, Star } from 'lucide-react';

const PackagesContent = ({
  packages,
  loading,
  error,
  fetchPackages,
  currentPage,
  totalPages,
  totalPackages,
  packageSearch,
  searchInput,
  setSearchInput,
  setCurrentPage,
  StatusBadge,
}) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-2xl font-bold text-white">Travel Packages</h2>
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
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
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
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No packages found</p>
            {packageSearch && (
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms</p>
            )}
          </div>
        )}
      </>
    )}
  </div>
);

export default PackagesContent;
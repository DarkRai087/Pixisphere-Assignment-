'use client';
//

import React, { useEffect } from 'react';
import { usePhotographer } from '@/context/PhotographerContext';
import PhotographerCard from '@/components/PhotographerCard';
import Filters from '@/components/Filters';
import SearchBar from '@/components/SearchBar';
import SkeletonCard from '@/components/SkeletonCard';
import { Camera, Filter } from 'lucide-react';

function CategoryListingPage() {
  const { state, dispatch } = usePhotographer();
  const { photographers, filteredPhotographers, loading, filters, currentPage, itemsPerPage } = state;

  useEffect(() => {
    let filtered = [...photographers];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    filtered = filtered.filter(p => p.price <= filters.priceRange[1]);

    if (filters.minRating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.minRating);
    }

    if (filters.styles.length > 0) {
      filtered = filtered.filter(p => 
        filters.styles.some(style => p.styles.includes(style))
      );
    }

    if (filters.city) {
      filtered = filtered.filter(p => p.location === filters.city);
    }

    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }

    dispatch({ type: 'SET_FILTERED_PHOTOGRAPHERS', payload: filtered });
  }, [photographers, filters, dispatch]);

  const paginatedPhotographers = filteredPhotographers.slice(0, currentPage * itemsPerPage);
  const hasMore = filteredPhotographers.length > currentPage * itemsPerPage;

  const loadMore = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Maternity Photographers in India</h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <Camera className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm text-blue-800">
                💡 <strong>AI Suggestion:</strong> Top-rated outdoor maternity photographers in Bengaluru are available this month
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <SearchBar />
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_FILTERS' })}
              className="lg:hidden flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex">
          <div className="hidden lg:block">
            <Filters />
          </div>
          
          {state.showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" 
                 onClick={() => dispatch({ type: 'TOGGLE_FILTERS' })} />
          )}
          <Filters />

          <div className="flex-1 lg:ml-8">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredPhotographers.length} photographer{filteredPhotographers.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedPhotographers.map(photographer => (
                <PhotographerCard key={photographer.id} photographer={photographer} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load More Photographers
                </button>
              </div>
            )}

            {filteredPhotographers.length === 0 && !loading && (
              <div className="text-center py-12">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No photographers found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryListingPage;
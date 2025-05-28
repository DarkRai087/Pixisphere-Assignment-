import React from 'react';
import { usePhotographer } from '@/context/PhotographerContext';
import { X, Star } from 'lucide-react';

function Filters() {
  const { state, dispatch } = usePhotographer();
  const { filters, photographers } = state;

  const cities = [...new Set(photographers.map(p => p.location))];
  const allStyles = [...new Set(photographers.flatMap(p => p.styles))];

  const handleStyleChange = (style: string) => {
    const newStyles = filters.styles.includes(style)
      ? filters.styles.filter(s => s !== style)
      : [...filters.styles, style];
    dispatch({ type: 'SET_FILTERS', payload: { styles: newStyles } });
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:shadow-none lg:bg-gray-50 lg:w-64 ${
      state.showFilters ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="p-6 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_FILTERS' })}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
            <input
              type="range"
              min="0"
              max="20000"
              step="1000"
              value={filters.priceRange[1]}
              onChange={(e) => dispatch({ 
                type: 'SET_FILTERS', 
                payload: { priceRange: [0, parseInt(e.target.value)] }
              })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>₹0</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={filters.minRating === rating}
                    onChange={(e) => dispatch({ 
                      type: 'SET_FILTERS', 
                      payload: { minRating: parseInt(e.target.value) }
                    })}
                    className="mr-2"
                  />
                  <div className="flex items-center">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-1 text-sm">& up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Photography Styles</h3>
            <div className="space-y-2">
              {allStyles.map(style => (
                <label key={style} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.styles.includes(style)}
                    onChange={() => handleStyleChange(style)}
                    className="mr-2 rounded"
                  />
                  <span className="text-sm">{style}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">City</h3>
            <select
              value={filters.city}
              onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { city: e.target.value } })}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Sort By</h3>
            <select
              value={filters.sortBy}
              onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { sortBy: e.target.value } })}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="rating">Rating: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
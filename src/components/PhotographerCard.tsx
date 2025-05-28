import React from 'react';
import { usePhotographer } from '@/context/PhotographerContext';
import { Star, MapPin } from 'lucide-react';

interface Photographer {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  bio: string;
  profilePic: string;
  portfolio: string[];
  reviews: { name: string; rating: number; comment: string; date: string }[];
  createdAt: string;
}

interface Props {
  photographer: Photographer;
}

function PhotographerCard({ photographer }: Props) {
  const { dispatch } = usePhotographer();

  const handleViewProfile = () => {
    dispatch({ type: 'SET_SELECTED_PHOTOGRAPHER', payload: photographer });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        <img
          src={photographer.profilePic}
          alt={photographer.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
          {photographer.rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{photographer.name}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {photographer.location}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {photographer.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">₹{photographer.price.toLocaleString()}</span>
          <button
            onClick={handleViewProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhotographerCard;
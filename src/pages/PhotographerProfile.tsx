import React from 'react';
import { usePhotographer } from '@/context/PhotographerContext';
import Gallery from '@/components/Gallery';
import InquiryForm from '@/components/InquiryForm';
import { ChevronLeft, MapPin, Star, Send } from 'lucide-react';
import Image from 'next/image';

function PhotographerProfile() {
  const { state, dispatch } = usePhotographer();
  const { selectedPhotographer } = state;

  if (!selectedPhotographer) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => dispatch({ type: 'SET_SELECTED_PHOTOGRAPHER', payload: null })}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Photographers
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="text-center mb-6">
                <Image
                  src={selectedPhotographer.profilePic}
                  alt={selectedPhotographer.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  width={500}
                  height={500}
                />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedPhotographer.name}
                </h1>
                <div className="flex items-center justify-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {selectedPhotographer.location}
                </div>
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-lg font-semibold">{selectedPhotographer.rating}</span>
                  <span className="text-gray-600 ml-1">
                    ({selectedPhotographer.reviews.length} review{selectedPhotographer.reviews.length !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Starting Price</h3>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{selectedPhotographer.price.toLocaleString()}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Photography Styles</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPhotographer.styles.map((style, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPhotographer.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => dispatch({ type: 'TOGGLE_INQUIRY_FORM' })}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{selectedPhotographer.bio}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h2>
              <Gallery images={selectedPhotographer.portfolio} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Reviews ({selectedPhotographer.reviews.length})
              </h2>
              
              <div className="space-y-4">
                {selectedPhotographer.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(review.date)}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <InquiryForm />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {}, // Pass any required props here
  };
}

export default PhotographerProfile;
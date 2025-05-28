'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
}

function Gallery({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Portfolio ${currentIndex + 1}`}
          className="w-full h-64 object-cover"
        />
      </div>
      
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
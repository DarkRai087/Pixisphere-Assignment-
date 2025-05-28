'use client';

import React from 'react';
import { PhotographerProvider } from '@/context/PhotographerContext';
import CategoryListingPage from '@/pages/CategoryListingPage';
import PhotographerProfile from '@/pages/PhotographerProfile';
import { usePhotographer } from '@/context/PhotographerContext';

function App() {
  const { state } = usePhotographer();

  return (
    <div className="min-h-screen">
      {state.selectedPhotographer ? <PhotographerProfile /> : <CategoryListingPage />}
    </div>
  );
}

export default function Page() {
  return (
    <PhotographerProvider>
      <App />
    </PhotographerProvider>
  );
}
'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { mockPhotographers } from '@/data/mockPhotographers';

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

interface State {
  photographers: Photographer[];
  filteredPhotographers: Photographer[];
  loading: boolean;
  selectedPhotographer: Photographer | null;
  filters: {
    search: string;
    priceRange: [number, number];
    minRating: number;
    styles: string[];
    city: string;
    sortBy: string;
  };
  showFilters: boolean;
  showInquiryForm: boolean;
  currentPage: number;
  itemsPerPage: number;
}

interface Action {
  type: string;
  payload?: Photographer[] | Photographer | { [key: string]: unknown } | number | null;
}

const PhotographerContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

const initialState: State = {
  photographers: [],
  filteredPhotographers: [],
  loading: true,
  selectedPhotographer: null,
  filters: {
    search: '',
    priceRange: [0, 20000],
    minRating: 0,
    styles: [],
    city: '',
    sortBy: 'rating'
  },
  showFilters: false,
  showInquiryForm: false,
  currentPage: 1,
  itemsPerPage: 6
};

function photographerReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_PHOTOGRAPHERS':
      return {
        ...state,
        photographers: action.payload as Photographer[],
        filteredPhotographers: action.payload as Photographer[],
        loading: false,
      };
    case 'SET_FILTERED_PHOTOGRAPHERS':
      return {
        ...state,
        filteredPhotographers: action.payload as Photographer[],
      };
    case 'SET_SELECTED_PHOTOGRAPHER':
      return {
        ...state,
        selectedPhotographer: action.payload as Photographer | null,
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...(action.payload as { [key: string]: unknown }) },
      };
    case 'TOGGLE_FILTERS':
      return {
        ...state,
        showFilters: !state.showFilters
      };
    case 'TOGGLE_INQUIRY_FORM':
      return {
        ...state,
        showInquiryForm: !state.showInquiryForm
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload as number,
      };
    default:
      return state;
  }
}

function PhotographerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(photographerReducer, initialState);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'SET_PHOTOGRAPHERS', payload: mockPhotographers });
    }, 1000);
  }, []);

  return (
    <PhotographerContext.Provider value={{ state, dispatch }}>
      {children}
    </PhotographerContext.Provider>
  );
}

function usePhotographer() {
  const context = useContext(PhotographerContext);
  if (!context) {
    throw new Error('usePhotographer must be used within PhotographerProvider');
  }
  return context;
}

export { PhotographerProvider, usePhotographer };
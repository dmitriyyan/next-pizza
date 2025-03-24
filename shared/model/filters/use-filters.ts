'use client';
import { FilterContext } from './filter-context';
import React from 'react';

export const useFilters = () => {
  const context = React.useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterContext');
  }
  return context;
};

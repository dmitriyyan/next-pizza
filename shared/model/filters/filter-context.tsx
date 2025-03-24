'use client';

import React from 'react';
import { useFiltersData } from './use-filters-data';
import { PriceProps } from './types';
import { Filters } from './types';

type FilterContextType = {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
  setFilter: (name: keyof Filters, value: string) => void;
  updatePrices: (prices: number[]) => void;
  setPrices: (name: keyof PriceProps, value: number) => void;
};

export const FilterContext = React.createContext<FilterContextType>({
  sizes: new Set(),
  pizzaTypes: new Set(),
  selectedIngredients: new Set(),
  prices: { priceFrom: 0, priceTo: 0 },
  setPrices: () => {},
  updatePrices: () => {},
  setFilter: () => {},
});

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    pizzaTypes,
    sizes,
    prices,
    selectedIngredients,
    setPizzaTypes,
    setSizes,
    setSelectedIngredients,
    updatePrices,
    setPrices,
  } = useFiltersData();

  const setFilter = React.useCallback(
    (name: keyof Filters, value: string) => {
      if (name === 'pizzaTypes') {
        setPizzaTypes(value);
      }

      if (name === 'sizes') {
        setSizes(value);
      }

      if (name === 'selectedIngredients') {
        setSelectedIngredients(value);
      }
    },
    [setPizzaTypes, setSizes, setSelectedIngredients],
  );

  const value = React.useMemo(
    () => ({
      pizzaTypes,
      sizes,
      prices,
      selectedIngredients,
      setFilter,
      updatePrices,
      setPrices,
    }),
    [
      pizzaTypes,
      sizes,
      prices,
      selectedIngredients,
      setFilter,
      updatePrices,
      setPrices,
    ],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

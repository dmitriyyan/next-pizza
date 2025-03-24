import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import React from 'react';
import { useQueryFilters } from './use-query-filters';
import { PriceProps, QueryFilters, ReturnProps } from './types';

export const useFiltersData = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',')),
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : [],
    ),
  );

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has('pizzaTypes')
        ? searchParams.get('pizzaTypes')?.split(',')
        : [],
    ),
  );

  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const filters = React.useMemo(() => {
    return {
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
    };
  }, [sizes, pizzaTypes, selectedIngredients, prices]);

  useQueryFilters(filters);

  const updatePrice = React.useCallback(
    (name: keyof PriceProps, value: number) => {
      setPrices((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setPrices],
  );

  const updatePrices = React.useCallback(
    (prices: number[]) => {
      updatePrice('priceFrom', prices[0]);
      updatePrice('priceTo', prices[1]);
    },
    [updatePrice],
  );

  return React.useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPrices: updatePrice,
      updatePrices,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }),
    [
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      updatePrice,
      toggleIngredients,
      togglePizzaTypes,
      toggleSizes,
      updatePrices,
    ],
  );
};

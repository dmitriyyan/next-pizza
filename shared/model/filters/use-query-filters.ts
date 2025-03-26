import React from 'react';
import { Filters } from './types';
import qs from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();
  const prevQuery = React.useRef('');

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });

      if (prevQuery.current !== query) {
        prevQuery.current = query;
        router.push(`?${query}`, {
          scroll: false,
        });
      }
    }

    isMounted.current = true;
  }, [filters, router]);
};

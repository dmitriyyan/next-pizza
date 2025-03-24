import React from 'react';
import { Filters } from './types';
import qs from 'qs';
import { usePathname, useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
  const pathname = usePathname();
  const isMounted = React.useRef(false);
  const router = useRouter();
  const prevFullPath = React.useRef('');

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

      const fullPath = `${pathname}?${query}`;

      if (prevFullPath.current !== fullPath) {
        prevFullPath.current = fullPath;
        router.push(fullPath, {
          scroll: false,
        });
      }
    }

    isMounted.current = true;
  }, [filters, router, pathname]);
};

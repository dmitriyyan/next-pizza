import { Product } from '@prisma/client';
import { api } from './instance';
import { ApiRoutes } from './constants';

export const search = async (query: string) => {
  return (
    await api.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
      searchParams: { query },
    })
  ).json();
};

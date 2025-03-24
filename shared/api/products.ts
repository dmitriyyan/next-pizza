import { Product } from '@prisma/client';
import { api } from './instance';
import { ApiRoutes } from './constants';

export const searchProducts = async (query: string) => {
  const response = await api.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
    searchParams: { query },
  });

  return response.json();
};

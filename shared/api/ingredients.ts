import { Ingredient } from '@prisma/client';
import { ApiRoutes } from './constants';
import { api } from './instance';

export async function getIngredients() {
  const response = await api.get<Ingredient[]>(ApiRoutes.INGREDIENTS);
  return response.json();
}

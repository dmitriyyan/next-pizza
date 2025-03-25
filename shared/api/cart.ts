import { ApiRoutes } from './constants';
import { CartDTO, CreateCartItemValues } from './dto';
import { api } from './instance';

export const getCart = async (): Promise<CartDTO> => {
  const response = await api.get<CartDTO>(ApiRoutes.CART);

  return response.json();
};

export const updateItemQuantity = async (
  itemId: number,
  quantity: number,
): Promise<CartDTO> => {
  const response = await api.patch<CartDTO>(`${ApiRoutes.CART}/${itemId}`, {
    json: { quantity },
  });

  return response.json();
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const response = await api.delete<CartDTO>(`${ApiRoutes.CART}/${id}`);

  return response.json();
};

export const addCartItem = async (
  values: CreateCartItemValues,
): Promise<CartDTO> => {
  const response = await api.post<CartDTO>(ApiRoutes.CART, {
    json: values,
  });

  return response.json();
};

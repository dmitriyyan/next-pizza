import React from 'react';
import { useCartStore } from '@/shared/store/cart';
import { CreateCartItemValues } from '@/shared/api/dto';
import { CartStateItem } from '@/shared/model/cart';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const {
    items,
    totalAmount,
    loading,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
  } = useCartStore((state) => state);

  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return {
    items,
    totalAmount,
    loading,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
  };
};

'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { ProductWithRelations } from '@/shared/model/product-with-relations';
import { ChoosePizzaForm } from './ui/choose-pizza-form';
import { ChooseProductForm } from './ui/choose-product-form';
import { useCartStore } from '@/shared/store/cart';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit }) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const handleSubmit = async (
    productItemId?: number,
    ingredients?: number[],
  ) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(product.name + ' добавлена в корзину');

      onSubmit?.();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={handleSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={handleSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};

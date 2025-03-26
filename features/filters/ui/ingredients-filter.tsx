'use client';
import React from 'react';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useIngredients } from '../api/use-ingredients';
import { Skeleton } from '@/shared/ui/skeleton';
export const IngredientsFilter = () => {
  const { ingredients, loading } = useIngredients();

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  if (loading) {
    return (
      <div className="mt-5">
        <p className="font-bold mb-3">Ингредиенты</p>

        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
          ))}

        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-5 text-red-500">
        <p className="font-bold mb-2">Произошла ошибка</p>
        <p>
          Не удалось загрузить список ингредиентов. Пожалуйста, попробуйте
          обновить страницу.
        </p>
      </div>
    );
  }

  return (
    <CheckboxFiltersGroup
      title="Ингредиенты"
      name="selectedIngredients"
      className="mt-5"
      limit={6}
      defaultItems={items.slice(0, 6)}
      items={items}
    />
  );
};

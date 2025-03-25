import React from 'react';
import { useSet } from 'react-use';
import { ProductItem } from '@prisma/client';
import {
  PizzaSizeVariant,
  PizzaType,
  PizzaTypeVariant,
  pizzaSizes,
  pizzaTypes,
} from './types';

interface ReturnProps {
  size: PizzaSizeVariant;
  type: PizzaTypeVariant;
  selectedIngredients: Set<number>;
  availableSizes: PizzaSizeVariant[];
  currentItemId?: number;
  setSize: (size: PizzaSizeVariant) => void;
  setType: (size: PizzaTypeVariant) => void;
  addIngredient: (id: number) => void;
}

export const getAvailablePizzaSizes = (
  type: PizzaType,
  items: ProductItem[],
) => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value),
    ),
  }));
};

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSizeVariant>(pizzaSizes[0]);
  const [type, setType] = React.useState<PizzaTypeVariant>(pizzaTypes[0]);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([]),
  );

  const availableSizes = getAvailablePizzaSizes(type.value, items);

  const currentItemId = items.find(
    (item) => item.pizzaType === type.value && item.size === size.value,
  )?.id;

  React.useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size.value && !item.disabled,
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(availableSize);
    }
  }, [type, availableSizes, size]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};

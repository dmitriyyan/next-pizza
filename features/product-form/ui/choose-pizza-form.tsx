'use client';

import React from 'react';
import { Ingredient, ProductItem } from '@prisma/client';

import { cn } from '@/shared/lib/utils';
import { PizzaImage } from './pizza-image';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { GroupVariants } from './group-variants';
import { IngredientItem } from './ingredient-item';
import {
  usePizzaOptions,
  PizzaSize,
  PizzaSizeVariant,
  PizzaType,
  pizzaTypes,
  PizzaTypeVariant,
} from '@/shared/model/pizza-option';

type Props = {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
};

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};

export const getPizzaDetails = (
  type: PizzaTypeVariant,
  size: PizzaSizeVariant,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = calcTotalPizzaPrice(
    type.value,
    size.value,
    items,
    ingredients,
    selectedIngredients,
  );
  const textDetails = `${size.value} см, ${type.name} пицца`;

  return { totalPrice, textDetails };
};

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { totalPrice, textDetails } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, 'flex w-full')}>
      <PizzaImage imageUrl={imageUrl} size={size.value} />

      <div className="bg-[#f7f6f5] p-3 md:p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-3 md:mt-5">
          <GroupVariants
            items={availableSizes}
            selected={size}
            onClick={setSize}
          />

          <GroupVariants items={pizzaTypes} selected={type} onClick={setType} />
        </div>

        <div className="bg-gray-50 p-1 md:p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5 md:mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

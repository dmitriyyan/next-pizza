import { CartStateItem } from '@/shared/model/cart';
import {
  mapPizzaType,
  PizzaSize,
  PizzaType,
} from '@/shared/model/pizza-option';

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  pizzaType?: PizzaType | null,
  pizzaSize?: PizzaSize | null,
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    details.push(`${mapPizzaType[pizzaType]} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
};

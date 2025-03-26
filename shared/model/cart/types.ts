import { PizzaSize, PizzaType } from '../pizza-option';

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: PizzaSize | null;
  pizzaType?: PizzaType | null;
  ingredients: Array<{ name: string; price: number }>;
};

export type CartItemProps = {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
};

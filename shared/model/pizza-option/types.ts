const pizzaSize = {
  Маленькая: 20,
  Средняя: 30,
  Большая: 40,
} as const;

const pizzaType = {
  Традиционная: 1,
  Тонкая: 2,
} as const;

export const mapPizzaType: Record<PizzaType, PizzaTypeName> = {
  [pizzaType.Традиционная]: 'Традиционная',
  [pizzaType.Тонкая]: 'Тонкая',
};

export type PizzaSizeName = keyof typeof pizzaSize;
export type PizzaTypeName = keyof typeof pizzaType;
export type PizzaSize = (typeof pizzaSize)[PizzaSizeName];
export type PizzaType = (typeof pizzaType)[PizzaTypeName];

export const pizzaSizes = Object.entries(pizzaSize).map(([name, value]) => ({
  name,
  value,
}));

export const pizzaTypes = Object.entries(pizzaType).map(([name, value]) => ({
  name,
  value,
}));

export type PizzaSizeVariant = {
  name: string;
  value: PizzaSize;
  disabled?: boolean;
};

export type PizzaTypeVariant = {
  name: string;
  value: PizzaType;
  disabled?: boolean;
};

export type PizzaVariant = PizzaSizeVariant | PizzaTypeVariant;

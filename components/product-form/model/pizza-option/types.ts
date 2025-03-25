export const mapPizzaSize = {
  Маленькая: 20,
  Средняя: 30,
  Большая: 40,
} as const;

export const mapPizzaType = {
  Традиционная: 1,
  Тонкая: 2,
} as const;

export type PizzaSizeName = keyof typeof mapPizzaSize;
export type PizzaTypeName = keyof typeof mapPizzaType;
export type PizzaSize = (typeof mapPizzaSize)[PizzaSizeName];
export type PizzaType = (typeof mapPizzaType)[PizzaTypeName];

export const pizzaSizes = Object.entries(mapPizzaSize).map(([name, value]) => ({
  name: name as PizzaSizeName,
  value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([name, value]) => ({
  name: name as PizzaTypeName,
  value,
}));

export type PizzaSizeVariant = {
  name: PizzaSizeName;
  value: PizzaSize;
  disabled?: boolean;
};

export type PizzaTypeVariant = {
  name: PizzaTypeName;
  value: PizzaType;
  disabled?: boolean;
};

export type PizzaVariant = PizzaSizeVariant | PizzaTypeVariant;

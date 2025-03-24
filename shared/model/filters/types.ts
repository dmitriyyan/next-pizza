export interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

export type CheckboxFilters = Exclude<keyof Filters, 'prices'>;

export interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  updatePrices: (prices: number[]) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

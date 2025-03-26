export type PriceProps = {
  priceFrom?: number;
  priceTo?: number;
};

export type QueryFilters = PriceProps & {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
};

export type Filters = {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
};

export type CheckboxFilters = Exclude<keyof Filters, 'prices'>;

export type ReturnProps = Filters & {
  setPrices: (name: keyof PriceProps, value: number) => void;
  updatePrices: (prices: number[]) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
};

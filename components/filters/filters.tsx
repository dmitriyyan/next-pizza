'use client';

import React from 'react';
import { Title } from '@/shared/ui/title';
import { Input } from '@/shared/ui/input';
import { RangeSlider } from './ui/range-slider';
import { CheckboxFiltersGroup } from './ui/checkbox-filters-group';
// import { useQueryFilters, useIngredients, useFilters } from '@/shared/hooks';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  // TODO: uncomment when ingredients are ready
  // const { ingredients, loading } = useIngredients();
  const ingredients = [
    { id: 1, name: 'Мясо' },
    { id: 2, name: 'Овощи' },
    { id: 3, name: 'Сыр' },
    { id: 4, name: 'Бекон' },
    { id: 5, name: 'Курица' },
    { id: 6, name: 'Салями' },
    { id: 7, name: 'Ветчина' },
    { id: 8, name: 'Шампиньоны' },
    { id: 9, name: 'Сырный соус' },
    { id: 10, name: 'Томатный соус' },
    { id: 11, name: 'Салат' },
  ];
  const loading = false;
  // TODO: uncomment when filters are ready
  // const filters = useFilters();
  const filters = {
    pizzaTypes: new Set<string>(),
    sizes: new Set<string>(),
    prices: {
      priceFrom: 0,
      priceTo: 1000,
    },
    selectedIngredients: new Set<string>(),
    setPizzaTypes: () => {},
    setSizes: () => {},
    setPrices: (name: string, value: number) => {
      console.log(name, value);
    },
    setSelectedIngredients: () => {},
  };

  // useQueryFilters(filters);

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const updatePrices = (prices: number[]) => {
    console.log(prices);
  // filters.setPrices('priceFrom', prices[0]);
  // filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
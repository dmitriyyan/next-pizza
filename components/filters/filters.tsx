import { Title } from '@/shared/ui/title';
import React from 'react';
import { FilterProvider } from '@/shared/model/filters';
import { CheckboxFiltersGroup } from './ui/checkbox-filters-group';
import { PriceFilters } from './ui/price-filters';
import { IngredientsFilter } from './ui/ingredients-filter';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      <FilterProvider>
        <CheckboxFiltersGroup
          title="Тип теста"
          name="pizzaTypes"
          className="mb-5"
          items={[
            { text: 'Тонкое', value: '1' },
            { text: 'Традиционное', value: '2' },
          ]}
        />

        <CheckboxFiltersGroup
          title="Размеры"
          name="sizes"
          className="mb-5"
          items={[
            { text: '20 см', value: '20' },
            { text: '30 см', value: '30' },
            { text: '40 см', value: '40' },
          ]}
        />

        <PriceFilters />

        <IngredientsFilter />
      </FilterProvider>
    </div>
  );
};

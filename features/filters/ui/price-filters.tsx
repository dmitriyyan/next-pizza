'use client';

import { Input } from '@/shared/ui/input';
import { RangeSlider } from './range-slider';
import { useFilters } from '@/shared/model/filters';

export const PriceFilters = () => {
  const { prices, setPrices, updatePrices } = useFilters();

  return (
    <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
      <p className="font-bold mb-3">Цена от и до:</p>
      <div className="flex gap-3 mb-5">
        <Input
          type="number"
          placeholder="0"
          min={0}
          max={1000}
          value={String(prices.priceFrom)}
          onChange={(e) => setPrices('priceFrom', Number(e.target.value))}
        />
        <Input
          type="number"
          min={100}
          max={1000}
          placeholder="1000"
          value={String(prices.priceTo)}
          onChange={(e) => setPrices('priceTo', Number(e.target.value))}
        />
      </div>

      <RangeSlider
        min={0}
        max={1000}
        step={10}
        value={[prices.priceFrom || 0, prices.priceTo || 1000]}
        onValueChange={updatePrices}
      />
    </div>
  );
};

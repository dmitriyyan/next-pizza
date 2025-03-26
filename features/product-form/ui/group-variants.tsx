'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { PizzaVariant } from '@/shared/model/pizza-option';

type Props<T extends PizzaVariant[]> = {
  items: T;
  onClick: (value: T[number]) => void;
  selected: T[number];
  className?: string;
};

export function GroupVariants<T extends PizzaVariant[]>({
  items,
  onClick,
  className,
  selected,
}: Props<T>) {
  return (
    <div
      className={cn(
        className,
        'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none',
      )}
    >
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick(item)}
          className={cn(
            'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
            {
              'bg-white shadow': item.value === selected.value,
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
            },
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

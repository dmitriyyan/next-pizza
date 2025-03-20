'use client';

import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
// import { useCategoryStore } from '@/shared/store/category';
// import { Category } from '@prisma/client';
import React from 'react';

interface Props {
  // TODO: uncomment when category store is ready
  // items: Category[];
  // TODO: remove this when category store is ready
  items: { name: string; id: string }[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  // TODO: uncomment when category store is ready
  // const categoryActiveId = useCategoryStore((state) => state.activeId);
  // TODO: remove this when category store is ready
  const [categoryActiveId, setCategoryActiveId] = React.useState<string | null>('all');

  return (
    <div className={cn('inline-flex gap-1 flex-wrap bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map(({ name, id }, index) => (
        <Link href={`/#${name}`} key={index}
            className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from '@/shared/ui/container';
import { Categories } from './ui/categories';
import { SortPopup } from './ui/sort-popup';
// import { Category } from '@prisma/client';

interface Props {
  // TODO: uncomment when category store is ready
  // categories: Category[];
  // TODO: remove this when category store is ready
  categories: { name: string; id: number }[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between flex-wrap gap-y-1">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
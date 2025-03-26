import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from '@/shared/ui/container';
import { Categories } from './ui/categories';
import { SortPopup } from './ui/sort-popup';
import type { Category } from '@prisma/client';

type Props = {
  categories: Category[];
  className?: string;
};

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className,
      )}
    >
      <Container className="flex items-center justify-between flex-wrap gap-y-1">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};

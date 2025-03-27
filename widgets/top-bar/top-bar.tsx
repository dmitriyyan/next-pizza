import React from 'react';
import type { Category } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/ui/container';
import { Categories } from './ui/categories';
import { FilterButton } from './ui/filter-button';

type Props = {
  categories: Category[];
  className?: string;
};

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-2 shadow-lg shadow-black/5 z-10',
        className,
      )}
    >
      <Container className="px-2 sm:px-4">
        <div className="flex items-center flex-wrap gap-3">
          <Categories items={categories} />
          <FilterButton className="md:hidden" />
        </div>
      </Container>
    </div>
  );
};

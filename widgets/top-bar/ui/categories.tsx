'use client';

import React from 'react';
import type { Category } from '@prisma/client';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';

type Props = {
  items: Category[];
  className?: string;
};

export const Categories: React.FC<Props> = ({ items, className }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  const activeCategory =
    items.find((item) => item.id === categoryActiveId) || items[0];

  const handleCategoryClick = (
    e: React.MouseEvent,
    id: number,
    name: string,
  ) => {
    e.preventDefault();
    useCategoryStore.getState().setActiveId(id);
    setIsOpen(false);

    const targetElement = document.getElementById(name);
    if (targetElement) {
      setTimeout(() => {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  return (
    <div className={cn('relative min-w-33', className)}>
      <div className="sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-100"
          aria-label="Выбрать категорию"
        >
          <span className="font-bold">
            {activeCategory?.name || 'Все категории'}
          </span>
          <ChevronDown
            className={cn(
              'h-5 w-5 transition-transform',
              isOpen && 'rotate-180',
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleCategoryClick(e, item.id, item.name)}
                className={cn(
                  'block w-full text-left px-4 py-3 hover:bg-gray-50',
                  categoryActiveId === item.id &&
                    'bg-primary/5 text-primary font-bold',
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-10 -mt-3"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="hidden sm:flex gap-1 bg-gray-50 p-1 rounded-2xl">
        {items.map(({ name, id }) => (
          <Link
            href={`/#${name}`}
            key={id}
            className={cn(
              'flex items-center font-bold h-11 rounded-2xl px-5 whitespace-nowrap transition-colors',
              categoryActiveId === id
                ? 'bg-white shadow-md shadow-gray-200 text-primary'
                : 'hover:bg-white/50',
            )}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

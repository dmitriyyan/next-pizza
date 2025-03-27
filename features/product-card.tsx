import Link from 'next/link';
import React from 'react';
import type { Ingredient } from '@prisma/client';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

type Props = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
};

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  className,
}) => {
  return (
    <div className={cn('transition-transform hover:scale-[1.02]', className)}>
      <Link
        href={`/product/${id}`}
        className="block max-w-72 m-auto md:m-0 md:max-w-full md:max-h-full"
      >
        <div className="flex justify-center p-4 sm:p-6 bg-secondary rounded-lg">
          <Image
            className="w-full h-auto object-contain"
            src={imageUrl}
            alt={name}
            width={215}
            height={215}
            priority
          />
        </div>

        <Title
          text={name}
          size="sm"
          className="mb-1 mt-3 font-bold line-clamp-1"
        />

        {ingredients.length > 0 && (
          <p className="leading-tight text-sm text-gray-500 min-h-[2.5rem]">
            {ingredients.map((ingredient) => ingredient.name).join(', ')}
          </p>
        )}

        <div className="flex flex-wrap justify-between items-center gap-2 mt-3">
          <span className="text-base sm:text-lg lg:text-xl">
            от <b>{price} ₽</b>
          </span>

          <Button
            variant="secondary"
            className="text-sm sm:text-base font-bold h-9 px-3 sm:px-4"
          >
            <Plus size={18} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};

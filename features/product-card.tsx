import Link from 'next/link';
import React from 'react';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import type { Ingredient } from '@prisma/client';

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
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[160px] lg:h-[260px]">
          <Image
            className="w-[215px] h-auto object-contain"
            src={imageUrl}
            alt={name}
            width={215}
            height={215}
          />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="leading-tight lg:leading-normal text-sm text-gray-500">
          {ingredients.map((ingredient) => ingredient.name).join(', ')}
        </p>

        <div className="flex flex-wrap justify-between items-center mt-2">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};

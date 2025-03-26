'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/ui/dialog';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductForm } from './product-form';
import { ProductWithRelations } from '@/shared/model/product-with-relations';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'lg:max-w-[calc(1080px-2rem)] min-h-[500px] bg-white overflow-hidden',
          className,
        )}
      >
        <DialogTitle hidden>{product.name}</DialogTitle>
        <DialogDescription hidden>Форма выбора продукта</DialogDescription>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};

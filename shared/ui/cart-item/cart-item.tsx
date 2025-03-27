import { cn } from '@/shared/lib/utils';
import React from 'react';

import { CartItemProps } from '@/shared/model/cart';
import { CountButton } from './ui/count-button';
import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';

type Props = CartItemProps & {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
};

export const CartItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  onClickCountButton,
  onClickRemove,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex bg-white p-5 gap-6',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}
    >
      <Image
        className={cn('w-[60px] h-[60px]', className)}
        src={imageUrl}
        alt={name}
        width={233}
        height={233}
      />

      <div className="flex-1">
        <div>
          <div className={cn('flex items-center justify-between', className)}>
            <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
          </div>
          {details && (
            <p className="text-xs text-gray-400 w-[90%]">{details}</p>
          )}
        </div>

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3">
            <h2 className="font-bold">{price} ₽</h2>
            <Trash2Icon
              onClick={onClickRemove}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

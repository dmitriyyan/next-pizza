import React from 'react';
import { WhiteBlock } from './white-block';
import { getCartItemDetails } from '@/shared/lib/cart';
import { CheckoutItemSkeleton } from './checkout-item-skeleton';
import { CartItem } from '@/shared/ui/cart-item';
import { CartStateItem } from '@/shared/model/cart';

type Props = {
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus',
  ) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
};

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))
          : items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType,
                  item.pizzaSize,
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};

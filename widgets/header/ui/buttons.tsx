'use client';

import React from 'react';
import { SearchInput } from './search-input';
import { Auth } from './auth';
import { CartButton } from './cart-button';
import { Search, ShoppingCart } from 'lucide-react';
import { CartDrawer } from '@/features/cart-drawer';
import { useCartStore } from '@/shared/store/cart';
import { useToast } from '../model/use-toast';

export const Buttons = ({
  hasSearch,
  hasCart,
}: {
  hasSearch: boolean;
  hasCart: boolean;
}) => {
  const [mobileSearchVisible, setMobileSearchVisible] = React.useState(false);
  const cartItems = useCartStore((state) => state.items);

  useToast();

  return (
    <>
      {hasSearch && (
        <>
          <SearchInput className="hidden md:flex mx-10 flex-1" />
          {mobileSearchVisible && (
            <div className="fixed inset-0 z-50 bg-white md:hidden p-4">
              <div className="flex items-center justify-between mb-4 ">
                <h2 className="text-lg font-bold">Поиск</h2>
                <button
                  onClick={() => setMobileSearchVisible(false)}
                  className="p-2"
                  aria-label="Закрыть поиск"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <SearchInput className="w-full" />
            </div>
          )}
        </>
      )}
      <div className="hidden md:flex items-center gap-3">
        <Auth />
        {hasCart && <CartButton />}
      </div>

      <div className="flex md:hidden items-center gap-2">
        {hasSearch && (
          <button
            onClick={() => setMobileSearchVisible(true)}
            className="p-2 rounded-full bg-gray-100"
            aria-label="Открыть поиск"
          >
            <Search className="h-5 w-5" />
          </button>
        )}

        {hasCart && (
          <CartDrawer>
            <button
              className="relative p-2 rounded-full bg-primary text-white"
              aria-label="Корзина"
            >
              <span className="absolute -top-1 -right-1 bg-white text-primary text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartItems.length}
              </span>
              <ShoppingCart className="h-5 w-5" />
            </button>
          </CartDrawer>
        )}
      </div>
    </>
  );
};

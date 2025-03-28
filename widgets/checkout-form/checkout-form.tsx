'use client';

import toast from 'react-hot-toast';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/shared/model/cart';
import { CheckoutFormValues, checkoutFormSchema } from './checkout-form-schema';
import { CheckoutCart } from './ui/checkout-cart';
import { CheckoutPersonalForm } from './ui/checkout-personal-form';
import { CheckoutAddressForm } from './ui/checkout-address-form';
import { CheckoutSidebar } from './ui/checkout-sidebar';
import { getMe } from '@/shared/api';

export const CheckoutForm = ({
  onSubmitAction,
}: {
  onSubmitAction: (data: CheckoutFormValues) => Promise<string | undefined>;
}) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
    mode: 'all',
  });

  const { data: session } = useSession();

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session, form]);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus',
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      const url = await onSubmitAction(data);

      toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap gap-6 md:gap-10 justify-center"
      >
        <div className="flex flex-col gap-6 md:gap-10 md:mb-20 max-w-full md:max-w-[300px]">
          <CheckoutCart
            onClickCountButton={onClickCountButton}
            removeCartItem={removeCartItem}
            items={items}
            loading={loading}
          />

          <CheckoutPersonalForm
            className={loading ? 'opacity-40 pointer-events-none' : ''}
          />

          <CheckoutAddressForm
            className={loading ? 'opacity-40 pointer-events-none' : ''}
          />
        </div>

        <div className="w-full md:w-auto max-w-[470px] mb-20 md:mb-0">
          <CheckoutSidebar
            totalAmount={totalAmount}
            loading={loading || form.formState.isSubmitting}
          />
        </div>
      </form>
    </FormProvider>
  );
};

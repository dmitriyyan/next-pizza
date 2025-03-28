'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

export const useToast = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = '';
    let timeoutId: NodeJS.Timeout | undefined;

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена!';
    }

    if (!timeoutId && toastMessage) {
      timeoutId = setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 2000,
        });
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchParams, router]);
};

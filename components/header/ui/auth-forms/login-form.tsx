import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TFormLoginValues, formLoginSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/shared/ui/form-input';
import { Button } from '@/shared/ui/button';
import toast from 'react-hot-toast';
import { DialogDescription, DialogTitle } from '@/shared/ui/dialog';
import Image from 'next/image';
// import { signIn } from 'next-auth/react';

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      // TODO: uncomment when login is ready
      // const resp = await signIn('credentials', {
      //   ...data,
      //   redirect: false,
      // });

      // if (!resp?.ok) {
      //   throw Error();
      // }
      // TODO: remove this when login is ready
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <DialogTitle className="font-bold text-[26px]">
              Вход в аккаунт
            </DialogTitle>
            <DialogDescription asChild>
              <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
            </DialogDescription>
          </div>
          <Image src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
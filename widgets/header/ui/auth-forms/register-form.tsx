'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
// import { registerUser } from '@/app/actions';
import { TFormRegisterValues, formRegisterSchema } from './schemas';
import { FormInput } from '@/shared/ui/form-input';
import { Button } from '@/shared/ui/button';
import { DialogTitle } from '@/shared/ui/dialog';

type Props = {
  onClose?: VoidFunction;
};

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      // TODO: uncomment when register is ready
      // await registerUser({
      //   email: data.email,
      //   fullName: data.fullName,
      //   password: data.password,
      // });
      // TODO: remove this when register is ready
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.error('Регистрация успешна 📝. Подтвердите свою почту', {
        icon: '✅',
      });

      onClose?.();
    } catch {
      return toast.error('Неверный E-Mail или пароль', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <DialogTitle className="font-bold text-[26px]">Регистрация</DialogTitle>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};

'use client';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
// import { signIn } from 'next-auth/react';
import React from 'react';
import { LoginForm } from './auth-forms/login-form';
import { RegisterForm } from './auth-forms/register-form';
import Image from 'next/image';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={
              () => {}
              // signIn('github', {
              //   callbackUrl: '/',
              //   redirect: true,
              // })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <Image
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="github"
              width={32}
              height={32}
            />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={
              () => {}
              // signIn('google', {
              //   callbackUrl: '/',
              //   redirect: true,
              // })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <Image
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="google"
              width={24}
              height={24}
            />
            Google
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={onSwitchType}
          type="button"
          className="h-12"
        >
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

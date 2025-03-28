'use client';

import React from 'react';
import { ProfileButton } from './profile-button';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { LoginForm } from './auth-forms/login-form';
import { RegisterForm } from './auth-forms/register-form';
import { Button } from '@/shared/ui/button';

type Props = {
  registerAction: (data: {
    email: string;
    fullName: string;
    password: string;
  }) => Promise<void>;
};
export const Auth = ({ registerAction }: Props) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [type, setType] = React.useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  return (
    <>
      <Dialog open={openAuthModal} onOpenChange={handleClose}>
        <DialogContent className="w-[450px] bg-white p-10">
          {type === 'login' ? (
            <LoginForm onClose={handleClose} />
          ) : (
            <RegisterForm
              onClose={handleClose}
              onSubmitAction={registerAction}
            />
          )}

          <hr />

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
      <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
    </>
  );
};

'use client';

import React from 'react';
import { AuthModal } from './auth-modal';
import { ProfileButton } from './profile-button';

export const Auth = () => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  return (
    <>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
      <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
    </>
  );
};

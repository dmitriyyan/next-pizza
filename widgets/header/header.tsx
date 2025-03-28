import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/ui/container';
import { Buttons } from './ui/buttons';
import { Auth } from './ui/auth';
import { registerUser } from '@/app/(root)/actions';
type Props = {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
};

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-4 md:py-8">
        <Link href="/" className="flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-xl md:text-2xl uppercase font-black">
                Next Pizza
              </h1>
              <p className="text-xs md:text-sm text-gray-600 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>
        <React.Suspense>
          <Buttons hasSearch={hasSearch} hasCart={hasCart}>
            <Auth registerAction={registerUser} />
          </Buttons>
        </React.Suspense>
      </Container>
    </header>
  );
};

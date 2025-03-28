import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '@/shared/ui/button';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

type Props = {
  onClickSignIn?: () => void;
  className?: string;
};

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSignIn,
}) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button
          variant="outline"
          onClick={onClickSignIn}
          className="flex items-center gap-2 px-1 md:px-4 rounded-full w-9 h-9 md:w-auto md:h-auto"
        >
          <User className="h-5 w-5" />
          <span className="hidden md:inline">Войти</span>
        </Button>
      ) : (
        <Link href="/profile">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-1 md:px-4 rounded-full w-9 h-9 md:w-auto md:h-auto"
          >
            <CircleUser className="h-5 w-5" />
            <span className="hidden md:inline">Профиль</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

// import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '@/shared/ui/button';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  // TODO: uncomment when auth is ready
  // const { data: session } = useSession();
  // TODO: remove this when auth is ready
  const [session, setSession] = React.useState(false);

  return (
    <div className={className}>
      {!session ? (
        <Button onClick={onClickSignIn} variant="outline" className="flex items-center gap-1">
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
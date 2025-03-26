import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
};

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('mx-auto px-4 max-w-[1280px]', className)}>
      {children}
    </div>
  );
};

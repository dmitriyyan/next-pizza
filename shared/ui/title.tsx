import React from 'react';
import { cn } from '@/shared/lib/utils';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type Props = {
  size?: TitleSize;
  className?: string;
  text: string;
};

export const Title: React.FC<Props> = ({ text, size = 'sm', className }) => {
  const mapTagBySize = {
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
    '2xl': 'h1',
  } as const;

  const mapClassNameBySize = {
    xs: 'text-[16px]',
    sm: 'text-[16px] lg:text-[22px]',
    md: 'text-[22px] lg:text-[26px]',
    lg: 'text-[26px] lg:text-[32px]',
    xl: 'text-[32px] lg:text-[40px]',
    '2xl': 'text-[40px] lg:text-[48px]',
  } as const;

  return React.createElement(
    mapTagBySize[size],
    {
      className: cn(
        mapClassNameBySize[size],
        'leading-tight lg:leading-normal',
        className,
      ),
    },
    text,
  );
};

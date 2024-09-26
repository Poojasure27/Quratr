// /src/components/ui/card/CardFooter.tsx
import React from 'react';
import clsx from 'clsx';

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return <div className={clsx('mt-4', className)}>{children}</div>;
};

export default CardFooter;

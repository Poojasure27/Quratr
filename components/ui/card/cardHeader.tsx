// /src/components/ui/card/CardHeader.tsx
import React from 'react';
import clsx from 'clsx';

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return <div className={clsx('mb-2', className)}>{children}</div>;
};

export default CardHeader;


import React from 'react';
import clsx from 'clsx';

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={clsx('mb-2', className)}>{children}</div>;
};

export default CardContent;


import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={clsx('rounded-md shadow-md p-4', className)}>
      {children}
    </div>
  );
};

export default Card;

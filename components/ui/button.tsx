// components/ui/Button.tsx
import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'; // Add this line to include type attribute
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
  type = 'button', // Default type to 'button' to avoid any default behavior issues
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx('py-2 px-4 rounded-md transition duration-200', className, {
        'opacity-50 cursor-not-allowed': disabled,
      })}
      disabled={disabled}
      type={type} // Pass the type prop to the button element
    >
      {children}
    </button>
  );
};

// components/ui/alert.tsx
import React from 'react';
import clsx from 'clsx'; // Optional: use clsx for better class name management

interface AlertProps {
  children: React.ReactNode;
  className?: string; // Add className to allow custom styling
}

export function Alert({ children, className }: AlertProps) {
  return <div className={clsx("alert", className)}>{children}</div>;
}

interface AlertTitleProps {
  children: React.ReactNode;
}

export function AlertTitle({ children }: AlertTitleProps) {
  return <h4 className="alert-title">{children}</h4>;
}

interface AlertDescriptionProps {
  children: React.ReactNode;
}

export function AlertDescription({ children }: AlertDescriptionProps) {
  return <p className="alert-description">{children}</p>;
}

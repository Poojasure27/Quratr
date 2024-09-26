// components/ui/input.tsx
import React from 'react';

// A simple Input component
export function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="input" {...props} />;
}

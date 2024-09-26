// components/ui/textarea.tsx
import React from 'react';

// A simple Textarea component
export function Textarea({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="textarea" {...props} />;
}

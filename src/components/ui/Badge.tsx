import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'custom';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-teal-100 text-teal-800',
    warning: 'bg-orange-100 text-orange-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-[#1B2A4A]',
    custom: '',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const dotColors = {
    default: 'bg-gray-500',
    success: 'bg-teal-500',
    warning: 'bg-orange-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    custom: 'bg-current',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variant !== 'custom' && variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'mr-1.5 h-2 w-2 rounded-full',
            variant !== 'custom' ? dotColors[variant] : 'bg-current'
          )}
        />
      )}
      {children}
    </span>
  );
};

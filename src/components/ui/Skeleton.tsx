import React from 'react';
import { cn } from '@/lib/cn';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  className,
  variant = 'rectangular',
}) => {
  const styles = {
    width: width || (variant === 'circular' ? height || '2rem' : '100%'),
    height: height || (variant === 'text' ? '1rem' : variant === 'circular' ? width || '2rem' : '100%'),
  };

  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
    card: 'rounded-xl',
  };

  return (
    <div
      style={styles}
      className={cn('animate-pulse bg-gray-200', variants[variant], className)}
    />
  );
};

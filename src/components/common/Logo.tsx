import React from 'react';
import { Package, MapPin } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  className,
}) => {
  const sizes = {
    sm: { icon: 'h-6 w-6', text: 'text-xl', slogan: 'hidden' },
    md: { icon: 'h-8 w-8', text: 'text-2xl', slogan: 'text-[10px] sm:text-xs' },
    lg: { icon: 'h-10 w-10', text: 'text-3xl', slogan: 'text-xs' },
  };

  const currentSize = sizes[size];

  const IconComponent = () => (
    <div className="relative inline-flex">
      <Package className={cn("text-[#1B2A4A]", currentSize.icon)} />
      <MapPin className="absolute -bottom-1 -right-1 h-3/5 w-3/5 text-[#F97316] fill-[#F97316]/20" />
    </div>
  );

  const TextComponent = () => (
    <div className="flex flex-col">
      <div className={cn("font-bold tracking-tight leading-none", currentSize.text)}>
        <span className="text-[#1B2A4A]">Mon</span>
        <span className="text-[#F97316]">Colis</span>
      </div>
      {variant === 'full' && (
        <span className={cn("text-gray-500 font-medium mt-0.5", currentSize.slogan)}>
          Livraison • Rapide • Fiable
        </span>
      )}
    </div>
  );

  return (
    <div className={cn('flex items-center gap-2 select-none', className)}>
      {variant !== 'text' && <IconComponent />}
      {variant !== 'icon' && <TextComponent />}
    </div>
  );
};

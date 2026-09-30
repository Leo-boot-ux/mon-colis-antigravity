import React from 'react';
import { cn } from '@/lib/cn';

interface BottomSheetProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

export default function BottomSheet({ children, className, isOpen = true }: BottomSheetProps) {
  if (!isOpen) return null;

  return (
    <div className={cn(
      "absolute z-[1000] bg-white transition-transform duration-300",
      // Mobile: Bottom sheet
      "bottom-0 left-0 w-full rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-6",
      // Desktop: Side panel floating over the map
      "md:bottom-auto md:top-24 md:left-6 md:w-96 md:rounded-2xl md:shadow-2xl md:p-8",
      className
    )}>
      {/* Drag handle for mobile only */}
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 md:hidden"></div>
      
      <div className="w-full h-full max-h-[70vh] md:max-h-[80vh] overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </div>
  );
}

import React from 'react';
import { cn } from '@/lib/cn';
import { Check } from 'lucide-react';
import type { OrderStatus } from '@/types';
import { ORDER_STATUS_LABELS } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: string;
}

export interface StatusTimelineProps {
  currentStatus: OrderStatus;
  history?: OrderStatusHistory[];
  className?: string;
}

const FLOW: OrderStatus[] = [
  'pending',
  'accepted',
  'picked_up',
  'in_transit',
  'out_for_delivery',
  'delivered'
];

export const StatusTimeline: React.FC<StatusTimelineProps> = ({
  currentStatus,
  history = [],
  className,
}) => {
  if (currentStatus === 'cancelled') {
    return (
      <div className={cn("p-4", className)}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
            <div className="h-3 w-3 rounded-full bg-red-500" />
          </div>
          <div>
            <p className="font-medium text-red-600">Commande annulée</p>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex = FLOW.indexOf(currentStatus);
  const effectiveIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className={cn("py-4", className)}>
      <div className="flex flex-col space-y-6">
        {FLOW.map((status, index) => {
          const isCompleted = index < effectiveIndex;
          const isCurrent = index === effectiveIndex;
          
          const historyItem = history.find(h => h.status === status);
          const dateStr = historyItem?.timestamp 
            ? format(new Date(historyItem.timestamp), 'dd MMM yyyy à HH:mm', { locale: fr })
            : undefined;

          return (
            <div key={status} className="relative flex items-start gap-4 group">
              {index !== FLOW.length - 1 && (
                <div
                  className={cn(
                    "absolute left-4 top-8 -bottom-6 w-[2px]",
                    isCompleted ? "bg-teal-500" : "bg-gray-200 border-r-2 border-dashed border-gray-200 bg-transparent"
                  )}
                />
              )}
              
              <div className="relative z-10 flex h-8 w-8 items-center justify-center shrink-0">
                {isCompleted ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                ) : isCurrent ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                    <div className="h-3 w-3 rounded-full bg-[#F97316] animate-pulse" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <div className="h-3 w-3 rounded-full bg-gray-300" />
                  </div>
                )}
              </div>

              <div className="flex flex-col pt-1.5 pb-2">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isCompleted ? "text-gray-900" : isCurrent ? "text-[#F97316]" : "text-gray-500"
                  )}
                >
                  {ORDER_STATUS_LABELS[status] || status}
                </p>
                {dateStr && (
                  <p className="text-xs text-gray-500 mt-0.5">{dateStr}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

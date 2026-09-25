import React from 'react';
import { Package, MapPin, ArrowRight, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from './StatusBadge';
import type { OrderStatus } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface OrderCardProps {
  trackingNumber: string;
  status: OrderStatus;
  pickupCity: string;
  destinationCity: string;
  recipientName: string;
  price: number;
  date: string;
  onClick?: () => void;
  className?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  trackingNumber,
  status,
  pickupCity,
  destinationCity,
  recipientName,
  price,
  date,
  onClick,
  className,
}) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('XAF', 'FCFA');
  };

  const formattedDate = format(new Date(date), 'dd MMM yyyy', { locale: fr });
  const formattedTime = format(new Date(date), 'HH:mm');

  return (
    <Card hover onClick={onClick} className={cn('p-4 flex flex-col gap-4', className)}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-2 rounded-lg">
            <Package className="h-5 w-5 text-[#1B2A4A]" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{trackingNumber}</p>
            <p className="text-xs text-gray-500 line-clamp-1">{recipientName}</p>
          </div>
        </div>
        <StatusBadge status={status} size="sm" />
      </div>

      <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
        <div className="flex flex-col gap-1 w-2/5">
          <div className="flex items-center gap-1.5 text-gray-500">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs font-medium uppercase truncate">{pickupCity}</span>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center">
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </div>

        <div className="flex flex-col gap-1 w-2/5 items-end text-right">
          <div className="flex items-center gap-1.5 text-gray-900">
            <span className="text-xs font-medium uppercase truncate">{destinationCity}</span>
            <MapPin className="h-3.5 w-3.5 text-[#F97316]" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-1">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{formattedTime}</span>
          </div>
        </div>
        <div className="text-sm font-bold text-[#1B2A4A]">
          {formatPrice(price)}
        </div>
      </div>
    </Card>
  );
};

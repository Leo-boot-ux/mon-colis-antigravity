import React from 'react';
import { Badge } from '@/components/ui/Badge';
import type { OrderStatus } from '@/types';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/types';

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => (
  <Badge size={size} className={ORDER_STATUS_COLORS[status]} variant="custom" dot>
    {ORDER_STATUS_LABELS[status]}
  </Badge>
);

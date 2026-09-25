import type { OrderStatus, UserRole } from '@/types';

// Define allowed transitions: from -> [to statuses]
const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['accepted', 'cancelled'],
  accepted: ['pickup', 'cancelled'],
  pickup: ['picked_up', 'cancelled'],
  picked_up: ['in_transit', 'cancelled'],
  in_transit: ['out_for_delivery', 'cancelled'],
  out_for_delivery: ['delivered', 'failed', 'cancelled'],
  delivered: [],
  failed: ['in_transit', 'returned', 'cancelled'],
  cancelled: [],
  returned: [],
};

// Who can trigger each transition
const TRANSITION_ROLES: Record<string, UserRole[]> = {
  'pending->accepted': ['driver'],
  'pending->cancelled': ['client', 'agent', 'admin'],
  'accepted->pickup': ['driver'],
  'accepted->cancelled': ['agent', 'admin'],
  'pickup->picked_up': ['driver'],
  'pickup->cancelled': ['agent', 'admin'],
  'picked_up->in_transit': ['driver'],
  'picked_up->cancelled': ['admin'],
  'in_transit->out_for_delivery': ['driver'],
  'in_transit->cancelled': ['admin'],
  'out_for_delivery->delivered': ['driver'],
  'out_for_delivery->failed': ['driver'],
  'out_for_delivery->cancelled': ['admin'],
  'failed->in_transit': ['agent', 'admin'],
  'failed->returned': ['agent', 'admin'],
  'failed->cancelled': ['admin'],
};

export function canTransition(
  from: OrderStatus,
  to: OrderStatus,
  role: UserRole
): boolean {
  const allowed = TRANSITIONS[from];
  if (!allowed || !allowed.includes(to)) return false;
  
  const key = `${from}->${to}`;
  const roles = TRANSITION_ROLES[key];
  if (!roles) return false;
  
  return roles.includes(role);
}

export function getAvailableTransitions(
  from: OrderStatus,
  role: UserRole
): OrderStatus[] {
  const allowed = TRANSITIONS[from] || [];
  return allowed.filter((to) => canTransition(from, to, role));
}

export function isTerminalStatus(status: OrderStatus): boolean {
  return ['delivered', 'cancelled', 'returned'].includes(status);
}

export function getStatusStep(status: OrderStatus): number {
  const steps: OrderStatus[] = [
    'pending',
    'accepted',
    'pickup',
    'picked_up',
    'in_transit',
    'out_for_delivery',
    'delivered',
  ];
  const index = steps.indexOf(status);
  return index >= 0 ? index : -1;
}

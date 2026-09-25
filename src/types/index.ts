// User roles
export type UserRole = 'client' | 'driver' | 'agent' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'suspended';

// Order statuses
export type OrderStatus = 
  | 'pending' 
  | 'accepted' 
  | 'pickup' 
  | 'picked_up' 
  | 'in_transit' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'failed' 
  | 'cancelled' 
  | 'returned';

export type PaymentMethod = 'cash' | 'mobile_money' | 'card';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';
export type VehicleType = 'moto' | 'voiture' | 'camionnette';
export type PackageType = 'document' | 'petit_colis' | 'moyen_colis' | 'gros_colis' | 'fragile';
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'order_update';
export type NotificationChannel = 'web' | 'email' | 'sms' | 'whatsapp';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface User {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoUrl?: string;
  status: UserStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface Customer {
  id: string;
  userId: string;
  user?: User;
  defaultAddress?: string;
  city?: string;
  createdAt: string;
}

export interface Driver {
  id: string;
  userId: string;
  user?: User;
  vehicleType: VehicleType;
  vehiclePlate: string;
  licenseNumber: string;
  rating: number;
  totalDeliveries: number;
  isOnline: boolean;
  currentLatitude?: number;
  currentLongitude?: number;
  createdAt: string;
}

export interface Order {
  id: string;
  trackingNumber: string;
  customerId: string;
  customer?: Customer;
  driverId?: string;
  driver?: Driver;
  agentId?: string;
  pickupAddress: string;
  pickupCity: string;
  pickupLatitude?: number;
  pickupLongitude?: number;
  destinationAddress: string;
  destinationCity: string;
  destinationLatitude?: number;
  destinationLongitude?: number;
  recipientName: string;
  recipientPhone: string;
  packageType: PackageType;
  packageDescription?: string;
  weight?: number;
  quantity: number;
  zoneId?: string;
  price: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  deliveryPin: string;
  estimatedDeliveryTime?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  latitude?: number;
  longitude?: number;
  note?: string;
  createdBy: string;
  createdAt: string;
}

export interface DriverLocation {
  id: string;
  driverId: string;
  orderId?: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  createdAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  customerId: string;
  amount: number;
  method: PaymentMethod;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionReference?: string;
  createdAt: string;
}

export interface DeliveryConfirmation {
  id: string;
  orderId: string;
  driverId: string;
  pinValidated: boolean;
  latitude?: number;
  longitude?: number;
  photoUrl?: string;
  signatureUrl?: string;
  confirmedAt: string;
}

export interface Zone {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ZonePricing {
  id: string;
  zoneId: string;
  zone?: Zone;
  vehicleType: VehicleType;
  basePrice: number;
  pricePerKg: number;
  surcharge: number;
  minPrice: number;
  isActive: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  orderId?: string;
  title: string;
  message: string;
  type: NotificationType;
  channel: NotificationChannel;
  read: boolean;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId?: string;
  orderId?: string;
  subject: string;
  message: string;
  email?: string;
  phone?: string;
  status: TicketStatus;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

// Status labels in French
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'En attente',
  accepted: 'Acceptée',
  pickup: 'Récupération en cours',
  picked_up: 'Colis récupéré',
  in_transit: 'En transit',
  out_for_delivery: 'En cours de livraison',
  delivered: 'Livré',
  failed: 'Échec de livraison',
  cancelled: 'Annulée',
  returned: 'Retournée',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-blue-100 text-blue-800',
  pickup: 'bg-indigo-100 text-indigo-800',
  picked_up: 'bg-purple-100 text-purple-800',
  in_transit: 'bg-cyan-100 text-cyan-800',
  out_for_delivery: 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
  returned: 'bg-pink-100 text-pink-800',
};

export const PACKAGE_TYPE_LABELS: Record<PackageType, string> = {
  document: 'Document',
  petit_colis: 'Petit colis (< 5 kg)',
  moyen_colis: 'Moyen colis (5-20 kg)',
  gros_colis: 'Gros colis (> 20 kg)',
  fragile: 'Fragile',
};

export const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  moto: 'Moto',
  voiture: 'Voiture',
  camionnette: 'Camionnette',
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: 'Espèces',
  mobile_money: 'Mobile Money',
  card: 'Carte bancaire',
};

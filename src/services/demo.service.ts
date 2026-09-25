import type { 
  User, Customer, Driver, Order, OrderStatusHistory, 
  DriverLocation, Notification, Zone, ZonePricing, 
  UserRole, OrderStatus, PackageType, PaymentMethod
} from '@/types';
import { generateTrackingNumber, generateDeliveryPin } from '@/utils/tracking';

export const DEMO_CREDENTIALS: Record<string, { userId: string; role: UserRole }> = {
  'client@demo.moncolis.ga': { userId: 'user-1', role: 'client' },
  'livreur@demo.moncolis.ga': { userId: 'user-6', role: 'driver' },
  'agent@demo.moncolis.ga': { userId: 'user-3', role: 'agent' },
  'admin@demo.moncolis.ga': { userId: 'user-5', role: 'admin' },
};

const users: User[] = [
  { id: 'user-1', role: 'client', firstName: 'Jean', lastName: 'Moussavou', email: 'client@demo.moncolis.ga', phone: '+24177000001', status: 'active', createdAt: '2026-09-01T00:00:00Z' },
  { id: 'user-2', role: 'client', firstName: 'Marie', lastName: 'Ndong', email: 'marie@demo.com', phone: '+24177000002', status: 'active', createdAt: '2026-09-01T00:00:00Z' },
  { id: 'user-3', role: 'agent', firstName: 'Pierre', lastName: 'Obame', email: 'agent@demo.moncolis.ga', phone: '+24177000003', status: 'active', createdAt: '2026-09-01T00:00:00Z' },
  { id: 'user-4', role: 'client', firstName: 'Sylvie', lastName: 'Mba', email: 'sylvie@demo.com', phone: '+24177000004', status: 'active', createdAt: '2026-09-01T00:00:00Z' },
  { id: 'user-5', role: 'admin', firstName: 'Patrick', lastName: 'Nzé', email: 'admin@demo.moncolis.ga', phone: '+24177000005', status: 'active', createdAt: '2026-09-01T00:00:00Z' },
  { id: 'user-6', role: 'driver', firstName: 'Ali', lastName: 'Bongo', email: 'livreur@demo.moncolis.ga', phone: '+24177000006', status: 'active', createdAt: '2026-09-01T00:00:00Z' },
  { id: 'user-7', role: 'driver', firstName: 'Fatou', lastName: 'Diallo', email: 'fatou@demo.com', phone: '+24177000007', status: 'active', createdAt: '2026-09-01T00:00:00Z' },
  { id: 'user-8', role: 'driver', firstName: 'Omar', lastName: 'Nkoghe', email: 'omar@demo.com', phone: '+24177000008', status: 'active', createdAt: '2026-09-01T00:00:00Z' },
  { id: 'user-9', role: 'driver', firstName: 'Carine', lastName: 'Ondo', email: 'carine@demo.com', phone: '+24177000009', status: 'active', createdAt: '2026-09-01T00:00:00Z' },
  { id: 'user-10', role: 'driver', firstName: 'Yves', lastName: 'Mbadinga', email: 'yves@demo.com', phone: '+24177000010', status: 'active', createdAt: '2026-09-01T00:00:00Z' },
];

const customers: Customer[] = [
  { id: 'customer-1', userId: 'user-1', city: 'Libreville', createdAt: '2026-09-01T00:00:00Z' },
  { id: 'customer-2', userId: 'user-2', city: 'Akanda', createdAt: '2026-09-01T00:00:00Z' },
  { id: 'customer-3', userId: 'user-4', city: 'Owendo', createdAt: '2026-09-01T00:00:00Z' },
];

const drivers: Driver[] = [
  { id: 'driver-1', userId: 'user-6', vehicleType: 'moto', vehiclePlate: 'MB-1234', licenseNumber: 'L-123', rating: 4.8, totalDeliveries: 120, isOnline: true, createdAt: '2026-09-01T00:00:00Z' },
  { id: 'driver-2', userId: 'user-7', vehicleType: 'voiture', vehiclePlate: 'MB-5678', licenseNumber: 'L-456', rating: 4.6, totalDeliveries: 85, isOnline: true, createdAt: '2026-09-01T00:00:00Z' },
];

const orders: Order[] = [
  {
    id: 'order-1', trackingNumber: 'MC-2026-000120', customerId: 'customer-1',
    pickupAddress: 'Quartier Louis', pickupCity: 'Libreville',
    destinationAddress: 'Angondjé', destinationCity: 'Akanda',
    recipientName: 'Jean', recipientPhone: '077000000',
    packageType: 'petit_colis', quantity: 1, price: 2000,
    paymentMethod: 'cash', paymentStatus: 'pending', status: 'pending', deliveryPin: '1234',
    createdAt: '2026-09-23T10:00:00Z', updatedAt: '2026-09-23T10:00:00Z'
  },
  {
    id: 'order-2', trackingNumber: 'MC-2026-000121', customerId: 'customer-2', driverId: 'driver-1',
    pickupAddress: 'Glass', pickupCity: 'Libreville',
    destinationAddress: 'Nzeng-Ayong', destinationCity: 'Libreville',
    recipientName: 'Marie', recipientPhone: '077000001',
    packageType: 'document', quantity: 1, price: 1500,
    paymentMethod: 'mobile_money', paymentStatus: 'paid', status: 'in_transit', deliveryPin: '5678',
    createdAt: '2026-09-23T09:00:00Z', updatedAt: '2026-09-23T10:30:00Z'
  }
];

const notifications: Notification[] = [
  { id: 'notif-1', userId: 'user-1', title: 'Bienvenue', message: 'Bienvenue sur Mon Colis !', type: 'info', channel: 'web', read: false, createdAt: '2026-09-23T00:00:00Z' }
];

export class DemoService {
  login(email: string, password: string): User | null {
    if (password !== 'demo1234') return null;
    const cred = DEMO_CREDENTIALS[email];
    if (!cred) return null;
    return users.find(u => u.id === cred.userId) || null;
  }

  getUser(id: string): User | null {
    return users.find(u => u.id === id) || null;
  }

  getCustomerByUserId(userId: string): Customer | null {
    return customers.find(c => c.userId === userId) || null;
  }

  getDriverByUserId(userId: string): Driver | null {
    return drivers.find(d => d.userId === userId) || null;
  }

  getOrders(filters?: { customerId?: string; driverId?: string; status?: OrderStatus }): Order[] {
    let result = [...orders];
    if (filters?.customerId) result = result.filter(o => o.customerId === filters.customerId);
    if (filters?.driverId) result = result.filter(o => o.driverId === filters.driverId);
    if (filters?.status) result = result.filter(o => o.status === filters.status);
    return result;
  }

  getOrderByTracking(trackingNumber: string): Order | null {
    return orders.find(o => o.trackingNumber === trackingNumber) || null;
  }

  getOrderById(id: string): Order | null {
    return orders.find(o => o.id === id) || null;
  }

  getOrderStatusHistory(orderId: string): OrderStatusHistory[] {
    return [
      { id: 'hist-1', orderId, status: 'pending', createdBy: 'system', createdAt: '2026-09-23T10:00:00Z' }
    ];
  }

  getDriverLocations(orderId: string): DriverLocation[] {
    return [];
  }

  getNotifications(userId: string): Notification[] {
    return notifications.filter(n => n.userId === userId);
  }

  getDrivers(): Driver[] {
    return [...drivers];
  }

  getCustomers(): Customer[] {
    return [...customers];
  }

  getZones(): Zone[] {
    return [
      { id: 'zone-1', name: 'Libreville Centre', isActive: true, createdAt: '2026-09-01T00:00:00Z' }
    ];
  }

  getZonePricing(): ZonePricing[] {
    return [
      { id: 'zp-1', zoneId: 'zone-1', vehicleType: 'moto', basePrice: 1500, pricePerKg: 200, surcharge: 0, minPrice: 1500, isActive: true, createdAt: '2026-09-01T00:00:00Z' }
    ];
  }

  getStats() {
    return {
      ordersToday: 15,
      deliveredToday: 5,
      activeDrivers: 2,
      revenueToday: 45000
    };
  }

  createOrder(data: Partial<Order>): Order {
    const newOrder: Order = {
      ...data,
      id: 'order-' + Date.now(),
      trackingNumber: generateTrackingNumber(Date.now() % 100000),
      deliveryPin: generateDeliveryPin(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Order;
    orders.push(newOrder);
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: OrderStatus, userId: string): Order {
    const order = this.getOrderById(orderId);
    if (!order) throw new Error('Order not found');
    order.status = status;
    order.updatedAt = new Date().toISOString();
    return order;
  }

  assignDriver(orderId: string, driverId: string): Order {
    const order = this.getOrderById(orderId);
    if (!order) throw new Error('Order not found');
    order.driverId = driverId;
    order.status = 'accepted';
    return order;
  }

  verifyDeliveryPin(orderId: string, pin: string): boolean {
    const order = this.getOrderById(orderId);
    if (!order) return false;
    return order.deliveryPin === pin;
  }

  markNotificationRead(notificationId: string): void {
    const notif = notifications.find(n => n.id === notificationId);
    if (notif) notif.read = true;
  }

  toggleDriverOnline(driverId: string): Driver {
    const driver = drivers.find(d => d.id === driverId);
    if (!driver) throw new Error('Driver not found');
    driver.isOnline = !driver.isOnline;
    return driver;
  }
}

export const demoService = new DemoService();

import { demoService } from './demo.service';
import type { Order, OrderStatus, User, Driver, Customer, Notification, Zone, ZonePricing } from '@/types';

// In the future, this will switch between demo and real Supabase
// For now, everything uses demoService

export const api = {
  auth: {
    login: (email: string, password: string) => demoService.login(email, password),
    getUser: (id: string) => demoService.getUser(id),
  },
  orders: {
    getAll: (filters?: { customerId?: string; driverId?: string; status?: OrderStatus }) => demoService.getOrders(filters),
    getByTracking: (trackingNumber: string) => demoService.getOrderByTracking(trackingNumber),
    getById: (id: string) => demoService.getOrderById(id),
    getStatusHistory: (orderId: string) => demoService.getOrderStatusHistory(orderId),
    create: (data: Partial<Order>) => demoService.createOrder(data),
    updateStatus: (orderId: string, status: OrderStatus, userId: string) => demoService.updateOrderStatus(orderId, status, userId),
    assignDriver: (orderId: string, driverId: string) => demoService.assignDriver(orderId, driverId),
    verifyPin: (orderId: string, pin: string) => demoService.verifyDeliveryPin(orderId, pin),
  },
  drivers: {
    getAll: () => demoService.getDrivers(),
    getByUserId: (userId: string) => demoService.getDriverByUserId(userId),
    getLocations: (orderId: string) => demoService.getDriverLocations(orderId),
    toggleOnline: (driverId: string) => demoService.toggleDriverOnline(driverId),
  },
  customers: {
    getAll: () => demoService.getCustomers(),
    getByUserId: (userId: string) => demoService.getCustomerByUserId(userId),
  },
  notifications: {
    getAll: (userId: string) => demoService.getNotifications(userId),
    markRead: (id: string) => demoService.markNotificationRead(id),
  },
  zones: {
    getAll: () => demoService.getZones(),
    getPricing: () => demoService.getZonePricing(),
  },
  stats: {
    getDashboard: () => demoService.getStats(),
  },
};

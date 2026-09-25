import { create } from 'zustand';
import type { Order, OrderStatus } from '@/types';
import { api } from '@/services/api';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  filters: {
    status?: OrderStatus;
    search?: string;
  };
  
  // Actions
  loadOrders: (filters?: { customerId?: string; driverId?: string; status?: OrderStatus }) => void;
  loadOrderByTracking: (trackingNumber: string) => void;
  loadOrderById: (id: string) => void;
  createOrder: (data: Partial<Order>) => Promise<Order | null>;
  updateStatus: (orderId: string, status: OrderStatus, userId: string) => void;
  assignDriver: (orderId: string, driverId: string) => void;
  setFilters: (filters: Partial<OrderState['filters']>) => void;
  clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  currentOrder: null,
  isLoading: false,
  filters: {},
  
  loadOrders: async (filters) => {
    set({ isLoading: true });
    try {
      const orders = await api.orders.getAll(filters);
      set({ orders, isLoading: false });
    } catch (error) {
      console.error("Failed to load orders:", error);
      set({ isLoading: false });
    }
  },
  
  loadOrderByTracking: async (trackingNumber) => {
    set({ isLoading: true });
    try {
      const order = await api.orders.getByTracking(trackingNumber);
      set({ currentOrder: order || null, isLoading: false });
    } catch (error) {
      console.error("Failed to load order by tracking:", error);
      set({ isLoading: false, currentOrder: null });
    }
  },
  
  loadOrderById: async (id) => {
    set({ isLoading: true });
    try {
      const order = await api.orders.getById(id);
      set({ currentOrder: order || null, isLoading: false });
    } catch (error) {
      console.error("Failed to load order by id:", error);
      set({ isLoading: false, currentOrder: null });
    }
  },
  
  createOrder: async (data) => {
    set({ isLoading: true });
    try {
      const newOrder = await api.orders.create(data);
      if (newOrder) {
        set(state => ({ orders: [newOrder, ...state.orders], isLoading: false }));
        return newOrder;
      }
      return null;
    } catch (error) {
      console.error("Failed to create order:", error);
      set({ isLoading: false });
      return null;
    }
  },
  
  updateStatus: async (orderId, status, userId) => {
    set({ isLoading: true });
    try {
      const updated = await api.orders.updateStatus(orderId, status, userId);
      if (updated) {
        set(state => ({
          orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o),
          currentOrder: state.currentOrder?.id === orderId ? { ...state.currentOrder, status } : state.currentOrder,
          isLoading: false
        }));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      set({ isLoading: false });
    }
  },
  
  assignDriver: async (orderId, driverId) => {
    set({ isLoading: true });
    try {
      const updated = await api.orders.assignDriver(orderId, driverId);
      if (updated) {
        set(state => ({
          orders: state.orders.map(o => o.id === orderId ? { ...o, driverId } : o),
          currentOrder: state.currentOrder?.id === orderId ? { ...state.currentOrder, driverId } : state.currentOrder,
          isLoading: false
        }));
      }
    } catch (error) {
      console.error("Failed to assign driver:", error);
      set({ isLoading: false });
    }
  },
  
  setFilters: (filters) => set(state => ({ filters: { ...state.filters, ...filters } })),
  
  clearCurrentOrder: () => set({ currentOrder: null })
}));

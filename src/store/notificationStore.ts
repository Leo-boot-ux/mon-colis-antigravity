import { create } from 'zustand';
import type { Notification } from '@/types';
import { api } from '@/services/api';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  loadNotifications: (userId: string) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  loadNotifications: (userId: string) => {
    set({ isLoading: true });
    const notifications = api.notifications.getAll(userId);
    set({
      notifications,
      unreadCount: notifications.filter((n: Notification) => !n.read).length,
      isLoading: false,
    });
  },

  markAsRead: (notificationId: string) => {
    api.notifications.markRead(notificationId);
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    });
  },

  markAllAsRead: () => {
    const state = get();
    state.notifications.forEach((n) => {
      if (!n.read) api.notifications.markRead(n.id);
    });
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },
}));

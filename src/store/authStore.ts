import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, UserRole, Customer, Driver } from '@/types';
import { api } from '@/services/api';

interface AuthState {
  user: User | null;
  role: UserRole | null;
  customer: Customer | null;
  driver: Driver | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemo: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setCustomer: (customer: Customer | null) => void;
  setDriver: (driver: Driver | null) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      customer: null,
      driver: null,
      isAuthenticated: false,
      isLoading: false,
      isDemo: true,
      
      setUser: (user) => set({ user, role: user?.role || null, isAuthenticated: !!user }),
      setCustomer: (customer) => set({ customer }),
      setDriver: (driver) => set({ driver }),
      setLoading: (loading) => set({ isLoading: loading }),
      
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const user = await api.auth.login(email, password);
          if (user) {
            set({ user, role: user.role, isAuthenticated: true });
            
            if (user.role === 'client') {
              const customer = await api.customers.getByUserId(user.id);
              set({ customer });
            } else if (user.role === 'driver') {
              const driver = await api.drivers.getByUserId(user.id);
              set({ driver });
            }
            
            set({ isLoading: false });
            return true;
          }
          set({ isLoading: false });
          return false;
        } catch (error) {
          console.error("Login failed:", error);
          set({ isLoading: false });
          return false;
        }
      },
      
      logout: () => set({ 
        user: null, 
        role: null, 
        customer: null, 
        driver: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

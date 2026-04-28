import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/axios';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isHydrated: false,
      error: null,

      setHydrated: () => set({ isHydrated: true }),

      login: async (credentials) => {
        const email = credentials.email.trim();
        const password = credentials.password.trim();
        
        console.log('--- Debug Login ---');
        console.log('Email ingresado:', email);
        console.log('Password ingresado:', password);

        set({ isLoading: true, error: null });
        
        // Mock Login Bypass
        if (email === 'admin@admin.com' && password === 'admin123') {
          console.log('Bypass detectado: Credenciales de admin correctas');
          set({ 
            user: { id: 'admin-id', username: 'Administrador', email: 'admin@admin.com', role: 'admin' }, 
            isAuthenticated: true, 
            isLoading: false 
          });
          localStorage.setItem('access_token', 'mock-token-admin');
          return;
        }

        try {
          console.log('Intentando llamar a la API...');
          const { data } = await api.post('/auth/login', { email, password });
          localStorage.setItem('access_token', data.access_token);
          set({ 
            user: { id: '1', username: 'Usuario', email: email, role: 'user' }, 
            isAuthenticated: true, 
            isLoading: false 
          });
          console.log('Login API exitoso');
        } catch (error: any) {
          console.error('Error capturado en login:', error);
          const message = error.response?.data?.message || 'Error de conexión con el servidor';
          set({ 
            error: message, 
            isLoading: false 
          });
          throw new Error(message);
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          await api.post('/auth/register', data);
          set({ isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Error al registrarse', 
            isLoading: false 
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('access_token');
        set({ user: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }
        if (token === 'mock-token-admin') {
           set({ isAuthenticated: true });
           return;
        }
        try {
          set({ isAuthenticated: true });
        } catch (error) {
          localStorage.removeItem('access_token');
          set({ isAuthenticated: false, user: null });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: (state) => {
        return () => state?.setHydrated();
      },
    }
  )
);

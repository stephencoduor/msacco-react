import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Credentials } from '@/types/credentials';

interface AuthState {
  credentials: Credentials | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => void;
  logout: () => void;
  getAuthHeader: () => string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      credentials: null,
      isAuthenticated: false,

      login: (credentials: Credentials) => {
        set({ credentials, isAuthenticated: true });
      },

      logout: () => {
        set({ credentials: null, isAuthenticated: false });
      },

      getAuthHeader: () => {
        const creds = get().credentials;
        return creds ? `Basic ${creds.base64EncodedAuthenticationKey}` : '';
      },
    }),
    {
      name: 'msacco-auth',
      partialize: (state) => ({
        credentials: state.credentials,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  email: string;
  login: (email: string) => void;
  logout: () => void;
}

const getStorage = () => {
  if (typeof window !== 'undefined') {
    const storage = localStorage;
    return createJSONStorage(() => ({
      getItem: (name: string) => {
        const value = storage.getItem(name);
        if (value) {
          try {
            const parsed = JSON.parse(value);
            if (parsed?.state?.isAuthenticated) {
              document.cookie = `auth-storage=${encodeURIComponent(value)}; path=/; max-age=86400`;
            } else {
              document.cookie = 'auth-storage=; path=/; max-age=0';
            }
          } catch {}
        }
        return value;
      },
      setItem: (name: string, value: string) => {
        storage.setItem(name, value);
        try {
          const parsed = JSON.parse(value);
          if (parsed?.state?.isAuthenticated) {
            document.cookie = `auth-storage=${encodeURIComponent(value)}; path=/; max-age=86400`;
          } else {
            document.cookie = 'auth-storage=; path=/; max-age=0';
          }
        } catch {}
      },
      removeItem: (name: string) => {
        storage.removeItem(name);
        document.cookie = 'auth-storage=; path=/; max-age=0';
      },
    }));
  }
  return createJSONStorage(() => ({
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  }));
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      email: '',
      login: (email: string) => set({ isAuthenticated: true, email }),
      logout: () => set({ isAuthenticated: false, email: '' }),
    }),
    {
      name: 'auth-storage',
      storage: getStorage(),
    }
  )
);

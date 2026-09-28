import { create } from 'zustand';

interface ToastState {
  message: string | null;
  type: 'error' | 'success';
  show: (message: string, type?: 'error' | 'success') => void;
  hide: () => void;
}

export const useToast = create<ToastState>((set) => ({
  message: null,
  type: 'error',
  show: (message, type = 'error') => set({ message, type }),
  hide: () => set({ message: null }),
}));

import { create } from 'zustand';
import type { GreenApiCredentials } from '@/shared/types';

function loadCredentials(): GreenApiCredentials | null {
  try {
    const data = sessionStorage.getItem('green-api-credentials');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

interface SessionState {
  credentials: GreenApiCredentials | null;
  login: (creds: GreenApiCredentials) => void;
  logout: () => void;
}

export const useSession = create<SessionState>((set) => ({
  credentials: loadCredentials(),
  login: (creds) => {
    sessionStorage.setItem('green-api-credentials', JSON.stringify(creds));
    set({ credentials: creds });
  },
  logout: () => {
    sessionStorage.removeItem('green-api-credentials');
    set({ credentials: null });
  },
}));

import { create } from 'zustand';
import type { ChatMessage } from '@/shared/types';

interface MessagesState {
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
}

export const useMessages = create<MessagesState>((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => {
      if (state.messages.some((m) => m.id === msg.id)) return state;
      return { messages: [...state.messages, msg] };
    }),
  clearMessages: () => set({ messages: [] }),
}));

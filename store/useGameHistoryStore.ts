// stores/useGameHistoryStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Player } from './useGameStore'; // import Player type from your main store

type GameHistoryState = {
  history: Player[][];
  addRound: (players: Player[]) => void;
  clearHistory: () => void;
};

export const useGameHistoryStore = create<GameHistoryState>()(
  persist(
    (set) => ({
      history: [],
      addRound: (players) =>
        set((state) => ({
          history: [...state.history, players.map((p) => ({ ...p }))], // clone to avoid reference issues
        })),
      clearHistory: () =>{ 
        const historyPersistKey = 'game-history-storage';
          // Remove persisted state from localStorage;
          localStorage.removeItem(`zustand-persist:${historyPersistKey}`);
        set({ history: [] });},
    }),
    {
      name: 'game-history-storage',
    }
  )
);

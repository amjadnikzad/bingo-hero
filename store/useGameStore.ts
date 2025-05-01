import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addToast } from '@heroui/toast';
import { useGameHistoryStore } from './useGameHistoryStore';

export type Player = {
  cards: number;
  name: string;
  displayName: string;
  id: string;
  gain: number;
  loss: number;
};

type GameState = {
  // Game logic
  cardValue: number;
  players: Player[];
  lineWinner: Player | null;
  cardWinner: Player | null;

  // Bingo logic
  generatedNumbers: number[];
  lastNumber: number | null;

  // Setters and actions

  assignLineWinner: (id: Player['id']) => void;
  assignCardWinner: (id: Player['id']) => void;
  setCardValue: (value: number) => void;
  setPlayers: (players: Player[]) => void;
  addPlayer: (cards: number, name: string, displayName?: string) => void;
  updatePlayer: (
    id: Player['id'],
    updates: Partial<Pick<Player, 'name' | 'displayName' | 'cards'>>
  ) => void;
  removePlayer: (id: Player['id']) => void;
  addGain: (id: Player['id'], amount: number) => void;
  resetPlayers: () => void;
  addLoss: () => void;

  // Bingo actions
  generateUniqueNumber: () => void;
  resetGeneratedNumbers: () => void;

  resetAll: () => void;

  nextRound: () => void;
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Game
      cardValue: 0,
      players: [],
      lineWinner: null,
      cardWinner: null,

      // Bingo
      generatedNumbers: [],
      lastNumber: null,

      assignLineWinner: (id) => {
        const player = get().players.find((p) => p.id === id);
        if (player) {
          set({ lineWinner: player });
          addToast({
            title: 'برنده خط تعیین شد',
            description: `${player.displayName} به عنوان برنده خط انتخاب شد.`,
            variant: 'flat',
            color: 'success',
            timeout: 3500,
          });
        }
      },

      assignCardWinner: (id) => {
        const player = get().players.find((p) => p.id === id);
        if (player) {
          set({ cardWinner: player });
          addToast({
            title: 'برنده کارت تعیین شد',
            description: `${player.displayName} به عنوان برنده کارت انتخاب شد.`,
            variant: 'flat',
            color: 'success',
            timeout: 3500,
          });
        }
      },

      setCardValue: (value) => {
        set({ cardValue: value });
        addToast({
          title: 'مقدار کارت تعیین شد',
          description: `مقدار جدید کارت: ${value} تومان`,
          variant: 'flat',
          color: 'warning',
          timeout: 4500,
        });
      },

      setPlayers: (players) => set({ players }),

      addPlayer: (cards, name, displayName) =>
        set((state) => {
          const usedIds = state.players.map((p) => Number.parseInt(p.id));
          let newId = 1;
          while (usedIds.includes(newId)) newId++;

          const player: Player = {
            id: newId.toString(),
            cards,
            name,
            displayName: displayName?.trim() ? displayName : name,
            gain: 0,
            loss: 0,
          };
          addToast({
            title: 'بازیکن جدید با موفقیت اضافه شد',
            description: ` ${player.cards} :به بازی اضافه شد \n تعداد کارت ها ${player.displayName} `,
            variant: 'flat',
            color: 'success',
            timeout: 3500,
          });
          return { players: [...state.players, player] };
        }),

      removePlayer: (id) =>
        set((state) => {
          const removedPlayer = state.players.find((p) => p.id === id);

          if (removedPlayer) {
            addToast({
              title: 'بازیکن حذف شد',
              description: `.از بازی حذف شد ${removedPlayer.displayName}`,
              variant: 'flat',
              color: 'warning',
              timeout: 3500,
            });
          }

          return {
            players: state.players.filter((p) => p.id !== id),
          };
        }),

      updatePlayer: (id, updates) =>
        set((state) => {
          return {
            players: state.players.map((player) => {
              if (player.id !== id) return player;

              const newName = updates.name ?? player.name;
              const newDisplayName =
                updates.displayName && updates.displayName.trim() !== ''
                  ? updates.displayName
                  : newName;

              addToast({
                title: 'بروزرسانی اطلاعات',
                description: `.بروزرسانی شد ${newDisplayName}اطاعات `,
                variant: 'flat',
                color: 'warning',
                timeout: 4500,
              });

              return {
                ...player,
                cards: updates.cards ?? player.cards,
                name: newName,
                displayName: newDisplayName,
              };
            }),
          };
        }),

      addGain: (id, amount) =>
        set((state) => ({
          players: state.players.map((p) =>
            p.id === id ? { ...p, gain: p.gain + amount } : p
          ),
        })),

      addLoss: () =>
        set((state) => {
          const { cardValue, players } = state;
          const updatedPlayers = players.map((player) => ({
            ...player,
            loss: player.loss + cardValue * player.cards,
          }));
          return { players: updatedPlayers };
        }),

      generateUniqueNumber: () => {
        const { generatedNumbers } = get();
        if (generatedNumbers.length >= 90) return;

        const remaining = Array.from({ length: 90 }, (_, i) => i + 1).filter(
          (n) => !generatedNumbers.includes(n)
        );
        const randomIndex = Math.floor(Math.random() * remaining.length);
        const newNumber = remaining[randomIndex];

        set({
          generatedNumbers: [...generatedNumbers, newNumber],
          lastNumber: newNumber,
        });


      },

      resetGeneratedNumbers: () => {
        set({ generatedNumbers: [], lastNumber: null });


      },
      resetPlayers: () =>
        set((state) => ({
          players: state.players.map((player) => ({
            ...player,
            gain: 0,
            loss: 0,
          })),
        })),
      nextRound: () => {
        const { players, resetPlayers,addLoss } = get();
        const addRound = useGameHistoryStore.getState().addRound;
        addRound(players);
        resetPlayers();
        addLoss();
        set({
          lineWinner: null,
          cardWinner: null,
          generatedNumbers: [],
          lastNumber: null,
        });
      },
      resetAll: () => {
        // Save current config as "last round"
        const clearGameHistory = useGameHistoryStore.getState().clearHistory;
        const persistKey = 'game-storage';
        const historyPersistKey = 'game-history-storage';
        // Remove persisted state from localStorage
        localStorage.removeItem(`zustand-persist:${persistKey}`);
        localStorage.removeItem(`zustand-persist:${historyPersistKey}`);
        clearGameHistory();
        set({
          cardValue: 0,
          players: [],
          lineWinner: null,
          cardWinner: null,
          generatedNumbers: [],
          lastNumber: null,
        });
      },
    }),

    {
      name: 'game-storage', // key in localStorage
      partialize: (state) => state, // optionally filter what to persist
    }
  )
);

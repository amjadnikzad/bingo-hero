import { create } from 'zustand'
import { addToast } from "@heroui/toast";
type Player = {
  cards: number
  name: string
  displayName: string
  id: string
  gain: number
  loss: number
} // Replace this later with actual player type

type GameState = {
  lineWinner:Player | null
  cardWinner:Player | null
  assignLineWinner:(id:Player['id'])=> void
  assignCardWinner:(id:Player['id'])=> void
  cardValue: number
  players: Player[]
  setCardValue: (value: number) => void
  setPlayers: (players: Player[]) => void
  addPlayer: (cards: number, name: string, displayName?: string) => void
  updatePlayer: (
    id: number,
    updates: Partial<Pick<Player, 'name' | 'displayName' | 'cards'>>
  ) => void
  removePlayer: (id: number) => void
  addGain: (id: number, amount: number) => void
  addLoss: (id: number, amount: number) => void
  resetGame: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  cardValue: 0,
  players: [],
  lineWinner:null,
  cardWinner:null,
  assignLineWinner: (id) => {
    const player = get().players.find((p) => p.id === id)
    if (player) {
      set({ lineWinner: player })
      addToast({
        title: 'برنده خط تعیین شد',
        description: `${player.displayName} به عنوان برنده خط انتخاب شد.`,
        variant: 'flat',
        color: 'success',
        timeout: 3500,
      })
    }
  },

  assignCardWinner: (id) => {
    const player = get().players.find((p) => p.id === id)
    if (player) {
      set({ cardWinner: player })
      addToast({
        title: 'برنده کارت تعیین شد',
        description: `${player.displayName} به عنوان برنده کارت انتخاب شد.`,
        variant: 'flat',
        color: 'success',
        timeout: 3500,
      })
    }
  },

  setCardValue: (value) => {
    addToast({
      title: 'مقدار کارت تعیین شد',
      description: `مقدار جدید کارت: ${value} تومان`,
      variant: 'flat',
      color: 'warning',
      timeout: 4500,
    });
  
    set({ cardValue: value });
  },
  setPlayers: (players) => set({ players }),

  addPlayer: (cards, name, displayName) =>
    set((state) => {
      const usedIds = state.players.map((p) => Number.parseInt(p.id));
      let newId = 1
      while (usedIds.includes(newId)) newId++

      const player: Player = {
        id: newId.toString(),
        cards,
        name,
        displayName: displayName?.trim() ? displayName : name,
        gain: 0,
        loss: 0,
      }
      addToast({ title: 'بازیکن جدید با موفقیت اضافه شد', description: ` ${player.cards} :به بازی اضافه شد \n تعداد کارت ها ${player.displayName} `, variant: "flat", color: 'success', timeout: 3500 });
      return { players: [...state.players, player] }
    }),

  removePlayer: (id) =>
    set((state) => {
      const removedPlayer = state.players.find((p) => p.id === id)

      if (removedPlayer) {
        addToast({
          title: 'بازیکن حذف شد',
          description: `.از بازی حذف شد ${removedPlayer.displayName}`,
          variant: 'flat',
          color: 'warning',
          timeout: 3500,
        })
      }

      return {
        players: state.players.filter((p) => p.id !== id),
      }
    }),
    updatePlayer: (
      id: number,
      updates: Partial<Pick<Player, 'name' | 'displayName' | 'cards'>>
    ) =>
      set((state) => {
        return {
          players: state.players.map((player) => {
            if (player.id !== id) return player;
    
            // Ensure displayName is always a string
            const newName = updates.name ?? player.name;
            const newDisplayName = 
              updates.displayName?.trim() !== '' ? updates.displayName : newName;
              addToast({
                title: 'بروز رسانی اطلاعات',
                description: `.بروزرسانی شد ${newDisplayName}اطاعات `,
                variant: 'flat',
                color: 'warning',
                timeout: 4500,
              })
            return {
              ...player,
              cards: updates.cards ?? player.cards,  // Handle card update
              name: newName,
              displayName: newDisplayName as string,  // Ensure it's a string
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

  addLoss: (id, amount) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, loss: p.loss + amount } : p
      ),
    })),

  resetGame: () => set({ cardValue: 0, players: [] }),
}))
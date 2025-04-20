import { create } from 'zustand'

type Player = {
    cards:number
    name:string
    displayName:string
    id:number
    gain:number
    loss:number
} // Replace this later with actual player type

type GameState = {
  //lineWinner
  //cardWinner
    cardValue: number
    players: Player[]
    setCardValue: (value: number) => void
    setPlayers: (players: Player[]) => void
    addPlayer: (cards: number, name: string, displayName?: string) => void
    removePlayer: (id: number) => void
    addGain: (id: number, amount: number) => void
    addLoss: (id: number, amount: number) => void
    resetGame: () => void
  }
  
  export const useGameStore = create<GameState>((set, get) => ({
    cardValue: 0,
    players: [],
  
    setCardValue: (value) => set({ cardValue: value }),
    setPlayers: (players) => set({ players }),
  
    addPlayer: (cards, name, displayName) =>
      set((state) => {
        const usedIds = state.players.map((p) => p.id)
        let newId = 1
        while (usedIds.includes(newId)) newId++
  
        const player: Player = {
          id: newId,
          cards,
          name,
          displayName: displayName ?? name,
          gain: 0,
          loss: 0,
        }
  
        return { players: [...state.players, player] }
      }),
  
    removePlayer: (id) =>
      set((state) => ({
        players: state.players.filter((p) => p.id !== id),
      })),
  
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
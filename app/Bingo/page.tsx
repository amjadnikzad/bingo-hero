'use client'
import Bingo from "@/components/Game/Bingo";
import ConfirmGameStatus from "@/components/GameStatus/ConfirmGameStatus";
import GameStatus from "@/components/GameStatus/GameStatus";
import { useGameStore } from "@/store/useGameStore";
import { addToast,closeAll} from "@heroui/toast";
import { useEffect } from "react";

export default function AboutPage() {
  const players = useGameStore((state)=>state.players);
  const cardWinner = useGameStore((state)=>state.cardWinner);
  const gameHasfinished = Boolean(cardWinner);
  useEffect(()=>{
    addToast({
      title: 'بازیکنان',
      description:`تعداد بازیکنان ${players.length} نفر میباشد`,
      variant: 'flat',
      color: 'primary',
      timeout: 5500,
    })
    return ()=>closeAll();
  },[]);
  useEffect(()=>{
    
  },[]);
  return (
    <div>
      <Bingo />
      <div className="mt-4 flex gap-4">
         <GameStatus  />
         {gameHasfinished && <ConfirmGameStatus/>}
      </div>
     
    </div>
  );
}

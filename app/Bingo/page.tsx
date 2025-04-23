'use client'
import Bingo from "@/components/Game/Bingo";
import { useGameStore } from "@/store/useGameStore";
import { addToast } from "@heroui/toast";
import { useEffect } from "react";

export default function AboutPage() {
  const players = useGameStore((state)=>state.players);
  useEffect(()=>{

    addToast({
      title: 'بازیکنان',
      description:`تعداد بازیکنان ${players.length}میباشد`,
      variant: 'flat',
      color: 'primary',
      timeout: 5500,
    })
  },[])
  return (
    <div>
      <Bingo />
    </div>
  );
}

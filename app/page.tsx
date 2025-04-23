'use client'
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import PlayersManager from "@/components/Lobby/PlayersManager";
import CardPrice from "@/components/Lobby/CardPrice";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useGameStore } from "@/store/useGameStore";
import BingoBoard from "@/components/Game/BingoBoard";
import DigitDisplay from "@/components/Game/DigitDisplay";
import { useState } from "react";
import Bingo from "@/components/Game/Bingo";
import { useRouter } from "next/navigation";

const PlayIcon = () => {
  
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
  </svg>
}

export default function Home() {
  const players  = useGameStore((state)=>state.players);
  const cardPrice = useGameStore((state)=>state.cardValue);
  const router = useRouter();
  function gameStartHandler (){
   
    const playersCount = players.length;
    if(playersCount < 2){
      addToast({
        title: '! خطا',
        description: `. تعداد بازیکنان به حد نصاب نرسیده است`,
        variant: 'flat',
        color: 'danger',
        timeout: 5500,
      })
      return;
    };
    if (!cardPrice){
      addToast({
        title: '! خطا',
        description: `. مبلغ هر کارت را مشخص کنید`,
        variant: 'flat',
        color: 'danger',
        timeout: 5500,
      })
      return;
    };
    router.push('/Bingo');
  };
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Play&nbsp;</span>
        <span className={title({ color: "violet" })}>Bingo&nbsp;</span>
      </div>

      <Button onPress={gameStartHandler} size="lg" variant="ghost" startContent={<PlayIcon/>} color="success" className="mt-36 text-xl">بینگو</Button>
      <div className="flex gap-3 mt-4">
        <PlayersManager />
        <CardPrice />
      </div>

    </section>
  );
}

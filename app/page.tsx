'use client'
import { title } from "@/components/primitives";

import PlayersManager from "@/components/Lobby/PlayersManager";
import CardPrice from "@/components/Lobby/CardPrice";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useGameStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";
import { PlayIcon } from "@/components/icons";





export default function Home() {
  const players = useGameStore((state) => state.players);
  const addLoss = useGameStore((state) => state.addLoss);
  const cardPrice = useGameStore((state) => state.cardValue);
  const router = useRouter();
  function gameStartHandler() {

    const playersCount = players.length;
    if (playersCount < 2) {
      addToast({
        title: '! خطا',
        description: `. تعداد بازیکنان به حد نصاب نرسیده است`,
        variant: 'flat',
        color: 'danger',
        timeout: 5500,
      })
      return;
    };
    if (!cardPrice) {
      addToast({
        title: '! خطا',
        description: `. مبلغ هر کارت را مشخص کنید`,
        variant: 'flat',
        color: 'danger',
        timeout: 5500,
      })
      return;
    };

    addLoss();

    router.push('/Bingo');
  };
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Play&nbsp;</span>
        <span className={title({ color: "violet" })}>Bingo&nbsp;</span>
      </div>
      <Button onPress={gameStartHandler} size="lg" variant="ghost" startContent={<PlayIcon />} color="success" className="mt-36 text-xl">بینگو</Button>
      <div className="flex gap-3 mt-4">
        <PlayersManager />
        <CardPrice />
      </div>

    </section>
  );
}

import { useGameStore } from "@/store/useGameStore";
import { Select, SelectItem, useDisclosure,useSelect } from "@heroui/react";
import { useRef, useState } from "react";
import { useBingo } from "./BingoContext";
import confetti from "canvas-confetti";

import LineWinSelect from "./lineWinSelect";
import CardWinSelect from "./cardWinSelect";


export default function Winners() {
    const players = useGameStore((state) => state.players );
    const { generatedNumbers } = useBingo();
    const generatedNumbersCount = generatedNumbers.length;
    const [lineWin,setLineWin] = useState<any>(undefined);
    const [cardWin,setCardWin] = useState<any>(null);
    console.log(cardWin);
    const handleWin = () => {
        const duration = 6.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
     
        const randomInRange = (min: number, max: number) =>
          Math.random() * (max - min) + min;
     
        const interval = window.setInterval(() => {
          const timeLeft = animationEnd - Date.now();
     
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
     
          const particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);
      };
    
    if(cardWin) handleWin();
    
 
    return (
        <div className="flex justify-between mt-20 gap-8">
           
            {/* <Select 
            isDisabled={lineWin || generatedNumbersCount<5}
            isOpen={!lineWin}
            onChange={()=>{}}
            onSelectionChange={()=>{}}
            items={players}
            selectedKeys={[lineWin]}
            className="max-w-3xl w-[180px]"
             label="برنده خط">
                {(player)=>(
                  <SelectItem  key={player.id} textValue={player.displayName}>
                    <AprroveAction actionTitle="برنده خط" handleChange={handleLineWinnerValueChange} player={player} successAction={assignLineWinner} renderButton={(mh)=><p onClick={mh}>{player.displayName}</p>} />
                  </SelectItem>
                )}
            </Select> */}
                     <LineWinSelect />
                     <CardWinSelect />
            {/* <Select 
            isDisabled={cardWin || !lineWin || generatedNumbersCount<15}
            selectedKeys={cardWin}
            onSelectionChange={setCardWin}
            className="max-w-3xl w-[180px]"
             label="برنده کارت">
                {players.map((player) => (
                    <SelectItem key={player.id}>{player.displayName}</SelectItem>
                ))}
            </Select> */}
        </div>
    )
};
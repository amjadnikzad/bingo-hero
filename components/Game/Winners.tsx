import { useGameStore } from "@/store/useGameStore";
import { Select, SelectItem, useDisclosure } from "@heroui/react";
import { useRef, useState } from "react";
import { useBingo } from "./BingoContext";
import confetti from "canvas-confetti";
import AprroveAction from "../ApproveAction";
import ApproveAction from "../ApproveAction";


export default function Winners() {
    const players = useGameStore((state) => state.players );
    const assignLineWinner = useGameStore((state)=> state.assignLineWinner);
    const assignCardWinner = useGameStore((state)=> state.assignCardWinner);
    const lineWinAnimationShowed = useRef(false);
    const { generatedNumbers } = useBingo();
    const generatedNumbersCount = generatedNumbers.length;
    const [lineWin,setLineWin] = useState<any>(null);
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
    const handleLineWin = () => {
        const end = Date.now() + 2 * 1000; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
     
        const frame = () => {
          if (Date.now() > end) return;
     
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors,
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors,
          });
     
          requestAnimationFrame(frame);
        };
     
        frame();
      }
    if(cardWin) handleWin();
    if(lineWin && !lineWinAnimationShowed.current) {
        handleLineWin()
        lineWinAnimationShowed.current = true;
    };
   
    
   
    return (
        <div className="flex justify-between mt-20 gap-8">
           
            {/* <Select 
            isDisabled={}
            items={players}
            selectedKeys={lineWin}
            className="max-w-3xl w-[180px]"
             label="برنده خط">
                {(player)=>(
                  <SelectItem onPress={()=>{}} key={player.id} textValue={player.displayName}>
                    <AprroveAction actionTitle="برنده خط" player={player} successAction={assignLineWinner} renderButton={rf} />
                  </SelectItem>
                )}
            </Select> */}
             <Select 
            isDisabled={lineWin || generatedNumbersCount<5}
            selectedKeys={lineWin}
            onSelectionChange={setLineWin}
            className="max-w-3xl w-[180px]"
             label="برنده خط">
                {players.map((player) => (
                    <SelectItem key={player.id}>{player.displayName}</SelectItem>
                ))}
            </Select>
            <Select 
            isDisabled={cardWin || !lineWin || generatedNumbersCount<15}
            selectedKeys={cardWin}
            onSelectionChange={setCardWin}
            className="max-w-3xl w-[180px]"
             label="برنده کارت">
                {players.map((player) => (
                    <SelectItem key={player.id}>{player.displayName}</SelectItem>
                ))}
            </Select>
        </div>
    )
};
'use client'
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Select, SelectItem } from "@heroui/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button, useDisclosure } from "@heroui/react"; // assuming you use Hero UI modal
import { useGameStore } from "@/store/useGameStore";
import confetti from "canvas-confetti";
import { useBingo } from "./BingoContext";


export default function LineWinSelect() {
  const players = useGameStore((state)=>state.players);
  const setLineWinner = useGameStore((state)=> state.assignLineWinner);
  const lineWinner = useGameStore((state)=> state.lineWinner);
  const cardPrice = useGameStore((state)=> state.cardValue);
  const addGain = useGameStore((state)=> state.addGain);
  const allCards = players.reduce((acc,player)=>{
    return acc+player.cards;
  },0);
  const gameValue = allCards * cardPrice ;
  const lineWinGain = gameValue * 3 / 10;
  const generatedNumbers = useGameStore((state)=> state.generatedNumbers);
  const generatedNumbersCount = generatedNumbers.length;
  
  const lineWinAnimationShowed = useRef(false);
  const handleLineWin = () => {
    const end = Date.now() + 4 * 1000; // 3 seconds
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
  };
  const [playWinEffect,setPlayWinEffect] = React.useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [pendingKey, setPendingKey] = React.useState<string|null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // guard for server-side
    if (!playWinEffect) return;
    const audio = new Audio("/sounds/ameneh.mp3");
    handleLineWin();
    audio.play();
    setPlayWinEffect(false)
  }, [playWinEffect]);

  const { isOpen, onOpen, onClose } = useDisclosure();

//   if(selectedKeys.size>0 && !lineWinAnimationShowed.current) {
//     handleLineWin();
//     lineWinAnimationShowed.current = true;
//     setplayWinEffect(true);
// };
  
  const handleSelectionChange = (newKeys) => {
    const newKey = [...newKeys][0];
    setPendingKey(newKey);
    onOpen(); // open modal for confirmation
  };

  const confirmSelection = () => {
    setSelectedKeys(new Set([pendingKey]));
    if(pendingKey === null) return;
    setLineWinner(pendingKey);
    addGain(pendingKey,lineWinGain);
    setPlayWinEffect(true);
    setPendingKey(null);
    onClose();
  };

  const cancelSelection = () => {
    setPendingKey(null);
    onClose();
  };

  useLayoutEffect(()=>{
    if(lineWinner) setSelectedKeys(new Set([lineWinner.id]));
  },[lineWinner]);
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        className="max-w-3xl w-[180px]"
        isDisabled={selectedKeys.size>0 || generatedNumbersCount<5}
        label="برنده خط"
        placeholder="برنده خط را مشخص کنید"
        selectedKeys={selectedKeys}
        variant="bordered"
        onSelectionChange={handleSelectionChange}
      >
        {players.map((player) => (
          <SelectItem key={player.id}>{player.displayName}</SelectItem>
        ))}
      </Select>

      

      <Modal isOpen={isOpen} onClose={cancelSelection}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">مدیریت بازیکنان</ModalHeader>
                            <ModalBody>
                                <p className="text-bold text-lg mb-4"> برنده خط شده است؟ {players.find((a) => a.id === pendingKey)?.displayName} آیا</p>
                                <div className='flex gap-4 justify-center mb-6'> 
                                    <Button variant="solid" color='danger' onPress={confirmSelection}>بله</Button>
                                    <Button variant="ghost" color='default' onPress={cancelSelection}>لغو</Button>
                                </div>
                            </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

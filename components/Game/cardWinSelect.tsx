'use client'
import React, { useRef } from "react";
import { Select, SelectItem } from "@heroui/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button, useDisclosure } from "@heroui/react"; // assuming you use Hero UI modal
import { useGameStore } from "@/store/useGameStore";
import confetti from "canvas-confetti";
import { useBingo } from "./BingoContext";


export default function CardWinSelect() {
  const players = useGameStore((state)=>state.players);
  const setCardWinner = useGameStore((state)=> state.assignCardWinner);
  const { generatedNumbers } = useBingo();
    const generatedNumbersCount = generatedNumbers.length;
  const cardWinAnimationShowed = useRef(false);
  const lineWinner = useGameStore((state)=> state.lineWinner);
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

 
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [pendingKey, setPendingKey] = React.useState<string|null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if(selectedKeys.size>0 && !cardWinAnimationShowed.current) {
    handleWin();
    cardWinAnimationShowed.current = true;
};
  
  const handleSelectionChange = (newKeys) => {
    const newKey = [...newKeys][0];
    setPendingKey(newKey);
    onOpen(); // open modal for confirmation
  };

  const confirmSelection = () => {
    setSelectedKeys(new Set([pendingKey]));
    console.log(typeof(pendingKey));
    if(pendingKey === null) return;
    setCardWinner(pendingKey);
    setPendingKey(null);
    onClose();
  };

  const cancelSelection = () => {
    setPendingKey(null);
    onClose();
  };
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        className="max-w-3xl w-[180px]"
        isDisabled={selectedKeys.size>0 || !Boolean(lineWinner) || generatedNumbersCount<15 }
        label="برنده کارت"
        placeholder="برنده کارت را مشخص کنید"
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
          <ModalHeader className="flex flex-col gap-1">مدیریت بازی</ModalHeader>
                            <ModalBody>
                                <p className="text-bold text-lg mb-4"> برنده کارت شده است؟ {players.find((a) => a.id === pendingKey)?.displayName} آیا</p>
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

'use client'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
} from "@heroui/react";

import { useGameStore } from "@/store/useGameStore";
import { LightBulbIcon } from "../icons";
import { useRouter } from "next/navigation";
import ConfirmPlayersForm from "./ConfirmPlayersForm";





export default function ConfirmGameStatus() {
    const router = useRouter();

    const players = useGameStore((state) => state.players);

    const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();
    const { isOpen:io, onOpen:oo, onOpenChange:ooc,onClose:oc } = useDisclosure();
    console.log(players);

    const finishGame = useGameStore((state)=> state.resetAll);
   
    const gameOverHandler = ()=>{
        finishGame();
        router.push('/');
    };
    const nextRoundHandler = ()=>{
        oo();
    };

    return (
        <>
            <Button color="secondary" startContent={<LightBulbIcon />} className="text-xl mt-4" size="md" onPress={onOpen}>تعیین وضعیت بازی</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent dir="rtl">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"> وضعیت بازی</ModalHeader>
                            <ModalBody>
                                <p className="text-bold text-lg mb-4">راند فعلی پایان یافته است،وضعیت بازی را مشخص کنید</p>
                                <div className='flex gap-4 justify-center mb-6'>
                                    <Button variant="solid" color='danger' onPress={nextRoundHandler}>راند بعدی</Button>
                                    <Button variant="ghost" color='default' onPress={gameOverHandler}>اتمام بازی</Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={io} onOpenChange={ooc}>
                <ModalContent dir="rtl">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">مدیریت بازیکنان</ModalHeader>
                            <ModalBody>
                               <ConfirmPlayersForm />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
};
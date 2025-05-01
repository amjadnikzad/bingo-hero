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
import GameDetailTable from "./GameDetailTable";
import { EyeIcon } from "../icons";







export default function PlayersManager() {
    const players = useGameStore((state)=> state.players);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    console.log(players);

    
   
    return (
        <>
            <Button color="primary" startContent={<EyeIcon />} className="text-xl mt-4" size="md"  onPress={onOpen}>نمایش وضعیت بازی</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent dir="rtl">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"> وضعیت بازی</ModalHeader>
                            <ModalBody>
                               <GameDetailTable/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
};
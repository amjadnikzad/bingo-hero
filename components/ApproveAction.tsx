'use client'
import { useGameStore } from "@/store/useGameStore";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
} from "@heroui/react";

import { ReactElement, useState } from 'react';

type ButtonProps = {

};
type Player = {
    name: string;
    displayName?: string;
    cards: number;
    id:number
  };

type AddPlayerFormProps = {
    renderButton:(modalHandler:()=>void) => ReactElement<ButtonProps>;
    actionTitle:string;
    successAction:(id:number)=>void;
    player:Player
}



  
const PlusIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>
    );
};

export default function AprroveAction(props:AddPlayerFormProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const button = props.renderButton(onOpen);
    const deletePlayer = useGameStore((state)=>state.removePlayer);
    const approveHandler = ()=>{
        props.successAction(props.player.id);
    };
    return (
        <>
            {button}
            <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent dir="rtl">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{props.actionTitle}</ModalHeader>
                            <ModalBody>
                                <p className="text-bold text-lg mb-4">آیا اطمینان دارید که{props.player.name} برنده شده است؟</p>
                                <div className='flex gap-4 justify-center mb-6'> 
                                    <Button variant="solid" color='danger' onPress={approveHandler}>بله</Button>
                                    <Button variant="ghost" color='default' onPress={onClose}>خیر</Button>
                                </div>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
};
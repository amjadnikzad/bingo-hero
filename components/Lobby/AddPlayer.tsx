'use client'
import { useGameStore } from "@/store/useGameStore";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
    Form,
    Input,
    NumberInput
} from "@heroui/react";

import { ReactElement, useState } from 'react';

type ButtonProps = {

};
type AddPlayerFormProps = {
    renderButton:(modalHandler:()=>void) => ReactElement<ButtonProps>;
}

type PlayerFormData = {
    name: string;
    displayName?: string;
    cards: number;
  };

  
const PlusIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>
    );
};

export default function AddPlayer(props:AddPlayerFormProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const button = props.renderButton(onOpen);
   
    const [form, setForm] = useState<PlayerFormData>({
        name: '',
        displayName: '',
        cards: 1,
      });
    const [errors, setErrors] = useState({});

    const addPlayer = useGameStore((state)=>state.addPlayer);
    // Real-time password validation
    const getCardsError = (value) => {
        if (value <= 0) {
            return "لطفا مقدار صحیح وارد کنید";
        }
        if (!Number.isInteger(value)) {
            return "لطفا مقدار صحیح وارد کنید";
        }
        return null;
    };
    const getNameError  = (value) => {
        if (value.length <= 3) {
            return "نام باید طولانی تر از 3 حرف باشد";
        }

        return null;
    };

    const getDisplayNameError  = (value) => {
        if (value.length <= 3 && form.displayName !== null && form.displayName !== "") {
            return "نام باید طولانی تر از 3 حرف باشد";
        }

        return null;
    };
    const onSubmit = (e) => {
        e.preventDefault();

        // Custom validation checks
        const newErrors = {};

        
        const nameError = getNameError(form.name);

        if (nameError) {
            newErrors.name = nameError;
        }

        // Username validation
        const displayNameError = getDisplayNameError(form.displayName);

        if (displayNameError) {
            newErrors.displayName = displayNameError;
        }

        const cardsError = getCardsError(form.cards);

        if (cardsError) {
            newErrors.cards = cardsError;
        }

       
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            return;
        }
        // Clear errors and submit
        setErrors({});
        addPlayer(form.cards,form.name,form.displayName);
        setForm({
            name: '',
            displayName: '',
            cards: 1,
          });

    };
    
    return (
        <>
            {button}
            <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent dir="rtl">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">اضافه کردن بازیکن جدید</ModalHeader>
                            <ModalBody>
                                <Form
                                    className="w-full justify-center items-center space-y-4"
                                    validationErrors={errors}
                                    onSubmit={onSubmit}
                                >
                                    <div className="flex flex-col gap-4 w-[250px]">
                                        <Input
                                            isRequired
                                            value={form.name}
                                            errorMessage={getNameError(form.name)}
                                            isInvalid={getNameError(form.name) !== null}
                                            onValueChange={(value) => setForm(prev => ({ ...prev, name: value }))}
                                            label="نام"
                                            labelPlacement="outside"
                                            name="name"
                                            placeholder="نام را وارد کنید"
                                        />

                                        <Input

                                            errorMessage={getDisplayNameError(form.displayName)}
                                            label="نام نمایشی"
                                            labelPlacement="outside"
                                            value={form.displayName}
                                            isInvalid={getDisplayNameError(form.displayName) !== null}
                                            onValueChange={(value) => setForm(prev => ({ ...prev, displayName: value }))}
                                            name="displayName"
                                            placeholder="نام نمایشی را وارد کنید"

                                        />
                                        <NumberInput
                                            className="max-w-xs"
                                            defaultValue={1}
                                            value={form.cards}
                                            onValueChange={(value) => setForm(prev => ({ ...prev, cards: value }))}
                                            isInvalid={getCardsError(form.cards) !== null}
                                            errorMessage={getCardsError(form.cards)}
                                            label="تعداد کارت"
                                            labelPlacement="outside"
                                            placeholder="تعداد کارت های بازیکن را وارد کنید"
                                            variant="bordered"
                                        />



                                        <div className="flex gap-4 mb-4 justify-center">
                                            <Button color="success" variant="solid" startContent={<PlusIcon />} className="w-3/5" type="submit">
                                                ثبت
                                            </Button>
                                            
                                        </div>
                                    </div>

                                </Form>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
};
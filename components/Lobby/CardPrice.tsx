'use client'
import { useGameStore } from "@/store/useGameStore";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Form,
    NumberInput,
} from "@heroui/react";
import { useState } from "react";






const MoneyIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
};

export default function CardPrice() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [cardPrice, setCardPrice] = useState<number>(10000);
    const [errors, setErrors] = useState({});
    
    const setCardValue = useGameStore((state)=>state.setCardValue);
    // Real-time password validation
    const getCardPriceError = (value) => {
        if (value <= 0) {
            return "لطفا مقدار صحیح وارد کنید";
        }
        if (!Number.isInteger(value)) {
            return "لطفا مقدار صحیح وارد کنید";
        }
        return null;
    };
    
    
  
    const onSubmit = (e) => {
        e.preventDefault();
    
        // Custom validation checks
        const newErrors = {};
    
        
        const nameError = getCardPriceError(cardPrice);
    
        if (nameError) {
            newErrors.name = nameError;
        }
    
        
       
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
    
            return;
        }
        // Clear errors and submit
        setErrors({});
        setCardValue(cardPrice);
        
    
    };
    
    return (
        <>
            <Button color="secondary" startContent={<MoneyIcon />} className="text-xl" size="lg" onPress={onOpen}>مبلغ کارت</Button>
            <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent dir="rtl">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">مبلغ کارت</ModalHeader>
                            <ModalBody>
                                <Form
                                    className="w-full justify-center items-center space-y-4"
                                    validationErrors={errors}
                                    onSubmit={onSubmit}
                                >
                                    <div className="flex flex-col gap-4 w-[250px]">
                                        <NumberInput
                                            className="max-w-xs"
                                            defaultValue={10000}
                                            value={cardPrice}
                                            onValueChange={(value) => setCardPrice(value)}
                                            isInvalid={getCardPriceError(cardPrice) !== null}
                                            errorMessage={getCardPriceError(cardPrice)}
                                            label="ارزش هر کارت"
                                            labelPlacement="outside"
                                            placeholder="ارزش کارت را مشخص کنید"
                                            variant="bordered"
                                            step={1000}
                                        />

                                        <div className="flex gap-4 mb-4 justify-center">
                                            <Button color="success" variant="solid"  className="w-3/5" type="submit">
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



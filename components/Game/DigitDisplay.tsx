"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Orbitron } from "next/font/google";
import { useBingo } from "./BingoContext";
import { Button } from "@heroui/button";

const orbitron = Orbitron({
    weight: "700",
    subsets: ["latin"],
    display: "swap",
});

type DigitDisplayProps = {
};

const DigitDisplay: React.FC<DigitDisplayProps> = () => {
    const { lastNumber,generateUniqueNumber } = useBingo();
    const [displayValue, setDisplayValue] = useState(lastNumber);
    const [isBlinking, setIsBlinking] = useState(false);
    const prevNumber = useRef(lastNumber);
    
    //check if useEffect is needed
    useEffect(() => {
        if (prevNumber.current !== lastNumber) {
            setIsBlinking(true);
            setDisplayValue(lastNumber);
            const timeout = setTimeout(() => {
                prevNumber.current = lastNumber;
                setIsBlinking(false);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [lastNumber, prevNumber.current]);
    const valueString = displayValue.toString().padStart(2, "0");

    return (
        <div className="flex flex-col items-center justify-center">

            <div className="flex space-x-6 p-4 w-fit rounded-3xl backdrop-blur-sm bg-transparent">
                {valueString.split("").map((digit, index) => (
                    <div
                        key={index}
                        className={clsx(
                            "w-24 h-36 flex items-center justify-center text-[8rem] font-bold rounded-2xl",
                            "border border-white/10",
                            "backdrop-blur-md",
                            "bg-transparent",
                            "text-shadow-neon transition-all duration-300",
                            orbitron.className,
                            isBlinking
                                ? "text-red-400 animate-blink shadow-orange-400/60"
                                : "text-orange-400 shadow-orange-400/60"
                        )}
                    >
                        {digit}
                    </div>
                ))}
            </div>
            <div>
                <Button onPress={generateUniqueNumber} size="md" variant="shadow" color="warning">BINGO</Button>
            </div>

        </div>
    );
};

export default DigitDisplay;

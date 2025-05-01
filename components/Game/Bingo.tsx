'use client'
import BingoBoard from "./BingoBoard";
import { BingoProvider } from "./BingoContext";
import DigitDisplay from "./DigitDisplay";
import Winners from "./Winners";

export default function Bingo() {

    

    return (
        <BingoProvider >
            <div className="flex flex-row gap-24 items-center justify-center">
                <BingoBoard />
                <div className="flex flex-col gap-8">
                    <DigitDisplay />
                    <Winners />
                </div>
            </div>
        </BingoProvider>
    )
};
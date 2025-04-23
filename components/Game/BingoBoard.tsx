import React, { useState, useEffect } from 'react';
import { useBingo } from './BingoContext';

interface BingoCellProps {
  number: number;
  isLit: boolean;
  isLastLit: boolean;
}

const BingoCell: React.FC<BingoCellProps> = ({ number, isLit, isLastLit }) => {
  const [blink, setBlink] = useState(false);
  

  useEffect(() => {
    if (isLastLit) {
      setBlink(true);
      const timer = setTimeout(() => {
        setBlink(false);
      }, 3000);
      return () => {
        setBlink(false);
        clearTimeout(timer);
      };
    }
  }, [isLastLit]);

  return (
    <div
      className={`
        w-[35px] h-[35px] border border-gray-400 flex items-center justify-center cursor-pointer select-none transition-all duration-300 rounded-md
        ${isLit ? (isLastLit ? 'bg-orange-500 text-white' : 'bg-green-500 text-white') : 'bg-white text-gray-800'}
        ${blink ? 'animate-blink' : ''}
      `}
    >
      {number}
    </div>
  );
};

const BingoBoard: React.FC = () => {
  // const [litNumbers, setLitNumbers] = useState<number[]>([]);
  
  // const [lastLitNumber, setLastLitNumber] = useState<number | null>(null);
  const { lastNumber,generatedNumbers } = useBingo();
  const litNumbers = generatedNumbers;
  const lastLitNumber = lastNumber;
  // const handleLit = (number: number) => {
  //   if (!litNumbers.includes(number)) {
  //     setLitNumbers([...litNumbers, number]);
  //     setLastLitNumber(number);
  //   }
  // };

  // useEffect(() => {
  //   if(litNumbers.length === 0) {
  //     setLastLitNumber(null);
  //   }
  // },[litNumbers])

  const numbers = Array.from({ length: 90 }, (_, i) => i + 1);

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-10 gap-2">
        {numbers.map((number) => (
          <BingoCell
            key={number}
            number={number}
            isLit={litNumbers.includes(number)}
            isLastLit={lastLitNumber === number}
           
          />
        ))}
      </div>
      <style jsx>{`
        .animate-blink {
  animation: pulse-blink 1s ease-in-out 3;
}

@keyframes pulse-blink {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0px rgba(255, 165, 0, 0.7);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 165, 0, 0.9);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0px rgba(255, 165, 0, 0.7);
  }
}
      `}</style>
    </div>
  );
};

export default BingoBoard;
import React, { createContext, useContext, useState } from "react";

type BingoContextType = {
  lastNumber: number | null;
  generatedNumbers: number[];
  generateUniqueNumber: () => void;
  resetGame: () => void;
};

const BingoContext = createContext<BingoContextType | undefined>(undefined);

export const BingoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const lastNumber = generatedNumbers[generatedNumbers.length - 1] ?? 0;

  const generateUniqueNumber = () => {
    if (generatedNumbers.length >= 90) return;
    const remaining = Array.from({ length: 90 }, (_, i) => i + 1).filter(
      (n) => !generatedNumbers.includes(n)
    );
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const newNumber = remaining[randomIndex];
    setGeneratedNumbers((prev) => [...prev, newNumber]);
  };

  const resetGame = () => {
    setGeneratedNumbers([]);
  };

  return (
    <BingoContext.Provider value={{ lastNumber, generatedNumbers, generateUniqueNumber, resetGame }}>
      {children}
    </BingoContext.Provider>
  );
};

export const useBingo = () => {
  const context = useContext(BingoContext);
  if (!context) throw new Error("useBingo must be used within a BingoProvider");
  return context;
};

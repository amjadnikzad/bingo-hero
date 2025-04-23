import { useGameStore } from "@/store/useGameStore";
import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";


export default function Winners() {
    const players = useGameStore((state) => state.players );


    const [lineWin,setLineWin] = useState<any>(null);
    const [cartWin,setCartWin] = useState<any>(null);

    return (
        <div className="flex justify-between mt-20 gap-8">
            <Select 
            isDisabled={lineWin}
            selectedKeys={lineWin}
            onSelectionChange={setLineWin}
            className="max-w-xs"
             label="برنده خط">
                {players.map((player) => (
                    <SelectItem key={player.id}>{player.displayName}</SelectItem>
                ))}
            </Select>

            <Select 
            isDisabled={cartWin || !lineWin}
            selectedKeys={cartWin}
            onSelectionChange={setCartWin}
            className="max-w-xs"
             label="برنده کارت">
                {players.map((player) => (
                    <SelectItem key={player.id}>{player.displayName}</SelectItem>
                ))}
            </Select>
        </div>
    )
};
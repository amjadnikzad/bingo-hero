'use Client'
import React from "react";
import { useGameStore } from "@/store/useGameStore";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    User,
    Tooltip,
} from "@heroui/react";
import AddPlayer from "./AddPlayer";
import { cn, formatWithSeparator } from "@/lib/utils";
import { useGameHistoryStore } from "@/store/useGameHistoryStore";



export const DeleteIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M8.60834 13.75H11.3833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.91669 10.4167H12.0834"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const EditIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M2.5 18.3333H17.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const columns = [
    { name: "نام", uid: "name" },
    { name: "بدهی", uid: "totalLoss" },
    { name: "بستانکاری", uid: "totalGain" },
    { name: "مجموع", uid: "net" }
];






export const PlusIcon = ({ size = 24, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <path d="M6 12h12" />
                <path d="M12 18V6" />
            </g>
        </svg>
    );
};






export default function GameDetailTable() {

    const players = useGameStore((state) => state.players);
    const history = useGameHistoryStore((state) => state.history);
    console.log(history);
    console.log("-------------");
    console.log(players);
    function Accounting() {

        // Combine history and current round into a single array of rounds
        const allRounds = [...history, players];

        // Dictionary to accumulate by player ID
        const reportMap: Record<string, {
            name: string;
            displayName: string;
            totalGain: number;
            totalLoss: number;
            net: number;
        }> = {};

        allRounds.forEach((round) => {
            round.forEach((player) => {
                if (!reportMap[player.id]) {
                    reportMap[player.id] = {
                        name: player.name,
                        displayName: player.displayName,
                        totalGain: 0,
                        totalLoss: 0,
                        net: 0,
                    };
                }

                reportMap[player.id].totalGain += player.gain;
                reportMap[player.id].totalLoss += player.loss;
                reportMap[player.id].net += player.gain - player.loss;
            });
        });

        const finalReport = Object.entries(reportMap).map(([id, data]) => ({
            id,
            ...data,
        }));

        console.table(finalReport);
        return finalReport;
    };
    const formatedPlayers = Accounting();

    const headerColumns = columns;

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User

                        classNames={{
                            description: "text-default-500",
                        }}
                        name={user.displayName}
                    />
                );
            case "totalGain":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{formatWithSeparator(cellValue)}</p>
                    </div>
                );
            case "totalLoss":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{formatWithSeparator(cellValue)}</p>
                    </div>
                );
            case "net":
                return (
                    <div className="flex flex-col">
                        <p className={cn(
                            "font-bold text-sm capitalize",
                            Number(cellValue) > 0 ? "text-green-500" : "text-red-500" // conditional class
                        )}>{cellValue >= 0 ? formatWithSeparator(cellValue) : (formatWithSeparator(-cellValue)) + ' -'}</p>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);



    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">


                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {players.length} players</span>
                </div>
            </div>
        );
    }, [
        players.length,
    ]);



    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-3xl"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]/tr:first:before:rounded-none",
                "group-data-[first=true]/tr:last:before:rounded-none",
                // middle
                "group-data-[middle=true]/tr:before:rounded-none",
                // last
                "group-data-[last=true]/tr:first:before:rounded-none",
                "group-data-[last=true]/tr:last:before:rounded-none",
            ],
        }),
        [],
    );

    return (
        <Table

            isCompact
            removeWrapper
            aria-label="لیست بازیکنان"
            checkboxesProps={{
                classNames: {
                    wrapper: "after:bg-foreground after:text-background text-background",
                },
            }}
            classNames={classNames}
            selectionMode="none"
            topContent={topContent}
            topContentPlacement="outside"


        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"هیچ بازیکنی انتخاب نشده است."} items={formatedPlayers}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );


};





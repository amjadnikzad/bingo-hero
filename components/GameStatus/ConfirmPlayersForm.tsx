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
import EditPlayer from "../Lobby/EditPlayer";
import AddPlayer from "../Lobby/AddPlayer";
import { useGameHistoryStore } from "@/store/useGameHistoryStore";
import { useRouter } from "next/navigation";







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
    { name: "تعداد کارت", uid: "cards", },
    { name: "مدیریت بازیکن", uid: "actions" },
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




export default function ConfirmPlayersForm() {

    const players = useGameStore((state) => state.players);
    

    const headerColumns = columns;
    const router = useRouter();
    const nextRound = useGameStore((state)=>state.nextRound);
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
            case "cards":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-around items-center gap-2">
                        <EditPlayer player={user} renderButton={(modalHandler) => {
                            return <Tooltip color="warning" content="Edit user">
                                <span onClick={modalHandler} className="text-lg text-waring cursor-pointer active:opacity-50">
                                    <EditIcon />
                                </span>
                            </Tooltip>
                        }} />
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);
    // <DeletePlayer player={user} renderButton={(modalHandler) => <Button size="sm" className="bg-foreground text-background" onPress={modalHandler} endContent={<PlusIcon />}>حذف</Button>} />



    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">

                    <div className="flex gap-3">

                        {/* <Button className="bg-foreground text-background" endContent={<PlusIcon />} size="sm">
              Add New
            </Button> */}
                        <AddPlayer renderButton={(modalHandler) => <Button size="sm" className="bg-foreground text-background" onPress={modalHandler} endContent={<PlusIcon />}>اضافه کردن بازیکن</Button>} />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {players.length} players</span>
                </div>
            </div>
        );
    }, [
        players.length,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            
                
                    <Button onPress={()=>{
                        // router.push('/Bingo');
                        // router.refresh();
                        window.location.href = '/Bingo'; // Full reload
                        nextRound();
                    }} className="bg-foreground text-background w-[65%] mx-auto"  size="sm">
                        آغاز راند
                    </Button>


                
        );
    }, []);



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
            bottomContent={bottomContent}
            bottomContentPlacement="outside"

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
            <TableBody emptyContent={"هیچ بازیکنی انتخاب نشده است."} items={players}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );


};





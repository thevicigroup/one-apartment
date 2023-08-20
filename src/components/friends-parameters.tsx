import React, {useState} from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface Props {
    open: boolean;
    onClose: () => void;
    parameters: { key: string; value: string }[];
}



const FriendsParameters: React.FC<Props> = ({ open, onClose, parameters }) => {
    return (
        <AlertDialog>
        <AlertDialogTrigger>
            <Button className="w-full flex justify-center py-5 bg-green-400">
                Create New Group
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white w-content">
            <AlertDialogHeader className="font-bold">
                Create New Group Here
            </AlertDialogHeader>
            <Separator></Separator>
            <div className="flex flex-col gap-2">
                <label className="font-bold">Group Name</label>
                <input
                    type="text"
                    className="rounded-md border border-gray-300 p-2"
                />
            </div>
            <Separator></Separator>
            <ScrollArea>
                <Table className="table-auto">
                    <TableHeader className="bg-blue-300">
                        <TableRow>
                            <TableHead className="w-[200px] font-bold">
                                Friends
                            </TableHead>
                            <TableHead className="w-[75px] font-bold">
                                Add To Group
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableRow>
                        <TableCell>DYNAMIC LIST OF FRIENDS HERE</TableCell>
                        <TableCell>
                            <Button className="w-full flex justify-center py-5 bg-green-400">
                                Add
                            </Button>
                        </TableCell>
                    </TableRow>

                    <TableBody></TableBody>
                </Table>
            </ScrollArea>
            <Separator></Separator>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-green-400">
                    Create
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    );
  };
  
  export default FriendsParameters;
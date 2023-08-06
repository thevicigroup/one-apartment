"use client";

import { Button } from "@mui/material";
import { Friend } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";

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

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface Props {
    groupInfo?: Friend;
}

const leaveGroup = () => {
    <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>No</AlertDialogCancel>
                <AlertDialogAction>Yes</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>;
};

export const GroupCard: React.FC<Props> = ({ groupInfo }) => {
    const message = "Are you sure you want to do this?";
    const buttons = [
        {
            label: "Cancel",
            click: () => {
                // do nothing
            },
        },
        {
            label: "Yes",
            click: () => {
                // do something
            },
        },
    ];

    const name = "Group Name";
    const members = ["Nick", "Jack", "Brian", "Justin", "Kyle", "Zach"];

    return (
        <Card>
            <CardHeader>
                <div className="flex-row">
                    <div>
                        <CardTitle>{name}</CardTitle>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-lg font-bold ">Group Members:</p>
                <ScrollArea className="w-full rounded-md grid grid-cols-2">
                    {members?.map((item, i) => (
                        <div>{members[i]}</div>
                    ))}
                </ScrollArea>
            </CardContent>

            <CardFooter>
                <Button className="mr-2" variant="contained" onClick={leaveGroup}>
                    Leave Group
                </Button>
            </CardFooter>
        </Card>
    );
};

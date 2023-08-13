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

export const GroupCard: React.FC<Props> = ({ groupInfo }) => {
    // const groupName = groupInfo.name
    // const groupMembers = groupInfo.members
    const name = "Group Name";
    const members = [
        "Nick Mirabile",
        "Jack Quinlan",
        "Brian Giusti",
        "Justin Blanchard",
        "Kyle Heavey",
        "Zach Rogers",
    ];

    return (
        <Card>
            <CardHeader className="h-20 mx-auto pb-0">
                <div className="flex-row">
                    <div>
                        <CardTitle>{name}</CardTitle>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <p className="text-lg font-bold">Group Members:</p>
                <ScrollArea className="rounded-md grid grid-cols-2 gap-x-6">
                    {members?.map((item, i) => (
                        <div>{members[i]}</div>
                    ))}
                </ScrollArea>
            </CardContent>

            <CardFooter>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button className="mr-2" variant="contained">
                            Leave Group
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you sure you want to leave this group?
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>No</AlertDialogCancel>
                            <AlertDialogAction>Yes</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
};

"use client";

import { Button } from "@mui/material";
import { Friend } from "@prisma/client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
    friendsInfo?: Friend;
}

export const FriendsCard: React.FC<Props> = ({ friendsInfo }) => {

    // const name = friendsInfo.name;
    // const sharedGroups = friendsInfo.sharedGroups;
    // const occupation = friendsInfo.occupation;
    // TODO: Change all the default values to friendsInfo.name, .id...etc
    const sharedGroups = [1, 2, 3, "this is dynamic"];
    const name = "Nicholas Mirabile";
    const occupation = "Aerospace Research Engineer";
    const uniqueKey = '1'
    return (
        <Card>
            <CardHeader>
                <div className="flex-row">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>{occupation}</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardFooter>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Card>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Button className="mr-2 w-auto" variant="contained">
                                        Remove Friend
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <p className="text-lg font-bold ">Your Shared Groups:</p>
                                    <ScrollArea className="w-full rounded-md">
                                        {sharedGroups?.map((item, i) => (
                                            <div>Group {item}</div>
                                        ))}
                                    </ScrollArea>
                                </HoverCardContent>
                            </HoverCard>
                        </Card>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you sure you want to remove this friend from your friends list?
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

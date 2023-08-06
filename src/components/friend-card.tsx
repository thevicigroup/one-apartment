"use client";

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
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ScrollArea } from "./ui/scroll-area";

export function AlertDialogDemo() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

interface Props {
    friendsInfo?: Friend;
}
const removeFriend = () => {
    AlertDialogDemo();
};

export const FriendsCard: React.FC<Props> = ({ friendsInfo }) => {
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

    // TODO: Change all the default values to friendsInfo.name, .id...etc
    const sharedGroups = [1, 2, 3, "this is dynamic"];
    const name = "Nicholas Mirabile";
    const occupation = "Aerospace Research Egnineer";

    return (
        <Card>
            <HoverCard>
                <HoverCardTrigger>
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
                            <Button className="mr-2" variant="danger" onClick={removeFriend}>
                                Remove Friend
                            </Button>
                        </CardFooter>
                    </Card>
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
    );
};

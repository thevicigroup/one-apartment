"use client";
import { Friend } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "@mui/material";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";




interface Props {
    friendsInfo: Friend;
}
const removeFriend = () => {
    console.log('remove friend')
}

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
    const sharedGroups = [1, 2, 3, 'this is dynamic']
    const name = 'Nicholas Mirabile'
    const occupation = 'Aerospace Research Egnineer'

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
                            <Button className="mr-2" variant="contained" onClick={removeFriend}>Remove Friend</Button>
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
    )
}
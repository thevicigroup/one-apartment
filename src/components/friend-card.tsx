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

export const FriendsCard: React.FC<Props> = ({ friendsInfo }) => {
    const sharedGroups = [1, 2, 3, 'this is dynamic']
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
                                <CardTitle>Nick Mirabile</CardTitle>
                                <CardDescription>Aerospace Research Engineer</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardFooter>
                            <Button>Remove Friend</Button>
                        </CardFooter>
                    </Card>

                    </HoverCardTrigger>
                    <HoverCardContent>
                    <p>Your Shared Groups:</p>
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
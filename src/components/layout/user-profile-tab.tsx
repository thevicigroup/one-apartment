import React from "react";
import type { Friend, SearchParameter, UserGroup } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { User } from "next-auth";

import { db } from "@/lib/database";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaxPrice } from "@/components/parameters-form";

import { FindFriends } from "../find-friends";
import { FriendsCard } from "../friend-card";
import { GroupCard } from "../group-card";
import { SearchParameterOperations } from "./search-parameter-operations";
import { Prisma } from "@prisma/client";
import { Group } from "next/dist/shared/lib/router/utils/route-regex";
import { Button } from "../ui/button";
import { NextApiRequest, NextApiResponse } from "next";


async function loadSavedSearchParams(user: User) {
    return await db.searchParameter.findMany({
        where: {
            userId: user.id,
        },
    });
}

async function loadUserGroups(user: User) {
    return await db.userGroup.findMany({
        where: {
            userId: user.id,
        },
    });
}


async function loadFriends(user: User) {
    return await db.friend.findMany({
        where: {
            userId: user.id,
        },
    });
}


// add friend function in prisma here
// TODO: INTEGRATE ADD FRIEND FUNCTION INTO CODE
// TODO: MAYBE A POPUP FORM FOR SELECTING WHICH FRIEND YOU WANT
// TODO: TO ADD BASED ON MATCHING USER IDS FROM WHAT THE USER ENTERED INTO THE FIND FRIEND TEXT BOX?
// const addFriend = async (e: any) => {
//     e.preventDefault();
//     const friend = {
//         id: uuid(),
//         name: "Nicholas Mirabile",
//         occupation: "Software Engineer",
//     }
    
//     db.friend.create({
//         data: friend})
//     }




interface Props {
    user: User;
}

const friends = [
    "brian",
    "kyle",
    "notjack",
    "fuckyoujack",
    "whydontyouevercodejack",
    "ben",
    "zach",
    "jason",
];

export const UserProfileTab: React.FC<Props> = async ({ user }) => {
    const parameters: SearchParameter[] = await loadSavedSearchParams(user);
    const userGroups: UserGroup[] = await loadUserGroups(user);
    const friends: Friend[] = await loadFriends(user);

    return (
        <div>
            <div className="flex gap-2 p-4">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={user.image ?? undefined} />
                    <AvatarFallback>
                        {user.name ? user.name.charAt(0).toUpperCase() : ""}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <h2 className="text-lg text-muted-foreground">{user.email}</h2>
                </div>
            </div>
            <Tabs defaultValue="savedApartments" className="w-full px-2">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="savedApartments">Saved Apartments</TabsTrigger>
                    <TabsTrigger value="savedParameters">Saved Parameters</TabsTrigger>
                    <TabsTrigger value="friends">Friends (1)</TabsTrigger>
                    <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>

                <TabsContent value="savedApartments">
                    <h1 className="scroll-m-20 text-lg font-bold tracking-tight lg:text-xl py-2">
                        Your Saved Search Apartments
                    </h1>
                </TabsContent>

                <TabsContent value="savedParameters">
                    <div className="grid grid-cols-2">
                        <div>
                            <h1 className="scroll-m-20 text-lg font-bold tracking-tight lg:text-xl py-0">
                                Input a max budget
                            </h1>
                            <div>(This will only be seen be seen by you)</div>
                        </div>
                        <MaxPrice />
                    </div>

                    <h1 className="scroll-m-20 text-lg font-bold tracking-tight lg:text-xl py-2">
                        Your Saved Search Parameters
                    </h1>
                    <ScrollArea className="h-[65vh] w-full rounded-md border space-y-4 border-none">
                        {parameters.length > 0 ? (
                            parameters.map((param, i) => (
                                <Card key={`${param.nickname}-${i}`}>
                                    <div className="flex items-center justify-between px-4 py-2">
                                        <CardTitle>{param.nickname}</CardTitle>
                                        <SearchParameterOperations id={param.id} />
                                    </div>
                                    <Separator />
                                    <CardContent>
                                        {param.address} in {param.traveltime} minutes {"by "}
                                        {param.travelmode}.
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center">You have no saved search parameters.</p>
                        )}
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="friends">
                    <h1>Find Friends</h1>
                    <Separator />
                    <FindFriends />
                    <Separator />
                    <h1 className="text-xl mb-2">Your Friends</h1>
                    <ScrollArea className="h-[65vh] w-full rounded-md border space-y-4 border-none">
                        <div className="grid gap-4 grid-cols-3">
                            {friends?.map((item, i) => (
                                <FriendsCard friendsInfo={undefined} />
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="groups">
                    <h1 className="text-xl mb-2">Your Groups</h1>
                    <Separator />
                    <ScrollArea className="h-[65vh] w-full rounded-md border space-y-4 border-none">
                        <div className="grid gap-4 grid-cols-2">
                            {userGroups?.map((item, i) => (
                                <GroupCard groupInfo={undefined} />
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    );
};
function uuid() {
    throw new Error("Function not implemented.");
}


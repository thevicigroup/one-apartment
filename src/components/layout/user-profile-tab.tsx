import React from "react";
// import { useState } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { Group } from "next/dist/shared/lib/router/utils/route-regex";
import dynamic from "next/dynamic";
import type { Friend, SearchParameter, UserGroup } from "@prisma/client";
import { Prisma, PrismaClient } from "@prisma/client";
import { Select, SelectItem } from "@radix-ui/react-select";
import type { User } from "next-auth";

import { db } from "@/lib/database";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaxPrice } from "@/components/parameters-form";

import { FindFriends } from "../find-friends";
import { FriendsCard } from "../friend-card";
import { GroupCard } from "../group-card";
import { Button } from "../ui/button";
import { SearchParameterOperations } from "./search-parameter-operations";

export async function loadSavedSearchParams(user: User) {
    const parameters = await db.searchParameter.findMany({
        where: {
            userId: user.id,
        },
    });
    return parameters;
}

export async function loadUserGroups(user: User) {
    const groups = await db.userGroup.findMany({
        where: {
            userId: user.id,
        },
    });
    return groups;
}

export async function loadFriends(user: User) {
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

const FriendsRows: React.FC<Props> = () => {
    return (
        <>
            {friends.map((friend, i) => (
                <TableRow key={i}>
                    <TableCell>{friend}</TableCell>
                    <TableCell className="content-center">
                        <Button>Add</Button>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

const DynamicFriendsParameters = dynamic(() => import("./FriendsParameters"), {
    ssr: false,
});

function MyComponent() {
    const [showFriendsParameters, setShowFriendsParameters] = useState(false);
    // const [showFriendsParameters, setShowFriendsParameters] = [1,1]
    return (
        <div className="flex">
            <ScrollArea className="h-96 flex-none">
                <Table className="table-auto">
                    <TableHeader className="bg-blue-300">
                        <TableRow>
                            <TableHead className="w-[200px] font-bold">Friends</TableHead>
                            <TableHead className="w-[75px] font-bold"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <FriendsRows user={undefined} />
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <button onClick={() => setShowFriendsParameters(true)}>
                                    Show Friends Parameters
                                </button>
                            </TableCell>
                        </TableRow>
                        {/* Other table rows */}
                    </TableBody>
                </Table>
            </ScrollArea>
            {showFriendsParameters && <DynamicFriendsParameters user={undefined} />}
        </div>
    );
}

const FriendsParameters: React.FC<Props> = () => {
    const friendparameters = ["parameter 1", "parameter 2", "parameter 3..."];
    return (
        <Table className="table-auto flex-1">
            {friendparameters.map((friendparameter, i) => (
                <TableRow key={i}>
                    <TableCell>{friendparameter}</TableCell>
                </TableRow>
            ))}
        </Table>
    );
};

export const UserProfileTab: React.FC<Props> = async ({ user }) => {
    const parameters: SearchParameter[] = await loadSavedSearchParams(user);
    const userGroups = ["", "", "", "", "", "", ""];
    const friends = ["", "", "", "", "", "", ""];
    // const userGroups: UserGroup[] = await loadUserGroups(user);
    // const friends: Friend[] = await loadFriends(user);

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
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                    <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>

                <TabsContent value="savedApartments">
                    <h1 className="scroll-m-20 text-lg font-bold tracking-tight lg:text-xl py-2">
                        Your Saved Search Apartments
                    </h1>
                </TabsContent>

                <TabsContent value="savedParameters">
                    <Separator />
                    <div className="grid grid-cols-2 space-y-4">
                        <div>
                            <h1 className="scroll-m-20 text-lg font-bold tracking-tight lg:text-xl">
                                Input a max budget
                            </h1>
                            <div>(This will only be seen be seen by you)</div>
                        </div>
                        <MaxPrice />
                    </div>
                    <Separator />
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
                    <Separator />
                    <h1 className="scroll-m-20 text-lg font-bold tracking-tight lg:text-xl">
                        Find Friends
                    </h1>
                    <FindFriends />
                    <Separator />
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
                    <Separator className="mb-2" />
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

                            {/* <div className="flex">
                                <ScrollArea className="h-96 flex-none">
                                    <Table className="table-auto">
                                        <TableHeader className="bg-blue-300">
                                            <TableRow>
                                                <TableHead className="w-[200px] font-bold">
                                                    Friends
                                                </TableHead>
                                                <TableHead className="w-[75px] font-bold">
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        
                                        <FriendsRows user={undefined} />

                                        <TableBody></TableBody>
                                    </Table>
                                </ScrollArea>
                                <FriendsParameters user={undefined} />
                            </div> */}
                            <MyComponent />

                            <Separator></Separator>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-green-400">
                                    Create
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Separator className="mb-2 mt-2" />
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

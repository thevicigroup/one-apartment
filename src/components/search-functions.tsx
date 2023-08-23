import React, { useState } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { Group } from "next/dist/shared/lib/router/utils/route-regex";
import dynamic from "next/dynamic";
import { SearchParameter } from "@prisma/client";
// import type { Friend, SearchParameter, UserGroup } from "@prisma/client";
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
import { Button } from "@/components/ui/button";
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

import { SearchParameterOperations } from "./layout/search-parameter-operations";

interface Props {
    user: User;
}

export async function loadSavedSearchParams(userID: string) {
    console.log(userID)
    const parameters = await db.searchParameter.findMany({
        where: {
            userId: userID,
        },
    });
    console.log(parameters);
    return parameters;
}

export async function loadUserGroups(user: User) {
    const groups = await db.userGroup.findMany({
        where: {
            userId: user.id,
        },
    });
    console.log(groups);
    return groups;
}

export async function loadFriends(user: User) {
    const friends = db.friend.findMany({
        where: {
            userId: user.id,
        },
    });
    console.log(friends);
    return friends;
}

{
    /* <ScrollArea className="h-[65vh] w-full rounded-md border space-y-4 border-none">
                        <div className="grid gap-4 grid-cols-2">
                            {userGroups?.map((item, i) => (
                                <GroupCard groupInfo={undefined} />
                            ))}
                        </div>
                    </ScrollArea> */
}

export const FriendsRows: React.FC<Props> = () => {
    return (
        <>
            {friends.map((friend, i) => (
                <TableRow key={i}>
                    <TableCell>{friend}</TableCell>
                    <TableCell className="content-center">
                        <Button onClick={openFriendsParameters}>Add</Button>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

export const MyComponent: any = (user: User) => {
    // const [showFriendsParameters, setShowFriendsParameters] = useState(false);
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
                    <FriendsRows user={User} />
                    <TableBody>{/* Other table rows */}</TableBody>
                </Table>
            </ScrollArea>
            {/* {showFriendsParameters && <DynamicFriendsParameters user={undefined} />} */}
        </div>
    );
}

const openFriendsParameters = () => {
    return <div>hi</div>;
};

const userGroups = ["", "", "", "", "", "", ""];
const friends = ["", "", "", "", "", "", ""];
// const userGroups: UserGroup[] = await loadUserGroups(user);
// const friends: Friend[] = await loadFriends(user);

const parameters: SearchParameter[] = await loadSavedSearchParams(user);

{
    parameters.length > 0 ? (
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
    );
}

// ! OPERATION FUCK JACK 100% EQUITY, REWRITING USERPROFILETAB INTO THAT AND SEARCH FUNCTIONS SINCE USER PROFILE TAB CANT BE CLIENT SIDE FOR ONCLICK FUNCTIONALITY AND UI STUFF,
// ! FIGURE OUT HOW TO MAKE PROPER PRISMA CALLS AFTER GETTING THIS SORTED, REWRITE ANYTHING YOU SEE FIT
// ! MAKE THE CARDS EXPORT TO USERPROFILETAB, NEED TO CONVERT USERPROFILETAB TO USECLIENT BUT IT IS SAYING NO PRISMA OR USESTATE STUFF SO FIGURE THAT OUT TONIGHT

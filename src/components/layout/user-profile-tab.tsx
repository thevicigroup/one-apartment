"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { SearchParameter } from "@prisma/client";
import type { User } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApartmentContext } from "@/components/providers";

interface Props {
    user: User;
    parameters: SearchParameter[];
}

export const UserProfileTab: React.FC<Props> = ({ user, parameters }) => {
    const router = useRouter();
    const { unsaveParameter } = useApartmentContext();
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
            <Tabs defaultValue="parameters" className="w-full px-2">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="parameters">Saved Parameters</TabsTrigger>
                    <TabsTrigger value="friends">Friends (1)</TabsTrigger>
                    <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
                <TabsContent value="parameters">
                    <h1 className="scroll-m-20 text-lg font-bold tracking-tight lg:text-xl py-2">
                        Your Saved Search Parameters
                    </h1>
                    <ScrollArea className="h-[65vh] w-full rounded-md border space-y-4 border-none">
                        {parameters.length > 0 ? (
                            parameters.map((param, i) => (
                                <Card key={`${param.nickname}-${i}`}>
                                    <div className="flex items-center justify-between px-4 py-2">
                                        <CardTitle>{param.nickname}</CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => {
                                                    unsaveParameter(param.id);
                                                    router.refresh();
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
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
                    <h1 className="text-xl mb-2">Your Friends</h1>
                    <ScrollArea className="h-[calc(90vh-380px)] w-full rounded-md border space-y-4">
                        <table id="user_friends_table" className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="p-3 text-sm font-bold tracking-wide text-left">
                                        User Picture (small)
                                    </th>
                                    <th className="p-3 text-sm font-bold tracking-wide text-left">
                                        Name
                                    </th>
                                </tr>

                                {/* NEED TO MAP THE PRISMA USER.FRIENDS TABLE INTO THE USER_FRIENDS_TABLE AND DISPLAY */}
                                {/* {friends?.map((name, i) => (
                            <SingleApartment key={i} apartmentInfo={item} />
                        ))} */}
                            </thead>
                        </table>
                    </ScrollArea>

                    <div>
                        <br></br>

                        {/* <div className="flex space-x-5 w-full">
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
                    onClick={addParameter}>CHANGE TO SEARCH PEOPLE</button>
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
                    onClick={removeParameter}>CHANGE TO REMOVE FRIEND</button>
                </div> */}
                    </div>
                </TabsContent>

                <TabsContent value="groups">
                    <h1 className="text-xl mb-2">Your Groups</h1>
                    <ScrollArea className="h-[calc(90vh-320px)] w-full rounded-md border space-y-4">
                        <table id="user_groups_table" className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="p-3 text-sm font-bold tracking-wide text-left">
                                        Name
                                    </th>
                                    <th className="p-3 text-sm font-bold tracking-wide text-left">
                                        Number of Members
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    );
};

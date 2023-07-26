import React from "react";
import type { SearchParameter, SearchApartment } from "@prisma/client";
import type { User } from "next-auth";

import { db } from "@/lib/database";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchParameterOperations, SearchApartmentOperations } from "./search-parameter-operations";

async function loadSavedSearchParams(user: User) {
    return await db.searchParameter.findMany({
        where: {
            userId: user.id,
        },
    });
}

// async function loadSavedSearchApartment(user: User) {
//     return await db.searchApartment.findMany({
//         where: {
//             userId: user.id,
//         },
//     });
// }

interface Props {
    user: User;
}

export const UserProfileTab: React.FC<Props> = async ({ user }) => {
    const parameters: SearchParameter[] = await loadSavedSearchParams(user);
    // const apartments: SearchParameter[] = await loadSavedSearchApartment(user);
    
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
                    <ScrollArea className="h-[65vh] w-full rounded-md border space-y-4 border-none">
                        {/* {apartments.length > 0 ? (
                            apartments.map((apartment, i) => (
                                <Card key={`${apartment.nickname}-${i}`}>
                                    <div className="flex items-center justify-between px-4 py-2">
                                        <CardTitle>{apartment.nickname}</CardTitle>
                                        <SearchParameterOperations id={apartment.id} />
                                    </div>
                                    <Separator />
                                    <CardContent>
                                        {apartment.address}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center">You have no saved search parameters.</p>
                        )} */}
                    </ScrollArea>
                </TabsContent>



                <TabsContent value="savedParameters">
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
                    <h1 className="text-xl mb-2">Your Friends</h1>
                </TabsContent>




                <TabsContent value="groups">
                    <h1 className="text-xl mb-2">Your Groups</h1>
                </TabsContent>
            </Tabs>
        </div>
    );
};

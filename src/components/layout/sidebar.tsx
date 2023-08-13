import React from "react";
import { SearchParameter } from "@prisma/client";
import { User } from "next-auth";

import { getCurrentUser } from "@/lib/auth/get-server-session";
import { db } from "@/lib/database";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApartmentView } from "@/components/apartment-view";
import { UserProfileTab } from "@/components/layout/user-profile-tab";
import { ParametersForm } from "@/components/parameters-form";
import { ParametersList } from "@/components/parameters-list";
import { UpdateApartmentsButton } from "@/components/update-apartments-button";

export const Sidebar = async () => {
    const user = await getCurrentUser();

    return (
        <Tabs defaultValue="parameters" className="w-full px-2">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="apartments">Apartments</TabsTrigger>
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
                <TabsTrigger value="profile">User Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="apartments">
                <ApartmentView />
            </TabsContent>
            <TabsContent value="parameters">
                <div className="flex flex-col justify-between h-[calc(100vh-110px)]">
                    <div>
                        <ParametersForm />
                        <ParametersList />
                    </div>
                    <UpdateApartmentsButton />
                </div>
            </TabsContent>
            <TabsContent value="profile">
                {!user ? (
                    <div className="flex flex-col space-y-2">
                        <p>Sign in or create an account to view your profile</p>
                        <Button variant="secondary">Login with Github</Button>
                    </div>
                ) : (
                    <UserProfileTab user={user} />
                )}
            </TabsContent>
        </Tabs>
    );
};

import React from "react";

import { getCurrentUser } from "@/lib/auth/get-server-session";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApartmentView } from "@/components/apartment-view";
import { UserProfileTab } from "@/components/layout/user-profile-tab";
import { ParametersForm } from "@/components/parameters-form";

export const Sidebar = async () => {
    const user = await getCurrentUser();

    return (
        <Tabs defaultValue="apartments" className="w-full px-2">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="apartments">Apartments</TabsTrigger>
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
                <TabsTrigger value="profile">User Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="apartments">
                <ApartmentView />
            </TabsContent>
            <TabsContent value="parameters">
                <ParametersForm />
            </TabsContent>
            <TabsContent value="profile">
                {!user ? (
                    <p>Sign in to set up your user profile</p>
                ) : (
                    <UserProfileTab user={user} />
                )}
            </TabsContent>
        </Tabs>
    );
};

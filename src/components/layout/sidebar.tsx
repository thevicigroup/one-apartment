import React from "react";

import { getCurrentUser } from "@/lib/auth/get-server-session";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApartmentView } from "@/components/apartment-view";
import { UserProfileTab } from "@/components/layout/user-profile-tab";
import { ParametersForm } from "@/components/parameters-form";
import { ParametersList} from "@/components/layout/parameters-list";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import { handleSubmit } from "@/components/parameters-form";

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
                <ParametersForm />
                <ParametersList />
                <br></br>
                
                {/* <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-2 gap-4"> */}
                {/* TODO: ASK JACK WHY WIDTH IS BEING FUNKY */}
                <div className="fixed bottom-8 w-4/12">
                    <Button className="text-white col-span-2 w-full bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit">
                        Update Apartments
                    </Button>
                </div>
                {/* </form>
                </Form> */}


                <div className="fixed bottom-2">Results: showing x out of y</div>
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

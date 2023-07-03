import React from "react";

import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger,
} from "@/components/ui/tabs"

export const Sidebar = () => {
    return (
        <Tabs defaultValue="apartments" className="w-full px-2">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="apartments">Apartments</TabsTrigger>
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
            </TabsList>
            <TabsContent value="apartments">Apartments</TabsContent>
            <TabsContent value="parameters">Parameters</TabsContent>
        </Tabs>
    );
}
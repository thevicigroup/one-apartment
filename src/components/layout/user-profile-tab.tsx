"use client"
import React from "react";
import type { User } from "next-auth";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { List } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
    user: User;
}



export const UserProfileTab: React.FC<Props> = ({ user }) => {

    const addParameter = () => {
        const parameters_table = document.getElementById("user_parameters_table");
        var row = 
        '<tr><td>'  +  (document.getElementById("nickname") as HTMLInputElement | null)?.value +
        '</td><td>'  +  (document.getElementById("address") as HTMLInputElement | null)?.value +
        '</td><td>' + (document.getElementById("travelmode") as HTMLInputElement | null)?.value + 
        '</td><td>' + (document.getElementById("traveltime") as HTMLInputElement | null)?.value +
         '</td></tr>'
        parameters_table!.innerHTML += row
        }
    
    
    const removeParameter = () => {
        const parameters_table = document.getElementById("user_parameters_table")!;
        const parameters_table_rows = document.getElementById("user_parameters_table")! as HTMLTableElement;
        if (parameters_table_rows.rows.length != 1) {
            parameters_table.removeChild(parameters_table.lastChild!)
        }
    }


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


            <Tabs defaultValue="your requirements" className="w-full px-2">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="your requirements">Your Requirements</TabsTrigger>
                <TabsTrigger value="friends">Friends</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>
            <TabsContent value="your requirements">
            <h1 className="text-xl mb-2">Your Saved User Parameters</h1>
            <ScrollArea className="h-[calc(90vh-320px)] w-full rounded-md border space-y-4">
            <table id="user_parameters_table" className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Nickname</th>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Address</th>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Travel Time</th>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Travel Mode</th>.
                        </tr>
                    </thead>
                </table>
            </ScrollArea>
            <div>
                <br></br>
                <div className="flex space-x-5 w-full">
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
                    onClick={addParameter}>Add a Requirement</button>
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
                    onClick={removeParameter}>Delete Last Requirement</button>
                </div>
            </div>
            </TabsContent>



            <TabsContent value="friends">
            <h1 className="text-xl mb-2">Your Friends</h1>
            <ScrollArea className="h-[calc(90vh-320px)] w-full rounded-md border space-y-4">
            <table id="user_parameters_table" className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">User Picture (small)</th>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Name</th>
                        </tr>
                    </thead>
                </table>
            </ScrollArea>
            <div>
                <br></br>
                <div className="flex space-x-5 w-full">
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
                    onClick={addParameter}>CHANGE TO SEARCH PEOPLE</button>
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
                    onClick={removeParameter}>CHANGE TO REMOVE FRIEND</button>
                </div>
            </div>
            </TabsContent>



            <TabsContent value="groups">
            <h1 className="text-xl mb-2">Your Groups</h1>
            <ScrollArea className="h-[calc(90vh-320px)] w-full rounded-md border space-y-4">
            <table id="user_parameters_table" className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Name</th>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Number of Members</th>
                        </tr>
                    </thead>
                </table>
            </ScrollArea>

            <div>
                <br></br>
                <div className="flex space-x-5 w-full">
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
                    onClick={addParameter}>CHANGE TO ADD GROUP</button>
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
                    onClick={removeParameter}>CHANGE TO LEAVE GROUP</button>
                </div>
            </div>
            </TabsContent>
        </Tabs>

        


            

        </div>
    );
};

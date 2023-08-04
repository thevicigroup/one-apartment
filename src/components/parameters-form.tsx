"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { userParametersSchema } from "@/lib/validators/search-parameters";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useApartmentContext } from "@/components/providers";
import { group } from "console";


export const ParametersForm = () => {
    const router = useRouter();
    const { addParameter } = useApartmentContext();
    const userName = 'EXAMPLE USER NAME'
    const userGroupNames = ['EXAMPLE GROUP NAME', 'EXAMPLE GROUP NAME 2']

    // prettier-ignore
    const form = useForm<z.infer<typeof userParametersSchema>>({
        resolver: zodResolver(userParametersSchema),
        defaultValues: {
            id: uuid(), address: "", nickname: "", traveltime: "30", travelmode: "walking",
        },
    });

    async function handleSubmit(values: z.infer<typeof userParametersSchema>) {
        values.id = uuid();
        addParameter(values);
        form.reset();
        router.refresh();
    }

    const updateParameterIcons = () => {
        console.log('update parameters on map here')
    }





    const importUserParameters = (userName: string) => {
        console.log('import parameters here')
    }

    const openUserMenu = () => {
        console.log('import parameters here')
        return (
            <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Button onClick={importUserParameters(userName)}>User Name Here</Button>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }


    const importGroupParameters = (groupName: string) => {
        console.log('import group parameters here')
    }

    const openGroupMenu = () => {
        console.log('import group parameters here')
        return (
            <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    {userGroupNames.length > 0 ? (
                    userGroupNames.map((groupName) => (
                        <Button onClick={importGroupParameters(groupName)}>{groupName}</Button>
                        )
                    )): (
                        <p className="text-center">You are in no groups.</p>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }


    // const center = { lat: 50.064192, lng: -130.605469 };
    // const defaultBounds = {
    // north: center.lat + 0.1,
    // south: center.lat - 0.1,
    // east: center.lng + 0.1,
    // west: center.lng - 0.1,
    // };
    // const input = document.getElementById("pac-input") as HTMLInputElement;
    // const options = {
    // bounds: defaultBounds,
    // componentRestrictions: { country: "us" },
    // fields: ["address_components", "geometry", "icon", "name"],
    // strictBounds: false,
    // types: ["establishment"],
    // };

    // const autocomplete = new google.maps.places.Autocomplete(input, options);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem className="py-3">
                            <FormLabel>Address</FormLabel>
                            <Input placeholder="Enter a place" type="text" {...field} />
                            {/* <input id="autocomplete" placeholder="Enter a place" type="text"/> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }) => (
                        <FormItem className="py-3">
                            <FormLabel>Nickname</FormLabel>
                            <Input placeholder="Enter a nickname" type="text" {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="traveltime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel id="traveltime">Travel Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select transit time" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="15">15 Minutes</SelectItem>
                                    <SelectItem value="30">30 Minutes</SelectItem>
                                    <SelectItem value="45">45 Minutes</SelectItem>
                                    <SelectItem value="60">1 Hour</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormLabel>Or Enter a Time Below</FormLabel>
                            <Input placeholder="Or enter a time" type="text" {...field} />

                            <FormMessage />
                        </FormItem>
                        
                    )}
                />
                <div>

                <FormField
                    control={form.control}
                    name="travelmode"
                    render={({ field }) => (
                        <FormItem id="travelmode">
                            <FormLabel>Travel Mode</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select transport mode" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="walking">Walking</SelectItem>
                                    <SelectItem value="driving">Driving</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    

                </div>

                <Button onClick={updateParameterIcons} className="col-span-2" variant="secondary" type="submit">
                    Add Parameter
                </Button>
            </form>
            <div className="pt-2">
                Or import from <Button onClick={openUserMenu} className="text-white bg-green-500 hover:bg-sky-700 h-6">Your Saved Parameters</Button> or <Button onClick={openGroupMenu} className="text-white bg-green-500 hover:bg-sky-700 h-6">Your Groups</Button>
            {/* <Button className="text-white bg-green-500 hover:bg-sky-700 h-8 w-full" onClick={importUserParameters}>Import User Parameters</Button>
            <Button className="text-white bg-green-500 hover:bg-sky-700 h-8 w-full" onClick={importGroupParameters}>Import Group Parameters</Button> */}
            </div>
        </Form>
    );
};

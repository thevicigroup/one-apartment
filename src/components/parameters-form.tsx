"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { User } from "@prisma/client";
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

export const MaxPrice = () => {
    const router = useRouter();
    const { addParameter } = useApartmentContext();

    // prettier-ignore
    const form = useForm<z.infer<typeof userParametersSchema>>({
        resolver: zodResolver(userParametersSchema),
        defaultValues: {
            id: uuid(), address: "", nickname: "", traveltime: "30", travelmode: "walking", maxPrice: 0,
        },
    });

    async function handleSubmit(values: z.infer<typeof userParametersSchema>) {
        values.id = uuid();
        addParameter(values);
        form.reset();
        router.refresh();
    }
    return (
        <Form {...form}>
            <div className="grid grid-cols-2 py-2">
                <FormField
                    control={form.control}
                    name="maxPrice"
                    render={({ field }) => (
                        <FormItem className="pr-2">
                            <Input placeholder="Enter a Maximum Price" type="text" {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant="secondary" type="submit">
                    Add Max Price
                </Button>
            </div>
        </Form>
    );
};

export const ParametersForm = (user: User) => {
    const router = useRouter();
    const { addParameter } = useApartmentContext();

    // prettier-ignore
    const form = useForm<z.infer<typeof userParametersSchema>>({
        resolver: zodResolver(userParametersSchema),
        defaultValues: {
            id: uuid(), address: "", nickname: "", traveltime: "30", travelmode: "walking", maxPrice: 0,
        },
    });

    async function handleSubmit(values: z.infer<typeof userParametersSchema>) {
        values.id = uuid();
        addParameter(values);
        form.reset();
        router.refresh();
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
                            <FormLabel>Or Enter a Time in Minutes</FormLabel>
                            <Input
                                placeholder="Or Enter a Time in Minutes"
                                type="text"
                                {...field}
                            />
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
                <Button className="col-span-2" variant="secondary" type="submit">
                    Add Parameter
                </Button>
            </form>
        </Form>
    );
};

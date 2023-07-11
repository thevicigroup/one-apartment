"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { userParametersSchema } from "@/lib/validators/search-parameters";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Apartment, useApartmentContext } from "@/components/providers";

const MAX_BATHROOMS = 5;
const MAX_BEDROOMS = 5;

export const ParametersForm = () => {
    const { updateApartments } = useApartmentContext();
    const form = useForm<z.infer<typeof userParametersSchema>>({
        resolver: zodResolver(userParametersSchema),
        defaultValues: {
            bath: "1",
            beds: "1",
            traveltime: "30",
            travelmode: "walking",
        },
    });
    async function handleSubmit(values: z.infer<typeof userParametersSchema>) {
        const response = await fetch(
            "http://localhost:3000/api/apartments?" + new URLSearchParams(values),
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        if (response?.ok) {
            const apartments: Apartment[] = await response.json();
            updateApartments(apartments);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="bath"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bathrooms</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select number of bathrooms" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Array.from({ length: MAX_BATHROOMS }).map((item, i) => (
                                        <SelectItem key={`bath-${i}`} value={`${i + 1}`}>
                                            {i + 1} Bathroom
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="beds"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bedrooms</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select number of bedrooms" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Array.from({ length: MAX_BEDROOMS }).map((item, i) => (
                                        <SelectItem key={`beds-${i}`} value={`${i + 1}`}>
                                            {i + 1} Bedroom
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="traveltime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Travel Time</FormLabel>
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
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="travelmode"
                    render={({ field }) => (
                        <FormItem>
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
                        </FormItem>
                    )}
                />
                <Button className="text-white col-span-2" type="submit">
                    Update Parameters
                </Button>
            </form>
        </Form>
    );
};

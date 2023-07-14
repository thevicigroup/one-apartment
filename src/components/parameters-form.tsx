"use client";

import React, { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { parseApartments } from "@/components/layout/apartment-parser"
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
import { headers } from "next/dist/client/components/headers";

const TRAVEL_TIME_ID = '6f1ed0f3'
const TRAVEL_TIME_APPLICATION_KEY = 'ceacbffb35b3353e486797d8b0cb3cfc'
const TRAVEL_TIME_BASE_URL = 'https://api.traveltimeapp.com/v4/time-map'
const MAX_BATHROOMS = 5;
const MAX_BEDROOMS = 5;

export const ParametersForm = () => {
    const { updateApartments } = useApartmentContext();
    const form = useForm<z.infer<typeof userParametersSchema>>({
        resolver: zodResolver(userParametersSchema),
        defaultValues: {
            address: "123 Example Street, Berlin MA, 01503",
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


            const user_parameters = document.getElementById("parameters_table")
            const list_of_parameters = new Array<number>user_parameters.length
            const user_dictionary = [];
            for (var parameter in list_of_parameters) {
                user_dictionary.push({
                    
                    // TODO: ASK JACK WHY THESE VALUES ARENT GETTING THE RIGHT DATA
                    // The user id should be the nickname of the parameter, not userid
                    "id": document.getElementById("parameters_table")[parameter], 

                    // The coords should be got from the address
                    "coords": {
                        "lat": document.getElementById("parameters_table")[parameter],
                        "lng": document.getElementById("parameters_table")[parameter],
                        },

                    "departure_time": document.getElementById("parameters_table")[parameter],
                    "travel_time": document.getElementById("parameters_table")[parameter],
                    "transportation": {"type": document.getElementById("parameters_table")[parameter]},
                    }
                )
            }
            console.log(user_dictionary)
        
            const isochrones = await fetch(
                "http://localhost:3000/api/isochrones?" + new URLSearchParams(values),
                {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'X-Application-Id':TRAVEL_TIME_ID,
                    'X-Api-Key':TRAVEL_TIME_APPLICATION_KEY
                },
                body: JSON.stringify(user_dictionary)
            },
            ) 

            // const isochroness = json.loads(isochrone.text)
            // intersection = isochrone['results'][0]['shapes']
            console.log(isochrones)



            // Here is where to parse the apartments based on the isochrones from the user data
            const parsed_apartments = parseApartments(apartments, isochrones);
            console.log(parsed_apartments)
            updateApartments(parsed_apartments);
        }
    }


    // or maybe use const {Autocomplete} = await google.maps.importLibrary("places")?
    
    // let autocomplete: google.maps.places.Autocomplete;
    // function initAutocomplete() {
    //     autocomplete = new google.maps.places.Autocomplete(
    //         document.getElementById('autocomplete'),
    //         {
    //             types: ['establishment'],
    //             componentRestrictions: {countrty: ['US']},
    //             fields: ['place_id', 'geometry', 'name']
    //         }
    //     );
    //     autocomplete.addListener('place_changed', onPlaceChanged)
    // }
    // function onPlaceChanged() {
    //     var place = autocomplete.getPlace();
    //     if (!place.geometry) {
    //         document.getElementById('autocomplete').placeholder = 'Enter a place';
    //     } else {
    //         document.getElementById('details')?.innerHTML = place.name
    //     }
    // }
    
    // <script
    //     src='https://maps.googleapis.com/maps/api/js?
    //     key=AIzaSyAwtbycn3l16COzlzrOLZUd9aqnpGvbQ0I&libraries=places&callback=initAutocomplete'
    //     async defer></script>



    return (
        <Form {...form}>
            
                <FormField
                    control={form.control}
                    name="beds"
                    render={({ field }) => (
                        <FormItem className="py-3">
                            <FormLabel>Address</FormLabel>
                            <input className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" placeholder="Enter a place" type="text"></input>
                        </FormItem>
                    )}
                />
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-2 gap-4">
                {/* <Button className="text-white col-span-2 w-full bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit">
                        Update Apartments
                </Button> */}
                
                <FormField
                    control={form.control}
                    name="beds"
                    render={({ field }) => (
                        <FormItem id="beds">
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
                        name="bath"
                        render={({ field }) => (
                            <FormItem id="bath">
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
                            <FormLabel id="travelmode">Travel Mode</FormLabel>
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
            </form>
        </Form>
    );
};

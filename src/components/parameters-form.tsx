"use client";
import "crypto"
import React, { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    TimeMapRequestArrivalSearch,
    TimeMapRequestDepartureSearch,
    TimeMapRequestUnionOrIntersection,
    TravelTimeClient
  } from 'traveltime-api';

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
            address: " 465 Huntington Ave, Boston, MA 02115",
            nickname: "John Doe",
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

            const user_parameters = document.getElementById("parameters_table") as HTMLTableElement
            const list_of_parameters = Array(user_parameters.rows.length)
            const user_dictionary = {
                "id": 'testing1',
                
                "coords": {
                    "lat": -42.3601,
                    "lng": 71.0589,
                    },

                "departure_time": "2023-07-13T08:00:00Z",
                "travel_time": "15",
                "transportation": {"type": "walking"},
                };

            // TODO: implement the website to loop through user parameters gotten from the table
            // TODO: and then build a list of parameters to pass into the isochrone
            // for (var parameter in list_of_parameters) {
            //     console.log(parameter)
            //     user_dictionary.push({
                    
            //         // TODO: ASK JACK WHY THESE VALUES ARENT GETTING THE RIGHT DATA
            //         // The user id should be the nickname of the parameter, not userid
            //         "id": 'testing1',
            //         // "id": Array.from((document.getElementById("parameters_table") as HTMLTableElement).rows)[0], 

            //         // ! MIGHT NEED TO CALL ANOTHER API FOR ADDRESS TO COORDINATE POINT CONVERSION???
            //         // The coords should be got from the address
            //         "coords": {
            //             "lat": -42.3601,
            //             "lng": 71.0589,
            //             },
            //         // "coords": {
            //         //     "lat": Array.from((document.getElementById("parameters_table") as HTMLTableElement).rows)[1],
            //         //     "lng": Array.from((document.getElementById("parameters_table") as HTMLTableElement).rows)[2],
            //         //     },
            //         "departure_time": "2023-07-13T08:00:00Z",
            //         // "departure_time": Array.from((document.getElementById("parameters_table") as HTMLTableElement).rows)[3],
            //         "travel_time": "15",
            //         // "travel_time": Array.from((document.getElementById("parameters_table") as HTMLTableElement).rows)[4],
            //         "transportation": {"type": "walking"},
            //         // "transportation": {"type": Array.from((document.getElementById("parameters_table") as HTMLTableElement).rows)[5]},
            //         }
            //     )
            // }
            console.log(user_dictionary)
        


            
              
            const travelTimeClient = new TravelTimeClient({
            applicationId: '6f1ed0f3',
            apiKey: 'ceacbffb35b3353e486797d8b0cb3cfc',
            });
            
            const departure_search1: TimeMapRequestDepartureSearch = {
                id: 'public transport from Trafalgar Square',
                coords: { lat: 51.507609, lng: -0.128315 },
                departure_time: new Date().toISOString(),
                travel_time: 900,
                transportation: { type: 'public_transport' },
                properties: ['is_only_walking'],
            };
              
            const departure_search2: TimeMapRequestDepartureSearch = {
                id: 'driving from Trafalgar Square',
                coords: { lat: 51.507609, lng: -0.128315 },
                departure_time: new Date().toISOString(),
                travel_time: 900,
                transportation: { type: 'driving' }
            };


            const intersection: TimeMapRequestUnionOrIntersection = {
                id: 'intersection of driving and public transport',
                search_ids: ['public transport from Trafalgar Square', 'driving from Trafalgar Square'],
              };
            //   This timemap function allows for a batch call which will be helpful
            travelTimeClient.timeMap({
                departure_searches: [departure_search1, departure_search2],
                intersections: [intersection],
              }).then((data) => console.log(data))
                .catch((e) => console.error(e));

            // const isochrones = await fetch(
            //     "https://api.traveltimeapp.com/v4/time-map/" + new URLSearchParams(values),
            //     {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Accept": "application/json",
            //         'X-Application-Id':TRAVEL_TIME_ID,
            //         'X-Api-Key':TRAVEL_TIME_APPLICATION_KEY
            //     },
            //     body: JSON.stringify(user_dictionary)
            // },
            // ) 

            // const isochroness = json.loads(isochrone.text)
            // intersection = isochrone['results'][0]['shapes']
            // console.log(isochrones)



            // // Here is where to parse the apartments based on the isochrones from the user data
            // const parsed_apartments = parseApartments(apartments, isochrones);
            // console.log(parsed_apartments)
            updateApartments(apartments);
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
                    name="address"
                    render={({ field }) => (
                        <FormItem className="py-3">
                            <FormLabel>Address</FormLabel>
                            <input className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" placeholder="Enter a place" type="text"></input>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem className="py-3">
                            <FormLabel>Nickname</FormLabel>
                            <input className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nickname" placeholder="Enter a short nickname" type="text"></input>
                        </FormItem>
                    )}
                />
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-2 gap-4">
                <Button className="text-white col-span-2 w-full bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit">
                        Update Apartments
                </Button>
                
                {/* <FormField
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
                    /> */}
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
                        <FormItem  id="travelmode">
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
            </form>
        </Form>
    );
};

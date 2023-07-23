"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useApartmentContext, type Apartment } from "@/components/providers";
import { TimeMapResponse } from "traveltime-api";

export const UpdateApartmentsButton = () => {
    const { updateApartments, parameters, saveIsochrones } = useApartmentContext();

    async function updateApartmentsOnMap() {
        const response = await fetch(
            "http://localhost:3000/api/isochrone", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ parameters: parameters }),
            }
        );
        // const response = await fetch(
        //     "http://localhost:3000/api/apartments?" + new URLSearchParams({}),
        //     {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     },
        // );
        if (response?.ok) {
            // const apartments: Apartment[] = await response.json();
            // updateApartments(apartments);
            const data: TimeMapResponse = await response.json();
            saveIsochrones(data);
        }
    }

    return (
        <Button className="w-full" variant="secondary" onClick={() => updateApartmentsOnMap()}>
            Update Apartments
        </Button>
    );
};

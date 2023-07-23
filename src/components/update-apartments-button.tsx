"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useApartmentContext, type Apartment } from "@/components/providers";
import { TimeMapResponse } from "traveltime-api";
import * as turf from "@turf/turf"
import { CoordToPosition } from "@/lib/lib/coord-to-position";

export const UpdateApartmentsButton = () => {
    const { updateApartments, parameters, saveIsochrones, isochrones } = useApartmentContext();

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
        const apartmentsResponse = await fetch(
            "http://localhost:3000/api/apartments",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        
        if (response?.ok) {
            const apartments: Apartment[] = await apartmentsResponse.json();
            // updateApartments(apartments);
            const data: TimeMapResponse = await response.json();
            saveIsochrones(data);

            // TODO: Figure out why returning undefined only on the first call

            if (isochrones.length > 0) {
                // isochrone = {lat: 123, lng: 456}
                const searchWithin = turf.polygon(isochrones.map(isochrone => (CoordToPosition(isochrone))))
                const points = turf.points(apartments.map(apartment => {
                    return [apartment.latitude, apartment.longitude]
                }))

                console.log(searchWithin, 'SEARCHWITHIN')
                console.log(points, 'POINTS')
                
                let filteredApartments: Apartment[] = [];
                // Loop through each polygon and check if the point is within the polygon
                const ptsWithin = searchWithin.geometry.coordinates.map(polygon => {
                    turf.pointsWithinPolygon(points, polygon);
                    filteredApartments.push(apartments.filter(apartment => {
                        const position = [apartment.latitude, apartment.longitude]
                    })
                    )
                })
                
                return;
            }


        }
    }

    return (
        <Button className="w-full" variant="secondary" onClick={() => updateApartmentsOnMap()}>
            Update Apartments
        </Button>
    );
};

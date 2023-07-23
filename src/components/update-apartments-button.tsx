"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useApartmentContext, type Apartment } from "@/components/providers";
import { TimeMapResponse } from "traveltime-api";
import * as turf from "@turf/turf"
import { CoordToPosition } from "@/lib/coord-to-position";
import { buildIsochrones } from "@/lib/build-isochrones";

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
        const apartmentsResponse = await fetch(
            "http://localhost:3000/api/apartments?" + new URLSearchParams({ address: parameters![0].address }),
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        
        if (response?.ok && apartmentsResponse?.ok) {
            const apartments: Apartment[] = await apartmentsResponse.json();
            // updateApartments(apartments);
            const data: TimeMapResponse = await response.json();
            const isochrones = buildIsochrones(data);
            saveIsochrones(isochrones);

            // TODO: Figure out why returning undefined only on the first call
            let filteredApartments: Apartment[] = [];
            if (isochrones.length > 0) {
                const apartmentPoints = turf.points(apartments.map(apartment => {
                    return [apartment.latitude, apartment.longitude];
                }));
                // isochrone = {lat: 123, lng: 456}
                isochrones.map((iso) => {
                    const polygon = turf.polygon([CoordToPosition(iso)]);
                    const pointsInside = apartmentPoints.features.map((p) => {
                        if (turf.booleanPointInPolygon(p.geometry, polygon)) {
                            return p.geometry.coordinates;
                        }
                        return [];
                    });
                    apartments.filter((a) => {
                        const p = [a.latitude, a.longitude];
                        for (const i of pointsInside) {
                            if (i.length === 0) continue;
                            if (p[0] === i[0] && p[1] === i[1]) {
                                return true;
                            }
                        }
                        return false;
                    }).map((a) => {
                        filteredApartments.push(a);
                        return a;
                    });
                });
                updateApartments(filteredApartments);
            }
        }
    }

    return (
        <Button className="w-full" variant="secondary" onClick={() => updateApartmentsOnMap()}>
            Update Apartments
        </Button>
    );
};

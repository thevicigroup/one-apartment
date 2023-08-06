"use client";

import React from "react";

import { testApartments } from "@/test-apartments";
import { Map } from "@/components/map/map";
import { useApartmentContext, type Apartment } from "@/components/providers";

export const MapWrapper = () => {
    const { apartments, isochrones, shapes } = useApartmentContext();
    function parseApartments(apartments: Apartment[]): { lat: number; lng: number }[] {
        let list: { lat: number; lng: number }[] = [];
        apartments.map((item) => list.push({ lat: item.latitude, lng: item.longitude }));
        return list;
    }

    return (
        <Map
            apartments={testApartments}
            aparmentMarkers={parseApartments(apartments ?? [])}
            shapes={shapes}
            isochrones={isochrones}
        />
    );
};

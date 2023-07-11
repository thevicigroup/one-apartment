"use client";

import React from "react";

import { Map } from "@/components/map/map";
import { useApartmentContext, type Apartment } from "@/components/providers";

export const MapWrapper = () => {
    const { apartments } = useApartmentContext();

    function parseApartments(apartments: Apartment[]): { lat: number; lng: number }[] {
        let list: { lat: number; lng: number }[] = [];
        apartments.map((item) => list.push({ lat: item.latitude, lng: item.longitude }));
        console.log(list);
        return list;
    }

    return <Map aparmentMarkers={parseApartments(apartments ?? [])} />;
};

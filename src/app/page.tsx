import React from "react";
import { shell } from "@/test-isochrone";

import { Sidebar } from "@/components/layout/sidebar";
import { Map } from "@/components/map/map";

const coordinates = [
    { lat: 42.36, lng: -71.058 },
    { lat: 42.361, lng: -71.058 },
    { lat: 42.36, lng: -71.051 },
    { lat: 42.364, lng: -71.058 },
    { lat: 42.364, lng: -71.054 },
    { lat: 42.366, lng: -71.059 },
    { lat: 42.367, lng: -71.058 },
];

export default function Home() {
    return (
        <div className="grid grid-cols-[1fr_.55fr] h-screen">
            <Map aparmentMarkers={coordinates} isochronePath={shell} />
            <Sidebar />
        </div>
    );
}

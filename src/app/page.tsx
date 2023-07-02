import React from "react";

import { Map } from "@/components/map/map";
import { Sidebar } from "@/components/layout/sidebar/sidebar";

const coordinates = [
    { lat: 42.36, lon: -71.058 },
    { lat: 42.361, lon: -71.058 },
    { lat: 42.36, lon: -71.051 },
    { lat: 42.364, lon: -71.058 },
    { lat: 42.364, lon: -71.054 },
    { lat: 42.366, lon: -71.059 },
    { lat: 42.367, lon: -71.058 },
];

export default function Home() {
    return (
        <div className="grid grid-cols-[1fr_.55fr] h-screen">
            <Map coords={coordinates} />
            <Sidebar />
        </div>
    );
}

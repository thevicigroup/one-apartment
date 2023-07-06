import React from "react";

import { Map } from "@/components/map/map";
import { Tabs } from "@/components/layout/tabs/tab"
// import { openSearchTab, openApartmentsTab } from "@/components/layout/tabs/apartments-tab/openTab"

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
            
            <Tabs />
            {/* <Sidebar /> */}
            
        </div>
    );
}

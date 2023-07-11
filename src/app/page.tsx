import React from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { MapWrapper } from "@/components/map/map-wrapper";

export default function Home() {
    return (
        <div className="grid grid-cols-[1fr_.55fr] h-screen">
            <MapWrapper />
            <Sidebar />
        </div>
    );
}

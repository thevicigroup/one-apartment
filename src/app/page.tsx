import React from "react";

import { Map } from "@/components/map/map";

export default function Home() {
    return (
        <div className="grid grid-cols-[1fr_.55fr] h-screen">
            <Map />
            <div className="bg-slate-500">Info</div>
        </div>
    );
}

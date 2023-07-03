import React from "react";
import { Cinzel } from "next/font/google";
import { Landmark } from "lucide-react";

import { cn } from "@/lib/utils";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--cinzel" });

export const Logo = () => {
    return (
        <div className={cn("flex items-center gap-x-1", cinzel.className)}>
            <Landmark className="w-6 h-6 stroke-[1.25px]" />
            <h1 className="pt-1">The Vici Group</h1>
        </div>
    );
};

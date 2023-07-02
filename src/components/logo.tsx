import React from "react";

import { Building } from "lucide-react";

export const Logo = () => {
    return (
        <div className="flex items-center gap-1">
            <Building className="text-purple-500 w-6 h-6" />
            <h1 className="text-sm font-medium">Apartments.gov</h1>
        </div>
    );
}
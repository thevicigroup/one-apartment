"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useApartmentContext } from "@/components/providers";

interface Props {
    id: string;
}



// TODO: Update to include other operations
export const SearchParameterOperations: React.FC<Props> = ({ id }) => {
    const { unsaveParameter } = useApartmentContext();
    return (
        <div className="flex items-center space-x-2">
            <Button
                variant="danger"
                size="sm"
                onClick={() => unsaveParameter(id)}
            >
                Remove
            </Button>
        </div>
    );
};

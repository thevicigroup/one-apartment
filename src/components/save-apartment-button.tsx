"use client";

import React, { useState } from "react";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

interface Props {
    apartmentId: string;
}

export const SaveApartmentButton: React.FC<Props> = () => {
    const [isSaved, setIsSaved] = useState(false);
    const buttonLabel = isSaved ? "Unsave" : "Save";
    // prettier-ignore
    const buttonIcon  = isSaved ? (
        <StarFilledIcon className="mr-2 h-4 w-4 visible" />
    ) : (
        <StarIcon className="mr-2 h-4 w-4 visible" />
    );
    function handleButtonClick() {
        setIsSaved(!isSaved);
    }
    return (
        <Button
            onClick={(e) => {
                e.preventDefault();
                handleButtonClick();
            }}
            variant="secondary"
            className="w-1/3 px-3 shadow-none"
            size="sm"
        >
            {buttonIcon}
            {buttonLabel}
        </Button>
    );
};

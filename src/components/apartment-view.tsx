"use client";

import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useApartmentContext } from "@/components/providers";
import { SingleApartment } from "@/components/single-apartment";

export const ApartmentView = () => {
    const { apartments } = useApartmentContext();

    return (
        <ScrollArea className="h-[calc(100vh-130px)] w-full rounded-md border space-y-4">
            {apartments?.map((item, i) => (
                <SingleApartment key={i} apartmentInfo={item} />
            ))}
        </ScrollArea>
    );
};

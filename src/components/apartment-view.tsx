"use client";

import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useApartmentContext } from "@/components/providers";
import { SingleApartment } from "@/components/single-apartment";

export const ApartmentView = () => {
    const { apartments } = useApartmentContext();

    if (typeof apartments !== undefined) {
        return (
            <ScrollArea className="h-[calc(90vh-130px)] w-full rounded-md border space-y-4">
                <table className="table-fixed w-full bg-white border-collapse">
                    <tr>
                        <th className="text-left w-60 px-4">Address (INCLUDE PICTURES SOMEWHERE)</th>
                        <th>Bedrooms</th>
                        <th>Bathrooms</th>
                        <th>Rent</th>
                        {/* TODO: ADD SORT BY FUNCTIONS */}
                    </tr>
                </table>
    
                {apartments?.map((item, i) => (
                    <SingleApartment key={i} apartmentInfo={item} />
                ))}
            </ScrollArea>
        );
    }

    else {
        return (
            <ScrollArea className="h-[calc(90vh-130px)] w-full rounded-md border space-y-4">
                <table className="table-fixed w-full bg-white border-collapse">
                    <tr>
                        <th className="text-left w-60 px-4">Address</th>
                        <th>Bedrooms</th>
                        <th>Bathrooms</th>
                        <th>Rent</th>
                        {/* TODO: ADD SORT BY FUNCTIONS */}
                    </tr>
                </table>
                
                <div>No apartments yet, go to the parameters tab to update list!</div>
                
            </ScrollArea>
        )
    }
};

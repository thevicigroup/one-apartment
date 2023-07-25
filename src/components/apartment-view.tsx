"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useApartmentContext } from "@/components/providers";
import { SingleApartment } from "@/components/single-apartment";
import { ApartmentCard } from "./apartment-card";

export const ApartmentView = () => {
    const { apartments } = useApartmentContext();
    const apartmentColors = ['#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444']

    if (typeof apartments !== undefined) {
        return (
            <ScrollArea className="h-[calc(90vh-130px)] w-full rounded-md border space-y-4">
                {apartments?.map((item, i) => (
                    <ApartmentCard key={i} apartmentInfo={item} />
                ))}
                </ScrollArea>
        );
    } else {
        return (
            <ScrollArea className="h-[calc(90vh-130px)] w-full rounded-md border space-y-4">
                <div>No apartments yet, go to the parameters tab to update list!</div>
            </ScrollArea>
        );
    }
};

"use client";

import { testApartments } from "@/test-apartments";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ApartmentDetailsCard } from "@/components/apartment-details-card";

import { useApartmentContext } from "./providers";

export const ApartmentView = () => {
    const { apartments } = useApartmentContext();
    return (
        <ScrollArea className="h-[calc(90vh-50px)] w-full rounded-m p-2">
            <ul className="grid grid-cols-2 gap-x-2 gap-y-4">
                {apartments &&
                    apartments.map((apartment, i) => (
                        <ApartmentDetailsCard key={`apartment-card-${i}`} apartment={apartment} />
                    ))}
            </ul>
        </ScrollArea>
    );
};

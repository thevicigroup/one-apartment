"use client";

import { testApartments } from "@/test-apartments";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ApartmentDetailsCard } from "@/components/apartment-details-card";
import { useApartmentContext } from "@/components/providers";
import { SingleApartment } from "@/components/single-apartment";

import { ApartmentCard } from "./apartment-card";

export const ApartmentView = () => {
    return (
        <ScrollArea className="h-[calc(90vh-50px)] w-full rounded-m p-2">
            <ul className="grid grid-cols-2 gap-x-2 gap-y-4">
                {testApartments.map((apartment, i) => (
                    <ApartmentDetailsCard apartment={apartment} />
                ))}
            </ul>
        </ScrollArea>
    );
};

// export const totalApartments = () => {
//     const { apartments } = useApartmentContext();
//     return apartments?.length;
// };

// export const apartmentlength = () => {
//     const { apartments } = useApartmentContext();
//     return apartments?.length;
// };

// export const ApartmentView = () => {
//     const { apartments } = useApartmentContext();

//     if (typeof apartments !== undefined) {
//         return (
//             <ScrollArea className="h-[calc(90vh-50px)] w-full rounded-md border">
//                 {apartments?.map((item, i) => (
//                     <ApartmentCard key={i} apartmentInfo={item} />
//                 ))}
//             </ScrollArea>
//         );
//     } else {
//         return (
//             <ScrollArea className="h-[calc(90vh-130px)] w-full rounded-md border space-y-4">
//                 <div>No apartments yet, go to the parameters tab to update list!</div>
//             </ScrollArea>
//         );
//     }
// };

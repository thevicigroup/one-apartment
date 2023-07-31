"use client";

import Grid from "@mui/material/Grid";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useApartmentContext } from "@/components/providers";
import { SingleApartment } from "@/components/single-apartment";

import { ApartmentCard } from "./apartment-card";

export const totalApartments = () => {
    const { apartments } = useApartmentContext();
    return apartments?.length;
};

export const apartmentlength = () => {
    const { apartments } = useApartmentContext();
    return apartments?.length;
};

export const ApartmentView = () => {
    const { apartments } = useApartmentContext();

    if (typeof apartments !== undefined) {
        return (
            <ScrollArea className="h-[calc(90vh-130px)] w-full rounded-md border space-y-4">
                {/* <Grid container>
                    <Grid item xs={2}> */}
                {apartments?.map((item, i) => (
                    <ApartmentCard key={i} apartmentInfo={item} />
                ))}
                {/* </Grid>
                </Grid> */}
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

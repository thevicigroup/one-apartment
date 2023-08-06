"use client";

import React, { useState } from "react";
import Image from "next/image";

import type { Apartment } from "@/types/apartment";
import { Card, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SaveApartmentButton } from "@/components/save-apartment-button";

interface Props {
    apartment: Apartment;
}

export const ApartmentDetailsCard: React.FC<Props> = ({ apartment }) => {
    return (
        <Dialog>
            <DialogTrigger className="text-left">
                <Card className="rounded-md shadow-md">
                    <CardHeader className="p-0">
                        {/* TODO: Turn into caurosel */}
                        <Image
                            className="rounded-md w-full"
                            src="/test-image.png"
                            width={350}
                            height={10}
                            alt=""
                        />
                    </CardHeader>
                    <div className="p-2">
                        <h1 className="font-bold text-2xl">
                            <div className="flex items-center justify-between">
                                <p>${apartment.price}<span className="text-sm font-medium"> /mo</span></p>
                                <SaveApartmentButton apartmentId={apartment.id} />
                            </div>
                        </h1>
                        <h2 className="font-medium">
                            {apartment.bedrooms} <span className="font-normal">beds |</span>{" "}
                            {apartment.bathrooms} <span className="font-normal">baths |</span>{" "}
                            {apartment.squareFootage} <span className="font-normal">sqft</span>
                        </h2>
                        <p className="text-sm pt-2">{apartment.formattedAddress}</p>
                    </div>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <pre>{JSON.stringify(apartment, null, 2)}</pre>
            </DialogContent>
        </Dialog>
    );
};

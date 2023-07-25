"use client";

import React, { useMemo, useState } from "react";

import {
    ChevronDownIcon,
    CircleIcon,
    PlusIcon,
    StarFilledIcon,
    StarIcon,
  } from "@radix-ui/react-icons"

import { Button } from "./ui/button"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "./ui/card"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu"

import { Separator } from "./ui/separator"
import { Table } from "lucide-react";
import type { Apartment } from "@/components/providers";

interface Props {
    apartmentInfo: Apartment;
}

import { saveApartment, unSaveApartment } from "@/components/providers";

export const ApartmentCard: React.FC<Props> = ({ apartmentInfo }) => {
    const beds = apartmentInfo.bedrooms + ' Bed'
    const baths = apartmentInfo.bathrooms + ' Bath'
    const sqft = apartmentInfo.sqft + ' sqft'
    const price = '$ ' + apartmentInfo.price
    const img = 1
    const apartmentId = apartmentInfo.id

    // Save/Unsave Function
    const [isSaved, setIsSaved] = useState(false);
    const handleButtonClick = () => {
        setIsSaved((prevIsSaved) => !prevIsSaved);
        saveApartment(apartmentId)
        unSaveApartment(apartmentId)
    };
    const buttonLabel = isSaved ? 'Unsave' : 'Save';
    const buttonIcon = isSaved ? <StarFilledIcon className="mr-2 h-4 w-4 visible"/> : <StarIcon className="mr-2 h-4 w-4 visible"/>;
    // Now have the function add the apartment to the user's saved apartments list on prisma
    



    return (
            <Card>
                <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                    <div className="space-y-1">
                        <CardTitle>Apartment Address</CardTitle>
                            <CardDescription>
                                {beds} | {baths} | {sqft} | {price}
                            </CardDescription>
                        </div>
                    <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">

                    <Button onClick={handleButtonClick} variant="secondary" className="px-3 shadow-none">
                            {buttonIcon}
                            {buttonLabel}
                    </Button>
                    
                    <Separator orientation="vertical" className="h-[20px]" />

                    </div>    
                </CardHeader>

                <CardContent>
                    <div>put pictures here</div>
                </CardContent>
                </Card>
    )
}


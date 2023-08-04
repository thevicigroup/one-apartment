"use client";

import dynamic from "next/dynamic";
const twElements = typeof window !== "undefined" && dynamic(import("tw-elements"));



import React, { useMemo, useState } from "react";
import {
    ChevronDownIcon,
    CircleIcon,
    PlusIcon,
    StarFilledIcon,
    StarIcon,
} from "@radix-ui/react-icons";
import { Table } from "lucide-react";
import { initTE, Carousel } from "tw-elements";
import type { Apartment } from "@/components/providers";
import { useApartmentContext } from "@/components/providers";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

interface Props {
    apartmentInfo: Apartment;
}

// import { saveApartment, unSaveApartment } from "@/components/providers";

export const ApartmentCard: React.FC<Props> = ({ apartmentInfo }) => {
    const init = async () => {
        const { initTE, Carousel } = await import("tw-elements");
        initTE({ initTE, Carousel });
      };
    
    const { saveApartment, unsaveApartment } = useApartmentContext();
    const beds = apartmentInfo.bedrooms + " Bed";
    const baths = apartmentInfo.bathrooms + " Bath";
    const sqft = apartmentInfo.squareFootage + " sqft";
    const price = "$ " + apartmentInfo.price;
    const img = 1;
    const apartmentId = apartmentInfo.id;

    // Save/Unsave Function
    const [isSaved, setIsSaved] = useState(false);

    const handleButtonClick = () => {
        setIsSaved((prevIsSaved) => !prevIsSaved);
        if (isSaved) {
            unsaveApartment(apartmentId);
        } else {
            saveApartment(apartmentInfo);
        }
    };

    const buttonLabel = isSaved ? "Unsave" : "Save";
    const buttonIcon = isSaved ? (
        <StarFilledIcon className="mr-2 h-4 w-4 visible" />
    ) : (
        <StarIcon className="mr-2 h-4 w-4 visible" />
    );
    // Now have the function add the apartment to the user's saved apartments list on prisma

    // TODO: Change this to the images from the results of the apartment api
    const images = [
        "https://wallpaperscraft.com/image/planet_light_spots_space_86643_1920x1080.jpg",
        "http://www.highreshdwallpapers.com/wp-content/uploads/2014/01/Outer-Space-HD-Wallpaper-Pack-5.jpg",
        "https://images4.alphacoders.com/106/thumb-1920-106826.jpg",
    ];

    // convert to typescript function

    

    return (
        <Card>
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                <div className="space-y-1">
                    <CardTitle>{apartmentInfo.formattedAddress}</CardTitle>
                    <CardDescription>
                        {beds} | {baths} | {sqft} | {price}
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
                    <Button
                        onClick={handleButtonClick}
                        variant="secondary"
                        className="px-3 shadow-none"
                    >
                        {buttonIcon}
                        {buttonLabel}
                    </Button>

                    <Separator orientation="vertical" className="h-[20px]" />
                </div>
            </CardHeader>

            <CardContent>
                <div
                    id="carouselExampleControls"
                    className="relative"
                    data-te-carousel-init
                    data-te-carousel-slide
                >
                    <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                        <div
                            className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item
                            data-te-carousel-active
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
                                className="block w-full"
                                alt="Wild Landscape"
                            />
                        </div>
                        <div
                            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
                                className="block w-full"
                                alt="Camera"
                            />
                        </div>
                        <div
                            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
                                className="block w-full"
                                alt="Exotic Fruits"
                            />
                        </div>
                    </div>

                    <button
                        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                        type="button"
                        data-te-target="#carouselExampleControls"
                        data-te-slide="prev"
                        >
                        <span className="inline-block h-8 w-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>
                        </span>
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Previous
                        </span>
                    </button>
                    <button
                        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                        type="button"
                        data-te-target="#carouselExampleControls"
                        data-te-slide="next"
                    >
                        <span className="inline-block h-8 w-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </span>
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Next
                        </span>
                    </button>
                </div>
            </CardContent>



            {/* TODO: MAKE THIS A CAROUSEL WITH MULTIPLE SHOWING */}
            <CardDescription>Roommates that would live here too:</CardDescription>
            <CardFooter>
                <div
                    id="carouselExampleControls"
                    className="relative"
                    data-te-carousel-init
                    data-te-carousel-slide
                >
                    <div className="relative w-52 overflow-hidden after:clear-both after:block after:content-['']">
                        <div
                            className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item
                            data-te-carousel-active
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
                                className="block w-full"
                                alt="Wild Landscape"
                            />
                        </div>
                        <div
                            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
                                className="block w-full"
                                alt="Camera"
                            />
                        </div>
                        <div
                            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
                                className="block w-full"
                                alt="Exotic Fruits"
                            />
                        </div>
                    </div>

                    <button
                        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                        type="button"
                        data-te-target="#carouselExampleControls"
                        data-te-slide="prev"
                        >
                        <span className="inline-block h-8 w-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>
                        </span>
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Previous
                        </span>
                    </button>
                    <button
                        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                        type="button"
                        data-te-target="#carouselExampleControls"
                        data-te-slide="next"
                    >
                        <span className="inline-block h-8 w-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </span>
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Next
                        </span>
                    </button>
                </div>
            </CardFooter>
        </Card>
    );
};

"use client";

import React, { useEffect, useState } from "react";
import { testApartments } from "@/test-apartments";
import Button from "@mui/material/Button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApartmentDetailsCard } from "@/components/apartment-details-card";

import { useApartmentContext } from "./providers";
import { Separator } from "./ui/separator";

export const ApartmentView = () => {
    const { apartments } = useApartmentContext();
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<"neither" | "asc" | "desc">("asc");
    const changeSortOrder = () => {
        if (sortOrder === "neither") {
            setSortOrder("asc");
        } else if (sortOrder === "asc") {
            setSortOrder("desc");
        } else if (sortOrder === "desc") {
            setSortOrder("neither");
        } else {
            console.log("Error: Invalid sortOrder");
        }
    };

    
    const [products, setProducts] = useState([
        { id: 1, name: 'Product A', price: 100 },
        { id: 2, name: 'Product B', price: 50 },
        { id: 3, name: 'Product C', price: 150 }
      ]);
    
      const [isSorted, setIsSorted] = useState<boolean>(false);
    
      const sortByPrice = () => {
        const sortedProducts = [...products].sort((a, b) => a.price - b.price);
        setProducts(sortedProducts);
        setIsSorted(true);
      };

    // Use UseEffect to update the apartments when the sortOrder changes
    // This is to prevent the apartments from being updated when the user
    // is scrolling down the page
    // This is also to prevent the apartments from being updated when the user
    // is scrolling up the page
    useEffect(() => {
        if (sortOrder === "asc") {
            apartments?.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            apartments?.sort((a, b) => b.price - a.price);
        } else {
            // Do nothing
        }
        setShowDropDown(showDropDown);
    }, [setShowDropDown]);

    return (
        <ScrollArea className="h-[calc(90vh-50px)] w-full rounded-m p-2">
            <div className="flex justify-between items-center float-left">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <DropdownMenuLabel>Sort By Price</DropdownMenuLabel>
                        {/* <Button onClick={changeSortOrder}>Sort by Price {sortOrder}</Button> */}
                        {/* EVENTUALLY SHOULD ADD FONTAWESOME SORTING ICONS */}
                    </DropdownMenuTrigger>
                    <DropdownMenuLabel>{showDropDown}</DropdownMenuLabel>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Ascending ↑</DropdownMenuItem>
                        <DropdownMenuItem>Descending ↓</DropdownMenuItem>
                        <DropdownMenuItem>Neither</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <DropdownMenuLabel>Sort By Square Footage</DropdownMenuLabel>
                        {/* <Button onClick={changeSortOrder}>Sort by Price {sortOrder}</Button> */}
                        {/* EVENTUALLY SHOULD ADD FONTAWESOME SORTING ICONS */}
                    </DropdownMenuTrigger>
                    <DropdownMenuLabel>{showDropDown}</DropdownMenuLabel>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Ascending ↑</DropdownMenuItem>
                        <DropdownMenuItem>Descending ↓</DropdownMenuItem>
                        <DropdownMenuItem>Neither</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <DropdownMenuLabel>Sort By Rating</DropdownMenuLabel>
                        {/* <Button onClick={changeSortOrder}>Sort by Price {sortOrder}</Button> */}
                        {/* EVENTUALLY SHOULD ADD FONTAWESOME SORTING ICONS */}
                    </DropdownMenuTrigger>
                    <DropdownMenuLabel>{showDropDown}</DropdownMenuLabel>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Ascending ↑</DropdownMenuItem>
                        <DropdownMenuItem>Descending ↓</DropdownMenuItem>
                        <DropdownMenuItem>Neither</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Separator></Separator>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-4">
                {apartments &&
                    apartments.map((apartment, i) => (
                        <ApartmentDetailsCard key={`apartment-card-${i}`} apartment={apartment} />
                    ))}
            </ul>
        </ScrollArea>
    );
};

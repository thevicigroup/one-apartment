"use client";

import React, { useEffect, useState } from "react";
import { BellPlus, BellRing } from "lucide-react";
import { Button } from "react-bootstrap";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const checkNotification = () => {
    // Implement your logic to check for pending requests
    // For the sake of this example, let's simulate it with a state
    return Math.random() < 0.5; // Simulating random pending requests
};

export const BellIcon = () => {
    const [hasPendingRequest, setHasPendingRequest] = useState(false);

    useEffect(() => {
        // When the component mounts, check for pending requests
        setHasPendingRequest(checkNotification());
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {/* Render the appropriate bell icon based on pending requests */}
                {hasPendingRequest ? <BellRing /> : <BellPlus />}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Apartments</DropdownMenuItem>
                <DropdownMenuItem>Friends</DropdownMenuItem>
                <DropdownMenuItem>Groups</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

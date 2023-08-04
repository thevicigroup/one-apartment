'use client'
import React, { useState, useEffect } from "react";
import { Bell, BellRing, BellPlus } from 'lucide-react'
import { Button } from "react-bootstrap";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const checkNotification = () => {
    // Implement your logic to check for pending requests
    // For the sake of this example, let's simulate it with a state
    return Math.random() < 0.5; // Simulating random pending requests
}


export const BellIcon = () => {
    const [hasPendingRequest, setHasPendingRequest] = useState(false);

    useEffect(() => {
        // When the component mounts, check for pending requests
        setHasPendingRequest(checkNotification());
    }, []);

    const bellClick = () => {
        console.log('bell clicked');
        return (
            <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Apartments</DropdownMenuItem>
                <DropdownMenuItem>Friends</DropdownMenuItem>
                <DropdownMenuItem>Groups</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <div>
            <Button>
                {/* Render the appropriate bell icon based on pending requests */}
                {hasPendingRequest ? (
                    <BellRing onClick={bellClick} />
                ) : (
                    <BellPlus onClick={bellClick} />
                )}
            </Button>
        </div>
    );
}


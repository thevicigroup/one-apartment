'use client'
import React from "react";
import { Bell, BellRing, BellPlus } from 'lucide-react'
import { Button } from "react-bootstrap";

const checkNotification = () => {
    console.log('check notification')
    return true
}

const bellClick = () => {
    console.log('bell clicked')
}
export const BellIcon = async () => {
    return (
    <div>
        <Button>
            <Bell onClick={bellClick} />
        </Button>
    </div>
    )
        // if checkNotification() == true
        //     return (
        //         <div>
        //             <Button>
        //                 <Bell onClick={bellClick}></Bell>
        //             </Button>
        //         </div>
        //     )
        // if checkNotification() == false
        //     return (
        //         <div>
        //             <Button>
        //                 <Bell onClick={bellClick}></Bell>
        //             </Button>
        //         </div>
        //     )
}


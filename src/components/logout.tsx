"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const Logout = () => {
    return (
        <div
            className="flex items-center justify-between w-full cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
        >
            <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
            </div>
            <span className="text-xs">⌘Q</span>
        </div>
    );
};

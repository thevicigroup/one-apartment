import React from "react";

import { BellIcon } from "@/components/layout/bell-icon";
import { Logo } from "@/components/layout/logo";
import { UserButton } from "@/components/layout/user-button";

export const MainNav = () => {
    return (
        <nav className="flex items-center justify-between px-12 h-12 border-b border-b-accent">
            <Logo />
            <div className="flex items-center gap-4">
                <BellIcon />
                <UserButton />
            </div>
        </nav>
    );
};

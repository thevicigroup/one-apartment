import React from "react";

import { Logo } from "@/components/layout/logo";
import { UserButton } from "@/components/layout/user-button";
import { Friends } from "@/components/layout/friends";

export const MainNav = () => {
    return (
        <nav className="flex items-center justify-between px-12 h-12 border-b border-b-accent">
            <Logo />
            <Friends />
            <UserButton />
        </nav>
    );
};

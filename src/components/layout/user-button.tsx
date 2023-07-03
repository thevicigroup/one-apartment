import React from "react";
import { Settings } from "lucide-react";

import { getCurrentUser } from "@/lib/auth/get-server-session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GithubLoginButton } from "@/components/github-login-button";
import { Logout } from "@/components/logout";

export const UserButton = async () => {
    const user = await getCurrentUser();
    if (!user) {
        return <GithubLoginButton />;
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2  outline-none">
                <h1 className="">Hello, {user.name}!</h1>
                <Avatar className="w-9 h-9">
                    <AvatarImage src={user.image ?? undefined} />
                    <AvatarFallback>
                        {user.name ? user.name.charAt(0).toUpperCase() : "VG"}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" sideOffset={10}>
                <DropdownMenuItem className="flex flex-col items-start gap-y-2">
                    <div className="flex items-center gap-2">
                        <Avatar className="w-9 h-9">
                            <AvatarImage src={user.image ?? undefined} />
                            <AvatarFallback>
                                {user.name ? user.name.charAt(0).toUpperCase() : "VG"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left text-xs">
                            <h1 className="font-medium">{user.email}</h1>
                            <h2 className="text-foreground">@{user.name}</h2>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                        </div>
                        <span className="text-xs">⌘S</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Logout />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

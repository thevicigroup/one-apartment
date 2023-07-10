import React from "react";
import type { User } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
    user: User;
}

export const UserProfileTab: React.FC<Props> = ({ user }) => {
    return (
        <div className="flex gap-2 p-4">
            <Avatar className="w-24 h-24">
                <AvatarImage src={user.image ?? undefined} />
                <AvatarFallback>
                    {user.name ? user.name.charAt(0).toUpperCase() : ""}
                </AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <h2 className="text-lg text-muted-foreground">{user.email}</h2>
            </div>
        </div>
    );
};

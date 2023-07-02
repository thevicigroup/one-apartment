"use client";

import React from "react";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const GithubLoginButton = () => {
    return (
        <Button
            onClick={() =>
                signIn("github", {
                    callbackUrl: `${window.location.origin}/`,
                })
            }
            className="flex rounded-full"
            variant="outline"
            size="sm"
        >
            <Github className="w-5 h-5 pr-1" />
            Login with Github
        </Button>
    );
};

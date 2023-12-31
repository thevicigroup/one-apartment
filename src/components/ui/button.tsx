"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { ButtonOrLink, Props } from "@/components/ui/button-or-link";

type BUTTON_SIZE = "sm" | "md" | "lg";
type BUTTON_VARIANT = "brand" | "secondary" | "ghost" | "outline" | "link" | "danger" | "success";

export type ButtonThemeProps = {
    size?: BUTTON_SIZE;
    variant?: BUTTON_VARIANT;
};

export const classes = {
    base: "inline-flex items-center justify-center rounded-md text-sm transition-colors disabled:pointer-events-none outline-none \
    disabled:cursor-not-allowed disabled:opacity-70 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 py-2 px-4 text-sm",
        lg: "px-6 py-3 text-lg",
    },
    variant: {
        brand: "bg-primary text-primary-foreground hover:bg-red-600",
        secondary:
            "bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full",
        ghost: "font-medium hover:bg-accent hover:text-accent-foreground",
        outline: "font-medium border border-input hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 font-light underline text-primary",
        danger: "bg-destructive text-white hover:bg-destructive/90",
        success: "bg-emerald-500 text-white hover:bg-emerald-500/90",
    },
};

export function getButtonClasses(
    style: { size?: BUTTON_SIZE; variant?: BUTTON_VARIANT },
    ...rest: string[]
) {
    const { size = "md", variant = "brand" } = style;
    return cn(classes["base"], classes["size"][size], classes["variant"][variant], ...rest);
}

export type ButtonProps = ButtonThemeProps & Props;
export const Button: React.FC<ButtonProps> = ({
    size = "md",
    variant = "brand",
    className = "",
    disabled = false,
    children,
    ...props
}) => {
    return (
        <ButtonOrLink
            className={getButtonClasses({ size, variant }, className)}
            disabled={disabled}
            {...props}
        >
            {children}
        </ButtonOrLink>
    );
};

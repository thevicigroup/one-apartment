import React from "react";
import { Inter } from "next/font/google";

import "@/globals.css";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--inter" });

export const metadata = { title: "Vici Apartments" };
interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <head />
            <body className={cn("min-h-screen bg-background text-foreground", inter.className)}>
                {children}
            </body>
        </html>
    );
}


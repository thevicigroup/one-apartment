import React from "react";
import { Inter } from "next/font/google";

import "@/globals.css";

import { cn } from "@/lib/utils";
import { LockBodyScroll } from "@/components/layout/lock-body-scroll";
import { MainNav } from "@/components/layout/navbar";
import { Logo } from "@/components/logo";

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
                <div className="flex min-h-screen flex-col">
                    <header className="container hidden md:flex justify-between py-1">
                        <Logo />
                        <MainNav />
                    </header>
                    <main className="flex-1 overflow-y-auto">{children}</main>
                    <LockBodyScroll />
                </div>
            </body>
        </html>
    );
}

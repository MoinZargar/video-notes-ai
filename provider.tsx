"use client"
import React from "react";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
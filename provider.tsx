"use client"
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>
    )
}
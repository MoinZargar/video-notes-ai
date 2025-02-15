"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleSignInForm from "@/components/forms/GoogleSignInForm";
import GithubSignInForm from "@/components/forms/GithubSignInForm";
import SignInForm from "@/components/forms/SignInForm";

export default function SignIn() {
    
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Sign in
                    </CardTitle>
                </CardHeader>
                <CardContent>
                   <GoogleSignInForm/>
                   <GithubSignInForm/>
                   <SignInForm/>

                </CardContent>
            </Card>
        </div>
    );
}
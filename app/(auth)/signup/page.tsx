"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleSignInForm from "@/lib/forms/GoogleSignInForm";
import GithubSignInForm from "@/lib/forms/GithubSignInForm";
import SignUpForm from "@/lib/forms/SignUpForm";


export default function SignUp() {
    
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-gray-800">
                        Sign Up
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <GoogleSignInForm />
                    <GithubSignInForm />
                    <SignUpForm />
                </CardContent>
            </Card>
        </div>
    );
}
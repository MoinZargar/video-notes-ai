import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import ErrorMessage from "@/components/ErrorMessage";

export default function GoogleSignInForm() {
    const [globalError, setGlobalError] = useState<string>("");
    const handleGoogleSignin = async () => {
        try {
            setGlobalError("");
            await signIn('google');
        } catch (error) {
            setGlobalError('Failed to sign in with Google');
        }
    };

    return (
        <div>
            {globalError && <ErrorMessage error={globalError} />}
            <form className="w-full" action={handleGoogleSignin}>
                <Button
                    variant="outline"
                    className="w-full shadow-md hover:shadow-lg mb-4"
                    type="submit"
                >
                    <FcGoogle className="h-6 w-6 mr-2" />
                    Sign in with Google
                </Button>
            </form>
        </div>
    )
}
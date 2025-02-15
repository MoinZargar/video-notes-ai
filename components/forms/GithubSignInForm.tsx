import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import ErrorMessage from "@/components/ErrorMessage";

export default function GithubSignInForm() {
    const [globalError, setGlobalError] = useState<string>("");
    
    const handleGithubSignin = async () => {
        try {
            setGlobalError("");
            await signIn('github',{ callbackUrl: '/dashboard' });   
        } catch (error) {
            setGlobalError('Failed to sign in with Google');
        }
    };

    return (
        <div>
            {globalError && <ErrorMessage error={globalError} />}
            <form className="w-full" action={handleGithubSignin}>
                <Button
                    variant="outline"
                    className="w-full shadow-md hover:shadow-lg mb-4"
                    type="submit"
                >
                    <FaGithub className="h-6 w-6 mr-2" />
                    Sign in with GitHub
                </Button>
            </form>
        </div>
    )
}
'use client'
import { useRef, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/lib/schemas/authSchema";
import LoadingButton from "@/components/LoadingButton";
import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'


export default function SignInForm() {
    const [globalError, setGlobalError] = useState<string>("");
    const router = useRouter();
    const ref = useRef<TurnstileInstance | null>(null)
    const [token, setToken] = useState<string>("")
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
            captchaToken: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        try {
            setGlobalError("");
            if (!token) {
                setGlobalError("Please complete the CAPTCHA verification");
                return;
            }
            const response = await signIn(
                "credentials",
                { redirect: false, ...values, captchaToken: token }
            );

            if (response?.error) {
                setGlobalError('Incorrect email or password.');
                ref.current?.reset();
                setToken("");
                return;
            }
            
            router.push("/dashboard");
        } catch (error: any) {
            setGlobalError(error?.response?.data?.error || 'Internal server error');
            ref.current?.reset();
            setToken("");
        }
    };
    return (
        <div className="mt-4">
            {globalError && <ErrorMessage error={globalError} />}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Turnstile
                        ref={ref}
                        onSuccess={(token) => setToken(token)}
                        siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
                        onExpire={() => ref.current?.reset()}
                        onError={(error) => {
                            setGlobalError(error)
                        }}
                    />
                    <LoadingButton
                        pending={!token || form.formState.isSubmitting}
                    >
                        Sign in
                    </LoadingButton>
                    <p className="mt-4 text-center text-sm">
                        Don't have an account? <Link href="/signup" className="text-blue-600 hover:text-blue-800">Sign up</Link>
                    </p>
                </form>
            </Form>

        </div>
    )
}
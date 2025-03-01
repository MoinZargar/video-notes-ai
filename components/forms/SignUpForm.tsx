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
import { signUpSchema } from "@/lib/schemas/authSchema";
import LoadingButton from "@/components/LoadingButton";
import ErrorMessage from "@/components/ErrorMessage";
import axios from "axios";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'


export default function SignupForm() {
    const [globalError, setGlobalError] = useState<string>("");
    const [token, setToken] = useState<string>("")
    const ref = useRef<TurnstileInstance | null>(null)
    const router = useRouter();
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            captchaToken:""
        },
    });

    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
        try {
            setGlobalError("");
        
            if (!token) {
                setGlobalError("Please complete the CAPTCHA verification");
                return;
            }
            const response = await axios.post('/api/auth/signup',
                {
                    ...values,
                    captchaToken: token
                }
            );
            if (response) {
                const data = {
                    email: values.email,
                    password: values.password,
                    captchaToken : token 
                }
                await signIn(
                    "credentials",
                    { redirect: false, ...data }
                );
            }
            // Reset form after successful submission
            form.reset();
            ref.current?.reset();
            setToken("");
            router.push("/dashboard");
        } catch (error: any) {
            setGlobalError(error?.response?.data?.error || 'Internal server error');
            // Reset form on error
            form.reset();
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your name"
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
                    <div className="w-full flex justify-center">
                        <Turnstile
                            ref={ref}
                            onSuccess={(token) => setToken(token)}
                            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
                            onExpire={() => ref.current?.reset()}
                            onError={(error)=>{
                                setGlobalError(error)
                            }}
                        />
                    </div>
                    <LoadingButton
                        pending={!token || form.formState.isSubmitting}
                    >
                        Sign up
                    </LoadingButton>
                    <p className="mt-4 text-center text-sm">
                        Already have an account? <Link href="/signin" className="text-blue-600 hover:text-blue-800">Sign in</Link>
                    </p>
                </form>
            </Form>
        </div>
    )
}
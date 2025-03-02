import { boolean, object, string } from "zod";

export const signUpSchema = object({
    name: string({ required_error: "Name is required" })
        .min(3, "Name must be more than 3 characters")
        .max(50, "Name must be less than 50 characters")
        .trim()
        .toLowerCase(),
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email")
        .trim()
        .toLowerCase(),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(6, "Password must be atleast 6 characters")
        .max(32, "Password must be less than 32 characters")
        .trim(),
    captchaToken: string()

});

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email")
        .trim()
        .toLowerCase(),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(6, "Password must be atleast 6 characters")
        .max(32, "Password must be less than 32 characters")
        .trim(),
    captchaToken: string().optional(),
    isPostSignup: string()
    .trim()
});
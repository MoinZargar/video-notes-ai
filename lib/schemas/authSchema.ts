import { object, string } from "zod";

export const signUpSchema = object({
    name: string({ required_error: "Name is required" })
        .min(3, "Name must be more than 3 characters")
        .max(40, "Name must be less than 40 characters")
        .trim()
        .toLowerCase(),
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email")
        .trim()
        .toLowerCase(),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(6, "Password must be more than 6 characters")
        .max(32, "Password must be less than 32 characters")
        .trim(),
});

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email")
        .trim()
        .toLowerCase(),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(6, "Password must be more than 6 characters")
        .max(32, "Password must be less than 32 characters")
        .trim(),
});
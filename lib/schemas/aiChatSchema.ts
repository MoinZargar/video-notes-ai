import { object, string } from "zod";

export const aiChatSchema = object({
    message: string({ required_error: "Message is required" })
        .min(2, "Message must be at least 2 characters long") 
        .max(1500, "Text is too long")
        .trim()
        .refine((val) => val.trim().length >= 2, {
            message: "Message must contain meaningful content"
        }),
});
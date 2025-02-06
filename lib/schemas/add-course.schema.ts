import { object, string } from "zod";

export const addCourseSchema = object({
    name: string({ required_error: "Course name is required" })
        .min(3, "Name must be more than 3 characters")
        .max(80, "Name must be less than 80 characters"),
    description: string()
        .max(200, "Description must be less than 200 characters")
        .optional(),
});
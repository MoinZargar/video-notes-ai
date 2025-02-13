import { object, string } from "zod";

export const createCourseSchema = object({
    name: string({ required_error: "Course name is required" })
        .min(3, "Course name must be atleast 3 characters")
        .max(80, "Course name must be less than 80 characters")
        .trim()
        .toLowerCase(),
    description: string()
        .max(200, "Description must be less than 200 characters")
        .trim()
        .toLowerCase()
        .optional(),
});
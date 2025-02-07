import { z } from "zod"

export const videoNotesSchema = z.object({
    videoUrl: z.string({ required_error: "Video URL is required" })
        .url("Please enter a valid YouTube URL")
        .trim(),
    course: z.string({ required_error: "Course is required" })
        .min(1, "Please select a course")
        .max(80, "Course name must be less than 80 characters")
        .trim(),
})
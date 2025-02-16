import { z } from "zod";

const fileSizeLimit = 30 * 1024 * 1024;
export const pdfNotesSchema = z.object({
    pdfFile: z
        .instanceof(File)
        .refine(
            (file) =>
                ["application/pdf"].includes(file.type),
            { message: "Please upload a document in PDF format" }
        )
        .refine((file) => file.size <= fileSizeLimit, {
            message: "File size should not exceed 15MB"
        }),

    course: z.string().min(1, "Course name is required"),
});

import { z } from "zod"
import { videoNotesSchema } from "@/lib/schemas/videoNotesSchema"
import { signUpSchema } from "@/lib/schemas/authSchema"
import { signInSchema } from "@/lib/schemas/authSchema"
import { createCourseSchema } from "@/lib/schemas/createCourseSchema"


export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
export type VideoNotesFormData = z.infer<typeof videoNotesSchema>
export type createCourseFormData = z.infer<typeof createCourseSchema>


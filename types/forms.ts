import { z } from "zod"
import { videoNotesSchema } from "@/lib/schemas/videoNotesSchema"
import { signUpSchema } from "@/lib/schemas/authSchema"
import { signInSchema } from "@/lib/schemas/authSchema"
import { createCourseSchema } from "@/lib/schemas/createCourseSchema"
import { aiChatSchema } from "@/lib/schemas/aiChatSchema"


export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
export type VideoNotesFormData = z.infer<typeof videoNotesSchema>
export type CreateCourseFormData = z.infer<typeof createCourseSchema>
export type AIChatFormData = z.infer<typeof aiChatSchema>


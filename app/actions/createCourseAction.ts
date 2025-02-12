"use server"
import { createCourseSchema } from "@/lib/schemas/createCourseSchema";
import db from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { CreateCourseFormData } from "@/types/forms";

export async function createCourse(values: CreateCourseFormData) {
    try {     
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            throw new Error("Unauthorized request");
        }
        
        const { name, description } = values;
        const validatedFields = createCourseSchema.safeParse(values);
        if (!validatedFields.success) {
            throw new Error("Invalid fields");
        }
        //check if course already exists
        const courseExists = await db.course.findFirst({
            where: { name, userId: Number(session.user.id) }
        })
        if (courseExists) {
            throw new Error("Course already exists");
        }
        const course = await db.course.create({
            data: { name, description, userId: Number(session.user.id) },
        });
        
        if (!course) {
            throw new Error("Failed to create course");
        }
        return { success: "Course created successfully", course };


    } catch (error) {
        throw error;
    }

}

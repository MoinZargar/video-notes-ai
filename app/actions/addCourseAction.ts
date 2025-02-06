"use server"
import { addCourseSchema } from "@/lib/schemas/add-course.schema";
import db from "@/lib/prisma";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";



export async function addCourse(values: z.infer<typeof addCourseSchema>) {
    try {
        
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return { error: "Unauthorized request " };
        }
        
        const { name, description } = values;
        const validatedFields = addCourseSchema.safeParse(values);
        if (!validatedFields.success) {

            return { error: "Invalid fields" };
        }
        const course = await db.course.create({
            data: { name, description, userId: Number(session.user.id) },
        });
        
        if (!course) {
            return { error: "Failed to create course" };
        }
        return { success: "Course created successfully", course };


    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
           
            if (error.code === 'P2002') {
                throw new Error("A course with this name already exists");
            }
        }
        
        throw new Error("Something went wrong while creating the course");
    }

}

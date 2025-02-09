"use server"
import db from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { Course } from "@prisma/client"

export async function fetchCourses(): Promise<Course[]> {
        try {
            const session = await getServerSession(authOptions)
            const courses = await db.course.findMany({
              where: {
                userId: Number(session?.user.id)
              }
            })
            return courses
        } catch (error) {
            console.error('Error in fetchCourses:', error)
            return []
        }


}

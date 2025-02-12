"use server"
import db from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { Course } from "@prisma/client"

export async function fetchCourses(): Promise<Course[]> {
        try {
            const session = await getServerSession(authOptions)
            if (!session?.user) {
              return []
            }
            const userId = Number(session?.user.id)
            const courses = await db.course.findMany({
              where: {
                userId: userId
              }
            })
            return courses
        } catch (error) {
            return []
        }
}

"use server"
import db from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { Course } from "@prisma/client"

export async function fetchCourses(): Promise<Course[]> {
  const session = await getServerSession(authOptions)
  try {
    if (!session?.user) {
      throw new Error("Unauthorized request")
    }
    const userId = Number(session?.user.id)
    const courses = await db.course.findMany({
      where: {
        userId: userId
      }
    })
    return courses
  } catch (error) {
    throw error;
  }
  finally {
    console.log("User ", session?.user?.email)
  }
}

"use server"

import { authOptions } from "@/lib/auth"
import db from "@/lib/prisma"
import { getServerSession } from "next-auth"

export default async function fetchNotesAction(course: string) {
   try {
     const session = await getServerSession(authOptions)
     if (!session) {
        console.log("Unauthorized")
         return []
     }
     const userId = Number(session.user.id)
     const Course = await db.course.findFirst({ where: { name: course, userId } })
     const courseId = Number(Course?.id)
     if (!courseId || !userId) {
         console.log("Course not found")
         return []
     }
 
 

     const notes = await db.notes.findMany(
         {
             where: {
                 courseId,
                 userId
             }
         }
     )
     return notes
   } catch (error) {
    console.log("Error fetching notes",error)
      return []
   }

}





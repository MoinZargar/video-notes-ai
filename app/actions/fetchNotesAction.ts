"use server"

import { authOptions } from "@/lib/auth"
import db from "@/lib/prisma"
import { Notes } from "@prisma/client"
import { getServerSession } from "next-auth"

export default async function fetchNotesAction(course: string): Promise<Notes[]> {
   try {
     const session = await getServerSession(authOptions)
     if (!session) {
         return []
     }
     const userId = Number(session.user.id)
     const Course = await db.course.findFirst({ where: { name: course, userId } })
     const courseId = Number(Course?.id)
     if (!courseId || !userId) {
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
      return []
   }

}





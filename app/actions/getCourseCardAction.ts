import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import  db  from "@/lib/prisma";
import { CourseWithNotesCount } from "@/types/course";

export default async function getCourseCardAction(): Promise<CourseWithNotesCount[] | undefined>{
    try {
        const session = await getServerSession(authOptions)
    
        if (!session?.user) {
            return []
        }
        const userId = Number(session?.user?.id)
        const courses = await db.course.findMany({
            where: {
                userId: userId
            },
            include: {
                _count: {
                    select: {
                        notes: true
                    }
                }
            }
        }) 
        return courses  
        
    } catch (error) {
        return []
    }
}

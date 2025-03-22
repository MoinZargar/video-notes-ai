import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import  db  from "@/lib/prisma";
import { CourseWithNotesCount } from "@/types/course";

export default async function getCourseCardAction(): Promise<CourseWithNotesCount[] | undefined>{
    const session = await getServerSession(authOptions)
    try {
        if (!session?.user) {
            throw new Error("Unauthorized request")
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
        throw error;
    }
    finally {
        console.log("User ", session?.user?.email)
    }
}

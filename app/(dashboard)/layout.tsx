"use server"
import Sidebar from "@/components/Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { fetchCourses } from "@/app/actions/fetchCourseAction"
import { Course } from "@prisma/client"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const courses: Course[] = await fetchCourses()

    return (
        <SidebarProvider>
            <main className="flex min-h-screen">
                <Sidebar initialCourses={courses} />
                <div className="flex-1">
                    <SidebarTrigger />
                    
                </div>
                {children}

            </main>
        </SidebarProvider>
    )
}
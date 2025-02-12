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
    try {
        const courses: Course[] = await fetchCourses()
        return (
            <SidebarProvider>
                <main className="flex min-h-screen w-full">
                    <Sidebar initialCourses={courses} />
                    <div className="flex-1">
                        <SidebarTrigger />

                    </div>
                    {children}

                </main>
            </SidebarProvider>
        )
    } catch (error: unknown) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8 text-center">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    Error: {(error as Error).message || "We are facing a problem currently. We will be back soon."}
                </h2>
            </div>
        )
    }
}
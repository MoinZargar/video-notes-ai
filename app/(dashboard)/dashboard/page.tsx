"use server"
import getCourseCardAction from "@/app/actions/getCourseCardAction"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import DashboardContent from "@/components/DashboardContent"

export default async function DashboardPage() {
  const courses = await getCourseCardAction()
  const session = await getServerSession(authOptions)
  const userName = session?.user?.name
  return (
    <div className="min-h-screen w-full bg-[#F8F7FC]">
      <div className="container mx-auto sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">
            Welcome back, {userName} <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Create AI-powered study notes from YouTube lectures
          </p>
        </div>
          <DashboardContent courses={courses} />
      </div>
    </div>
  )
}
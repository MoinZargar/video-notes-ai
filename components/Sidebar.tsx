"use client"
import {LayoutDashboard, Upload, Play, BookOpen } from "lucide-react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Course } from "@prisma/client"
import AddCourse from "@/components/AddCourse";
import { useState } from "react";



const stats = [
  { label: "Dashboard", icon: <LayoutDashboard className="mr-3 h-4 w-4" /> },
  { label: "Upload & Generate", icon: <Upload className="mr-3 h-4 w-4" /> },
  { label: "Quick Start Exercise", icon: <Play className="mr-3 h-4 w-4" /> },
]



export default function AppSidebar({ initialCourses }: { initialCourses: Course[] }) {
  
  const [courses, setCourses] = useState<Course[]>(initialCourses || []);
  const handleCourseAdded = (newCourse: Course) => {
    setCourses(prevCourses => Array.isArray(prevCourses) ? [...prevCourses, newCourse] : [newCourse]);
  }



  return (
    <Sidebar className="w-[240px] lg:w-[280px] border-r-0 bg-[#0A0A0A] ">
      <SidebarHeader className="border-b border-zinc-800/50 p-4 bg-[#0A0A0A]">
        <div className="space-y-8">
          <h2 className="text-2xl font-medium text-white mt-2">VidNotes</h2>
          <div className="space-y-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center text-base text-zinc-200 hover:bg-zinc-800/50 hover:text-white rounded-md p-2 cursor-pointer transition-colors"
              >
                {stat.icon}
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0 bg-[#0A0A0A]">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-3 text-xs font-medium text-zinc-400">COURSES</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {courses && courses.length > 0 ? (
                courses.map((course) => (
                  <SidebarMenuItem key={course.id}>
                    <SidebarMenuButton
                      asChild
                      className="w-full justify-start px-4 py-2 hover:bg-zinc-800/50 hover:text-white text-zinc-200 transition-colors"
                    >
                      <Link href="/dashbaord">
                        <BookOpen key={course.name} className="mr-3 h-4 w-4" />
                        {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="text-zinc-400 px-4 py-2">No courses available</div>
              )}
              <SidebarMenuItem>
                <AddCourse onCourseAdded={handleCourseAdded} />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

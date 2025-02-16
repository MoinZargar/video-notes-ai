"use client"
import { LayoutDashboard, Play, BookOpen, ChevronUp, Upload } from "lucide-react"
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
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Course } from "@prisma/client"
import CreateCourse from "@/components/CreateCourse"
import { useEffect, useState } from "react"
import VideoToNotesForm from "@/components/forms/VideoToNotesForm" 
import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { setCourses } from "@/store/coursesSlice"
import PdfToNotesForm from "@/components/forms/PdfToNotesForm"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import  { useRouter } from "next/navigation"

interface SidebarProps {
  initialCourses: Course[];
}

export default function AppSidebar({ initialCourses }: SidebarProps) {
  const dispatch: AppDispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.courses.courses);
  const [isVideoNotesOpen, setIsVideoNotesOpen] = useState<boolean>(false);
  const [isPdfNotesOpen, setIsPdfNotesOpen] = useState<boolean>(false);

  const router = useRouter();
  
  useEffect(() => {
    if (initialCourses && initialCourses.length > 0 && courses.length === 0) {
      const serializedCourses = initialCourses.map(course => ({
        ...course,
        createdAt: course.createdAt.toISOString(),
        updatedAt: course.updatedAt.toISOString(),
      }));
      
      dispatch(setCourses(serializedCourses));
    }
  }, [initialCourses, courses.length, dispatch]);

  const handleSignOut = async () => {
    try {
      const data = await signOut({redirect: false, callbackUrl: "/signin"})
      router.push(data.url)
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <>
      <Sidebar className="w-[240px] lg:w-[280px] border-r-0 bg-[#0A0A0A] pb-2"> 
        <SidebarHeader className="border-b border-zinc-800/50 p-4 bg-[#0A0A0A]">
          <h2 className="text-2xl font-medium text-white mt-2">NotesAI</h2>
          <div className="space-y-3 mt-8">
            <Link 
              href="/dashboard"
              className="flex items-center text-base text-zinc-200 hover:bg-zinc-800/50 hover:text-white rounded-md p-2 cursor-pointer transition-colors"
            >
              <LayoutDashboard className="mr-3 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            
            <div
              className="flex items-center text-base text-zinc-200 hover:bg-zinc-800/50 hover:text-white rounded-md p-2 cursor-pointer transition-colors"
              onClick={() => setIsVideoNotesOpen(true)}
            >
              <Play className="mr-3 h-4 w-4" />
              <span>Generate Notes from Video</span>
            </div>
            <div
              className="flex items-center text-base text-zinc-200 hover:bg-zinc-800/50 hover:text-white rounded-md p-2 cursor-pointer transition-colors"
              onClick={() => setIsPdfNotesOpen(true)}
            >
              <Upload className="mr-3 h-4 w-4" />
              <span>Generate Notes from PDF</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="p-0 bg-[#0A0A0A]">
          <div className="overflow-auto h-full">
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-3 text-xs font-medium text-zinc-400">
                ACTIONS
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <CreateCourse />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-3 text-xs font-medium text-zinc-400">
                COURSES
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {courses && courses.length > 0 ? (
                    courses.map((course) => (
                      <SidebarMenuItem key={course.id}>
                        <SidebarMenuButton
                          asChild
                          className="w-full justify-start px-4 py-2 hover:bg-zinc-800/50 hover:text-white text-zinc-200 transition-colors"
                        >
                          <Link href={`/notes/${course.name}`}>
                            <BookOpen className="mr-3 h-4 w-4" />
                            {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  ) : (
                    <div className="text-zinc-400 px-4 py-2">No courses available</div>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        </SidebarContent>

        <SidebarFooter className="border-t border-zinc-800/50 bg-[#0A0A0A]">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full justify-between px-4 py-2 text-white hover:bg-zinc-800/50 hover:text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-sm"></span>
                      </div>
                      <span className="text-lg font-medium">Profile</span>
                    </div>
                    <ChevronUp className="ml-auto h-4 w-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <button onClick={() => handleSignOut()} className="w-full py-2 px-4 text-white bg-red-500 hover:bg-red-600 transition-colors duration-300">Sign out</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <VideoToNotesForm
        isOpen={isVideoNotesOpen} 
        onClose={() => setIsVideoNotesOpen(false)} 
        courses={courses}
      />
      <PdfToNotesForm
        isOpen={isPdfNotesOpen}
        onClose={() => setIsPdfNotesOpen(false)}
        courses={courses}
      />
    </>
  )
}
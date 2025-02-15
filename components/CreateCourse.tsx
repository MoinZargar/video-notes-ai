"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import CreateCourseForm from "@/components/forms/CreateCourseForm"
import { useState } from "react"
import { Course } from "@prisma/client"



export default function CreateCourse() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <Dialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <SidebarMenuButton
            asChild
            onClick={() => setIsDialogOpen(true)}
            className="w-full justify-start px-4 py-2 text-zinc-200 hover:bg-zinc-800/50 hover:text-white transition-colors"
          >
            <Button variant="ghost" className="w-full justify-start p-0 text-base">
              <Plus className="mr-3 h-4 w-4" />
              Add Course
            </Button>
          </SidebarMenuButton>
        </DialogTrigger>

        <DialogContent className="max-w-[90%] lg:max-w-[600px] md:max-w-[350px]">
          <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <CreateCourseForm />
        </DialogContent>
      </Dialog>
    )
}

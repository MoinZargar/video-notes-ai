"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import AddCourseForm from "@/lib/forms/AddCourseForm"
import { useState } from "react"
import { Course } from "@prisma/client"

interface AddCourseProps {
    onCourseAdded: (newCourse: Course) => void;
}
export default function AddCourse({ onCourseAdded }: AddCourseProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)


    const handleFormSuccess = (newCourse: Course) => {
        setIsDialogOpen(false)
        onCourseAdded(newCourse)
    }


    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <SidebarMenuButton
            asChild
            onClick={() => setIsDialogOpen(true)}
            className="w-full justify-start px-4 py-2 text-zinc-200 hover:bg-zinc-800/50 hover:text-white transition-colors"
          >
            <Button variant="ghost" className="w-full justify-start p-0 text-base">
              <Plus className="mr-3 h-4 w-4" />
              Add new
            </Button>
          </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>Add New Course</DialogTitle>
            </VisuallyHidden>
          </DialogHeader>
          <AddCourseForm onSuccess={handleFormSuccess} />
        </DialogContent>
      </Dialog>
    )
}

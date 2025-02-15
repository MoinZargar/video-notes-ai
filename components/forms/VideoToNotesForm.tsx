"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { videoNotesSchema } from "@/lib/schemas/videoNotesSchema"
import type { VideoNotesFormData } from "@/types/forms"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Course } from "@prisma/client"
import { createCourse } from "@/app/actions/createCourseAction"
import axios from "axios"
import { LoaderPinwheelIcon } from "lucide-react"
import LoadingButton from "@/components/LoadingButton"
import { SerializedCourse } from "@/types/course"

interface VideoToNotesFormProps {
  isOpen: boolean;
  onClose: () => void;
  courses: SerializedCourse[];
}

export default function VideoToNotesForm({ isOpen, onClose, courses }: VideoToNotesFormProps) {
  const [globalError, setGlobalError] = useState<any>(null)

  const form = useForm<VideoNotesFormData>({
    resolver: zodResolver(videoNotesSchema),
    defaultValues: {
      videoUrl: "",
      course: "",
    },
  })

  const onSubmit = async (values: VideoNotesFormData) => {
    try {
      setGlobalError("")

      // Create course if it doesn't exist
      if (courses.length === 0) {
        const response = await createCourse({
          name: values.course,
          description: "",
        })
      }

      // Transcribe video
      const transcriptResponse = await axios.post("/api/transcribe", {
        videoUrl: values.videoUrl,
      })

      // Create notes from transcript
      const response = transcriptResponse.data
      if (response.success) {
        const notesResponse = await axios.post("/api/notes", {
          transcript: response.transcript,
          videoUrl: values.videoUrl,
          course: values.course,
        })

        // Redirect to notes page
        if (notesResponse?.status === 200) { 
          onClose()
          window.location.href = `/notes/${values.course}`
        } else {
          setGlobalError("Failed to create notes. Please try again.")
        }
      }
    } catch (error: any) {
      setGlobalError(error?.response?.data?.error || "Something went wrong. Please try again.")
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Generate Notes from Video Lecture</DialogTitle>
        </DialogHeader>

        {form.formState.isSubmitting && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <LoaderPinwheelIcon className="h-6 w-6 animate-spin text-blue-500" />
            <p className="text-base font-medium text-blue-600">Please wait, processing your video. This may take up to 1 minute...</p>
          </div>
        )}

        {globalError && <div className="text-red-500 text-sm text-center mb-6">{globalError}</div>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>YouTube Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter YouTube video URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>{courses.length === 0 ? "Enter Course Name" : "Select Course"}</FormLabel>
                  {courses.length === 0 ? (
                    <FormControl>
                      <Input placeholder="Enter course name" {...field} />
                    </FormControl>
                  ) : (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[200px] overflow-y-auto">
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.name}>
                            {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <LoadingButton pending={form.formState.isSubmitting}>Generate Notes</LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

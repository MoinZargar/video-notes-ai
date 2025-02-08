"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { videoNotesSchema } from "@/lib/schemas/videoNotesSchema"
import type { VideoNotesFormData } from "@/types/forms"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Course } from "@prisma/client"
import { fetchCourses } from "@/app/actions/fetchCourseAction"
import { createCourse } from "@/app/actions/createCourseAction"
import axios from "axios"
import { LoaderPinwheelIcon } from "lucide-react"
import LoadingButton from "@/components/LoadingButton"
import { useRouter } from "next/navigation"
import { transcript } from "@/lib/constants"

export default function VideoToNotesForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [globalError, setGlobalError] = useState<string>("")
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses()
        setCourses(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }

    }
    loadCourses()
  }, [])

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
      //create course if it doesn't exist
     if(courses.length === 0){
       const response = await createCourse({
        name: values.course,
        description: ""
       })
       if(response.error){
        setGlobalError(response.error)
       }
      
     }
     //transcribe video

    //  const transcriptResponse = await axios.post("/api/transcribe", {
    //   videoUrl: values.videoUrl
    //  })
    const transcriptResponse = {
      data: {
        transcript: {
          transcription: transcript
        }
      }
    }
     //create notes from transcript
     if(transcriptResponse){
      console.log("Transcript Response ",transcriptResponse.data.transcript.transcription)
      const notesResponse = await axios.post("/api/notes", {
        transcript: transcriptResponse?.data?.transcript?.transcription,
        videoUrl: values.videoUrl,
        course: values.course
      })
      //redirect to notes page

      if(notesResponse){
        onClose()
        router.push(`/notes/${values.course}`)
      }
     }

    } catch (error: any) {
      setGlobalError("Something went wrong. Please try again.")
    }


  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Generate Notes from Video Lecture</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center my-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
              />
            </svg>
          </div>
        </div>

        {form.formState.isSubmitting && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <LoaderPinwheelIcon className="h-6 w-6 animate-spin text-blue-500" />
            <p className="text-base font-medium text-blue-600">Please wait, processing your video. This may take a few minutes...</p>
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
                    <Input placeholder="Enter youtube video URL" {...field} />
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
                  <FormLabel>{loading ? "Course" : courses.length === 0 ? "Enter Course Name" : "Select Course"}</FormLabel>
                  {loading ? (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Loading courses..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="loading">Loading...</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : courses.length === 0 ? (
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
                            {course.name}
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

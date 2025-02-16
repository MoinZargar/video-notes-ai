"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { createCourse } from "@/app/actions/createCourseAction"
import { LoaderPinwheelIcon } from "lucide-react"
import LoadingButton from "@/components/LoadingButton"
import { SerializedCourse } from "@/types/course"
import { pdfNotesSchema } from "@/lib/schemas/pdfNotesSchema"
import { PdfNotesFormData } from "@/types/forms"
import fs from 'fs'
import path from 'path'
import axios from "axios"

interface PdfNotesFormProps {
  isOpen: boolean;
  onClose: () => void;
  courses: SerializedCourse[];
}

export default function PdfToNotesForm({ isOpen, onClose, courses }: PdfNotesFormProps) {
  const [globalError, setGlobalError] = useState<any>(null)

  const form = useForm<PdfNotesFormData>({
    resolver: zodResolver(pdfNotesSchema),
    defaultValues: {
      pdfFile: undefined,
      course: "",
    },
  })

  const onSubmit = async (values: PdfNotesFormData) => {
    try {
      setGlobalError("")
      console.log("values ", values)
      // Create course if it doesn't exist
      if (courses.length === 0) {
        await createCourse({
          name: values.course,
          description: "",
        })
      }
      // Create FormData and append files
      const formData = new FormData()
      formData.append('pdfFile', values.pdfFile)
      formData.append('course', values.course)

      const response = await axios.post("/api/notes/pdf", formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      })
      // onClose()
      // window.location.href = `/notes/${values.course}`
    } catch (error: any) {
      setGlobalError(error?.response?.data?.error || "Something went wrong. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] lg:max-w-[600px] md:max-w-[350px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Generate Notes from PDF</DialogTitle>
        </DialogHeader>

        {form.formState.isSubmitting && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <LoaderPinwheelIcon className="h-6 w-6 animate-spin text-blue-500" />
            <p className="text-base font-medium text-blue-600">Please wait, saving your PDF...</p>
          </div>
        )}

        {globalError && <div className="text-red-500 text-sm text-center mb-6">{globalError}</div>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="pdfFile"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="mb-6">
                  <FormLabel>Upload PDF</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept=".pdf"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          onChange(e.target.files[0])
                        }
                      }}
                      className="cursor-pointer"
                      {...field}
                    />
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
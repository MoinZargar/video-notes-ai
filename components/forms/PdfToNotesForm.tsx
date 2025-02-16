"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { createCourse } from "@/app/actions/createCourseAction"
import { LoaderPinwheelIcon, Upload } from "lucide-react"
import LoadingButton from "@/components/LoadingButton"
import { SerializedCourse } from "@/types/course"
import { pdfNotesSchema } from "@/lib/schemas/pdfNotesSchema"
import { PdfNotesFormData } from "@/types/forms"
import axios from "axios"

interface PdfNotesFormProps {
  isOpen: boolean;
  onClose: () => void;
  courses: SerializedCourse[];
}

export default function PdfToNotesForm({ isOpen, onClose, courses }: PdfNotesFormProps) {
  const [globalError, setGlobalError] = useState<any>(null)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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
      if (courses.length === 0) {
        await createCourse({
          name: values.course,
          description: "",
        })
      }
      const formData = new FormData()
      formData.append('pdfFile', values.pdfFile)
      formData.append('course', values.course)

      const response = await axios.post("/api/notes/pdf", formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      })
      onClose()
      window.location.href = `/notes/${values.course}`
    } catch (error: any) {
      setGlobalError(error?.response?.data?.error || "Something went wrong. Please try again.")
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/pdf") {
        setSelectedFile(file)
        form.setValue("pdfFile", file)
      }
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
            <p className="text-base font-medium text-blue-600">Please wait, processing your PDF. This may take up to 1 minute...</p>
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
                  <FormLabel className="text-base font-medium">Upload PDF</FormLabel>
                  <FormControl>
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors
                        ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                        ${selectedFile ? 'bg-gray-50' : ''}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('pdf-upload')?.click()}
                    >
                      <Input
                        id="pdf-upload"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setSelectedFile(e.target.files[0])
                            onChange(e.target.files[0])
                          }
                        }}
                        {...field}
                      />
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <Upload className="h-10 w-10 text-gray-400" />
                        {selectedFile ? (
                          <>
                            <p className="text-sm text-gray-600">Selected file: {selectedFile.name}</p>
                            <p className="text-xs text-gray-500">Click or drag to replace</p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-600">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF files only</p>
                          </>
                        )}
                      </div>
                    </div>
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
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
import { upload } from '@vercel/blob/client';

interface PdfNotesFormProps {
  isOpen: boolean;
  onClose: () => void;
  courses: SerializedCourse[];
}

export default function PdfToNotesForm({ isOpen, onClose, courses }: PdfNotesFormProps) {
  const [globalError, setGlobalError] = useState<any>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<PdfNotesFormData>({
    resolver: zodResolver(pdfNotesSchema),
    defaultValues: {
      pdfFile: undefined,
      course: "",
    },
    mode: "onChange", // Enable validation on change
  })

  const onSubmit = async (values: PdfNotesFormData) => {
    try {
      const file = values.pdfFile;
      setGlobalError("");

      // Create course if it doesn't exist
      if (courses.length === 0) {
        await createCourse({
          name: values.course,
          description: "",
        });
      }
      const clientPayload = JSON.stringify({
        course: values.course,
      });

      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload/pdf',
      });
      
      const notesResponse = await axios.post('/api/notes/pdf', {
        blobUrl: newBlob.url,
        course: values.course,
      })
      onClose();
      window.location.href = `/notes/${values.course}`;
    } catch (error: any) {
      console.log("error  ", error?.response?.data?.error)
      setGlobalError("Something went wrong. Please try again.");
    }
  };

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
                    <div className={`border rounded-lg p-6 ${form.formState.errors.pdfFile ? 'border-red-500' : 'border-gray-300'}`}>
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <div className="text-center">
                          {selectedFile ? (
                            <p className="text-sm text-gray-600 mb-2">{selectedFile.name}</p>
                          ) : (
                            <p className="text-sm text-gray-600 mb-2">No file selected</p>
                          )}
                          <Input
                            id="pdf-upload"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setSelectedFile(file);
      
                                onChange(file);
                                form.trigger("pdfFile");
                              }
                            }}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => document.getElementById('pdf-upload')?.click()}
                            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            Choose PDF
                          </button>
                          <p className="text-xs text-gray-500 mt-4">PDF files only, max 15MB</p>
                          <p className="text-xs text-gray-500 mt-2">Both typed and handwritten PDFs are supported.</p>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 mt-2" />
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
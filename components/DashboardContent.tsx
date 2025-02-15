"use client"
import { Book, Youtube, FileDown, MessageSquareQuoteIcon, PlusCircle } from "lucide-react"
import CourseCard from "@/components/CourseCard"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CourseWithNotesCount, SerializedCourse } from "@/types/course"
import { useEffect, useState } from "react"
import VideoToNotesForm from "@/components/forms/VideoToNotesForm"

interface DashboardContentProps {
    courses: CourseWithNotesCount[] | undefined
}

export default function DashboardContent({ courses }: DashboardContentProps) {
    const [isVideoNotesOpen, setIsVideoNotesOpen] = useState(false);
    const [serializedCourses, setSerializedCourses] = useState<SerializedCourse[]>([]);

    useEffect(() => {
        if (courses) {
            const serialized = courses.map(({ _count, ...course }) => ({
                ...course,
                createdAt: course.createdAt.toISOString(),
                updatedAt: course.updatedAt.toISOString(),
            }));
            setSerializedCourses(serialized);
        }
    }, []);

    return (
        <div>
            {courses && courses.length > 0 ? (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-2xl font-semibold">Your Courses</h2>
                        <Button
                            onClick={() => setIsVideoNotesOpen(true)}
                            size="icon"
                            className="rounded-full h-10 w-10 bg-black hover:bg-gray-700"
                        >
                            <PlusCircle className="h-5 w-5" />
                            <span className="sr-only">Add new course</span>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-8 space-y-8">
                    <Card className="p-6 sm:p-8">
                        {/* Rest of the empty state code remains the same */}
                        <div className="flex flex-col items-center sm:items-stretch space-y-6 sm:space-y-8">
                            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                                <h2 className="text-xl lg:text-2xl font-semibold text-center sm:text-left">
                                    Get Started with AI Powered Learning
                                </h2>
                                <Button
                                    className="bg-purple-600 hover:bg-purple-700 transition-colors w-full sm:w-auto"
                                    size="lg"
                                    onClick={() => setIsVideoNotesOpen(true)}
                                >
                                    <PlusCircle className="h-5 w-5 mr-2" />
                                    Get Started
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                                <div className="flex flex-col items-center text-center p-4 space-y-3 bg-purple-50/50 rounded-lg">
                                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Youtube className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-medium">1. Add YouTube Lecture</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Paste any educational YouTube video URL to get started
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 space-y-3 bg-purple-50/50 rounded-lg">
                                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Book className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-medium">2. Generate Smart Notes</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Our AI creates comprehensive study notes from the video
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 space-y-3 bg-purple-50/50 rounded-lg">
                                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                        <FileDown className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-medium">3. Download Notes</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Export your notes in PDF format for offline study
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 space-y-3 bg-purple-50/50 rounded-lg">
                                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                        <MessageSquareQuoteIcon className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-medium">4. Ask Questions</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Clear your doubts with our AI assistant
                                    </p>
                                </div>
                            </div>

                        </div>
                    </Card>
                </div>
            )}
            <VideoToNotesForm
                isOpen={isVideoNotesOpen}
                onClose={() => setIsVideoNotesOpen(false)}
                courses={serializedCourses}
            />
        </div>
    )
}
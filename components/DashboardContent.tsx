"use client"
import { Book, Youtube, FileDown, MessageSquareQuoteIcon, PlusCircle, MessageSquareQuote, FileText } from "lucide-react"
import CourseCard from "@/components/CourseCard"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CourseWithNotesCount, SerializedCourse } from "@/types/course"
import { useEffect, useState } from "react"
import VideoToNotesForm from "@/components/forms/VideoToNotesForm"
import PdfToNotesForm from "./forms/PdfToNotesForm"

interface DashboardContentProps {
    courses: CourseWithNotesCount[] | undefined
}

export default function DashboardContent({ courses }: DashboardContentProps) {
    const [isVideoNotesOpen, setIsVideoNotesOpen] = useState(false);
    const [serializedCourses, setSerializedCourses] = useState<SerializedCourse[]>([]);
    const [isPdfNotesOpen, setIsPdfNotesOpen] = useState(false);
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
                <div className="space-y-6 mr-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-2xl font-semibold">Your Courses</h2>
                        <div className="sm:hidden w-full">
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <ConvertToNotesButtons onVideoNotesOpen={() => setIsVideoNotesOpen(true)} onPdfNotesOpen={() => setIsPdfNotesOpen(true)} />
                            </div>
                        </div>
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
                        <div className="flex flex-col items-center sm:items-stretch space-y-6 sm:space-y-8">
                            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                                <h2 className="text-xl lg:text-2xl font-semibold text-center sm:text-left">
                                    Get Started with AI Powered Learning
                                </h2>
                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                    <ConvertToNotesButtons onVideoNotesOpen={() => setIsVideoNotesOpen(true)} onPdfNotesOpen={() => setIsPdfNotesOpen(true)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                                <FeatureCard
                                    icon={<Youtube className="h-6 w-6 text-purple-600" />}
                                    title="1. Add Learning Material"
                                    description="Upload a PDF document or paste any educational YouTube video URL"
                                />
                                <FeatureCard
                                    icon={<Book className="h-6 w-6 text-purple-600" />}
                                    title="2. Generate Smart Notes"
                                    description="Our AI creates comprehensive study notes from your content"
                                />
                                <FeatureCard
                                    icon={<FileDown className="h-6 w-6 text-purple-600" />}
                                    title="3. Download Notes"
                                    description="Export your notes in PDF format for offline study"
                                />
                                <FeatureCard
                                    icon={<MessageSquareQuote className="h-6 w-6 text-purple-600" />}
                                    title="4. Ask Questions"
                                    description="Clear your doubts with our AI assistant"
                                />
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
            <PdfToNotesForm
                isOpen={isPdfNotesOpen}
                onClose={() => setIsPdfNotesOpen(false)}
                courses={serializedCourses}
            />
        </div>

    )
}

function ConvertToNotesButtons({ onVideoNotesOpen, onPdfNotesOpen }: { onVideoNotesOpen: () => void, onPdfNotesOpen: () => void }) {
    return (
        <>
            <Button
                className="bg-purple-600 hover:bg-purple-700 transition-colors w-full sm:w-auto"
                size="lg"
                onClick={onVideoNotesOpen}
            >
                <Youtube className="h-5 w-5 mr-2" />
                Convert Video to Notes
            </Button>
            <Button
                className="bg-blue-600 hover:bg-blue-700 transition-colors w-full sm:w-auto"
                size="lg"
                onClick={onPdfNotesOpen}
            >
                <FileText className="h-5 w-5 mr-2" />
                Convert PDF to Notes
            </Button>
        </>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex flex-col items-center text-center p-4 space-y-3 bg-purple-50/50 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">{icon}</div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    )
}
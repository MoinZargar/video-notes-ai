import { Card, CardContent } from "@/components/ui/card"
import type { CourseWithNotesCount } from "../types/course"

interface CourseCardProps {
  course: CourseWithNotesCount
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">{course.name.charAt(0).toUpperCase() + course.name.slice(1)}</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-base text-gray-900">
            <span>Notes</span>
            <span className="font-medium">{course?._count?.notes}</span>
          </div>
          <div className="flex justify-between items-center text-base text-gray-900">
            <span>Created At</span>
            <span className="font-medium">
              {new Intl.DateTimeFormat("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(new Date(course.createdAt))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

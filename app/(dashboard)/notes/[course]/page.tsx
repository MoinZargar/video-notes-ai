import NotesViewer from "@/components/NotesViewer"
import fetchNotesAction from "@/app/actions/fetchNotesAction"

export default async function NotesPage({ params }: { params: { course: string } }) {
  const { course } = await params
  const notes = await fetchNotesAction(course)

  return (
    <div className="container py-8 lg:px-6 lg:mx-8">
      <div className="mb-8 lg:px-8 lg:mx-8">
        <h1 className="text-3xl font-bold">{course.charAt(0).toUpperCase() + course.slice(1)} Notes</h1>
        <p className="text-muted-foreground mt-2">Your lecture notes and materials</p>
      </div>
      <NotesViewer notes={notes} />
    </div>
  )
}

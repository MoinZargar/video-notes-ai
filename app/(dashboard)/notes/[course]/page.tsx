import NotesViewer from "@/components/NotesViewer"
import fetchNotesAction from "@/app/actions/fetchNotesAction"


export default async function NotesPage({ params }: {params: Promise<{course: string}>}) {
  try {
    const { course } =await params
    const courseNameDecoded =decodeURIComponent(course);
    const notes = await fetchNotesAction(course)

    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <div className="lg:mb-10 md:mb-8 mb-4">
            <h1 className="lg:text-3xl text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {courseNameDecoded.charAt(0).toUpperCase() + courseNameDecoded.slice(1)} Notes
            </h1>
            <p className="mt-2 text-md text-zinc-600 dark:text-zinc-400">
              Your lecture notes and materials
            </p>
          </div>
          <NotesViewer notes={notes} course={course} />
        </div>
      </div>
    )
  } catch (error: unknown) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8 text-center">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Error: {(error as Error).message || "We are facing a problem currently. We will be back soon."}
        </h2>
      </div>
    )
  }
}
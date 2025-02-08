import NotesViewer from "@/components/NotesViewer";
import fetchNotesAction from "@/app/actions/fetchNotesAction";
import { Notes } from "@prisma/client";


export default async function NotesPage({
  params
}: {
  params: { course: string }
}) {
  const { course } = await params;
  const notes = await fetchNotesAction(course);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{course} Notes</h1>
      <NotesViewer notes={notes} />
    </div>
  )

}

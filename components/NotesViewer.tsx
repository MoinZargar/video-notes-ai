"use client"
import { Notes } from "@prisma/client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Download, Loader2, MessageSquare, PlayCircle } from "lucide-react"
import { getYouTubeVideoId } from "@/lib/videoId"
import ChatWindow from "@/components/ChatWindow"
import { generatePdf } from "@/lib/generatePdf"

interface NotesViewerProps {
  notes: Notes[]
  course: string
}

export default function NotesViewer({ notes, course }: NotesViewerProps) {
  const [openChat, setOpenChat] = useState<boolean>(false)
  const reversedNotes = [...notes].reverse()
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async (content: string, docName: string) => {
    try {
      setIsDownloading(true)
      await generatePdf({ content, docName })
    } catch (error) {
      setError("Error generating PDF")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {reversedNotes.map((note: Notes, index: number) => (
        <Card
          key={note.id}
          className="bg-white dark:bg-zinc-900 border-0 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
              <div className="flex items-center gap-3">
                <div className="bg-black dark:bg-zinc-800 p-2 rounded-lg">
                  <PlayCircle className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-xl font-semibold">
                    Lecture {notes.length - index}
                  </CardTitle>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3">
                {error && <p className="text-red-500">{error}</p>}
                <Button
                  variant="outline"
                  size="sm"
                  className="border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors bg-black dark:bg-black text-white"
                  onClick={() => { handleDownload(note.content, `${course}-Lecture ${notes.length - index}`) }}
                  disabled={isDownloading}
                >
                  {isDownloading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                  Download Notes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors bg-black dark:bg-black text-white"
                  onClick={() => setOpenChat(true)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask AI Assistant
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 py-2">
            <div className="relative pt-[90%] lg:pt-[45%] w-full lg:px-8 rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(note.videoUrl)}`}
                title={`Lecture ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full lg:w-[80%] lg:h-[80%] border-0"
              />
            </div>
            <div className="lg:mt-4 pt-0 border-t border-zinc-100 dark:border-zinc-800">
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="text-black leading-relaxed text-justify"
                >
                  {note.content}
                </ReactMarkdown>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="default"
        size="icon"
        className="fixed bottom-8 right-8 rounded-full w-14 h-14 bg-black hover:bg-zinc-800 text-white shadow-lg"
        onClick={() => setOpenChat(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      <ChatWindow
        isOpen={openChat}
        onClose={() => setOpenChat(false)}
      />
    </div>
  )
}
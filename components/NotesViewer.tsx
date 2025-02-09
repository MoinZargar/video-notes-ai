"use client"
import type { Notes } from "@prisma/client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { Download, MessageSquare, PlayCircle } from "lucide-react"
import { getYouTubeVideoId } from "@/lib/videoId"
import ChatWindow from './ChatWindow'

export default function NotesViewer({ notes }: { notes: Notes[] }) {
  const [openChat, setOpenChat] = useState<number | null>(null)
  const reversedNotes = [...notes].reverse()

  return (
    <div className="grid gap-8 lg:px-8 lg:mx-8 relative">
      {reversedNotes.map((note: Notes, index: number) => (
        <Card key={note.id} className="overflow-hidden bg-card shadow-lg transition-shadow hover:shadow-xl">
          <CardHeader className="border-b bg-muted/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl font-bold">Lecture {notes.length - index}</CardTitle>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-black hover:text-white bg-black text-white"
                >
                  <Download className="h-4 w-4" />
                  <span>Notes PDF</span>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 hover:bg-black hover:text-white bg-black text-white"
                      onClick={() => setOpenChat(note.id)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Ask AI Assistant</span>
                    </Button>
                  </DialogTrigger>
                  <ChatWindow 
                    isOpen={openChat === note.id}
                    onClose={() => setOpenChat(null)}
                  />
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video w-full max-w-[90%] mx-auto mt-6">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(note.videoUrl)}`}
                title={`Lecture ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              ></iframe>
            </div>
            <div className="p-6 mt-8 border-t bg-card/50">
              <div className="prose prose-stone dark:prose-invert max-w-none text-justify">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Floating Chat Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-8 right-8 rounded-full w-12 h-12 bg-black text-white hover:bg-black/90 shadow-lg"
            onClick={() => setOpenChat(notes[0]?.id || null)}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <ChatWindow 
          isOpen={openChat === notes[0]?.id}
          onClose={() => setOpenChat(null)}
        />
      </Dialog>
    </div>
  )
}
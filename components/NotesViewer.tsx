import { Notes } from '@prisma/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function NotesViewer({ notes }: { notes: Notes[]}) {
  return (
    <div className="max-w-5xl mx-32 py-8">
      {notes.map((note: Notes) => (
        <div 
          key={note.id} 
          className="prose max-w-none p-8 mb-8 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-border"
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            className="text-foreground leading-relaxed text-justify"
          >
            {note.content}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  )
}

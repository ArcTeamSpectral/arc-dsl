
"use client"

import { useEffect, useState } from 'react'
import { getAllNotes, NoteEntry } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteEntry[]>([])

  useEffect(() => {
    const fetchNotes = async () => {
      const allNotes = await getAllNotes()
      setNotes(allNotes)
    }
    fetchNotes()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Notes</h1>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {notes.map((note) => (
          <Link key={note.id} href={`/${note.puzzleName}`}>
            <Card className="mb-4 hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>{note.puzzleName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date(note.timestamp).toLocaleString()}
                </p>
                <p>{note.content}</p>
                {note.attachment && (
                  <img src={note.attachment} alt="Attachment" className="mt-2 max-w-full h-auto" />
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </ScrollArea>
    </div>
  )
}

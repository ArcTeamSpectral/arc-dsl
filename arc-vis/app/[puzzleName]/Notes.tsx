'use client';

import React, { useState, useEffect } from 'react';
import { deleteNote, saveNote, searchNotes } from '@/lib/db';
import { Trash2 } from 'lucide-react';

interface NotesProps {
    puzzleName: string;
}

const Notes: React.FC<NotesProps> = ({ puzzleName }) => {
    const [notes, setNotes] = useState<Array<{ id?: number; content: string; timestamp: number }>>([]);
    const [newNote, setNewNote] = useState('');
    const [showAddNote, setShowAddNote] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            const fetchedNotes = await searchNotes({ puzzleName });
            setNotes(fetchedNotes);
        };
        fetchNotes();
    }, [puzzleName]);

    const handleAddNote = async () => {
        if (newNote.trim()) {
            await saveNote({
                puzzleName,
                content: newNote,
                attachment: ''
            });
            setNewNote('');
            setShowAddNote(false);
            const updatedNotes = await searchNotes({ puzzleName });
            setNotes(updatedNotes);
        }
    };

    const handleDeleteNote = async (id: number) => {
        await deleteNote(id);
        const updatedNotes = await searchNotes({ puzzleName });
        setNotes(updatedNotes);
    };

    return (
        <div className="mt-4 mb-8">
            <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold">Notes</h2>
                <button
                    onClick={() => setShowAddNote(!showAddNote)}
                    className="ml-4 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                    {showAddNote ? 'Cancel' : '+ Add note'}
                </button>
            </div>
            {showAddNote && (
                <div className="mb-4">
                    <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a new note..."
                        rows={3}
                    />
                    <button
                        onClick={handleAddNote}
                        className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Add Note
                    </button>
                </div>
            )}
            <div className="space-y-2">
                {notes.map((note) => (
                    <div key={note.id} className="p-3 bg-gray-50 rounded-md flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-700">{note.content}</p>
                            <small className="text-xs text-gray-500">
                                {new Date(note.timestamp).toLocaleString()}
                            </small>
                        </div>
                        <button
                            onClick={() => handleDeleteNote(note.id!)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;

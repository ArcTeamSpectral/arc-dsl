
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface NoteEntry {
    id?: number;
    puzzleName: string;
    attachment: string;
    content: string;
    timestamp: number;
}

interface ArcNotesDB extends DBSchema {
    notes: {
        key: number;
        value: NoteEntry;
        indexes: {
            'by-puzzle': string;
            'by-content': string;
        };
    };
}

let db: IDBPDatabase<ArcNotesDB> | null = null;

async function getDB() {
    if (!db) {
        db = await openDB<ArcNotesDB>('ArcNotesDB', 1, {
            upgrade(db) {
                const store = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
                store.createIndex('by-puzzle', 'puzzleName');
                store.createIndex('by-content', 'content');
            },
        });
    }
    return db;
}

export async function saveNote(note: Omit<NoteEntry, 'id' | 'timestamp'>): Promise<void> {
    const db = await getDB();
    await db.add('notes', {
        ...note,
        timestamp: Date.now(),
    });
}

export async function searchNotes(query: { puzzleName?: string; content?: string }): Promise<NoteEntry[]> {
    const db = await getDB();
    if (query.puzzleName) {
        return db.getAllFromIndex('notes', 'by-puzzle', query.puzzleName);
    } else if (query.content) {
        const allNotes = await db.getAllFromIndex('notes', 'by-content');
        return allNotes.filter(note => note.content.toLowerCase().includes(query.content!.toLowerCase()));
    }
    return db.getAll('notes');
}

export async function deleteNote(id: number): Promise<void> {
    const db = await getDB();
    await db.delete('notes', id);
}


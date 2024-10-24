'use client'
import { useState, useEffect } from 'react';

type Note = {
  id: number;
  content: string;
};

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const note = { id: Date.now(), content: newNote };
    setNotes([...notes, note]);
    setNewNote('');
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="container">
      <h1>Notes App</h1>
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Add a new note"
      />
      <button className="add-note" onClick={addNote}>Add Note</button>

      <div className="note-list">
        {notes.map(note => (
          <div key={note.id} className="note">
            <p>{note.content}</p>
            <button className="delete-note" onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>

      <footer>
        © Notes App by Yemna Mehmood
      </footer>
    </div>
  );
}

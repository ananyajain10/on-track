import React, { useState, useEffect } from 'react';
import Split from 'react-split';
import { nanoid } from 'nanoid';
import Editor from './components/Editor';
import Slidebar from './components/Slidebar';

export default function Main() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);
  const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || '');
  const [noteContents, setNoteContents] = useState({}); // Store note contents by noteId

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);

    // Initialize the note content for the new note
    setNoteContents((prevContents) => ({
      ...prevContents,
      [newNote.id]: '# Type new note',
    }));
  }

  function updateNotes(text) {
    // Update the note content for the current note
    setNoteContents((prevContents) => ({
      ...prevContents,
      [currentNoteId]: text,
    }));

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === currentNoteId ? { ...note } : note
      )
    );
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

    // Delete the note content associated with the deleted noteId
    setNoteContents((prevContents) => {
      const updatedContents = { ...prevContents };
      delete updatedContents[noteId];
      return updatedContents;
    });
  }

  function findCurrentNote() {
    return notes.find((note) => note.id === currentNoteId) || notes[0];
  }

  return (
    <main>
      {notes.length > 0 ? (
         <Split 
         sizes={[30, 70]} 
         direction="horizontal" 
         className="split"
     >
          <Slidebar
            notes={notes}
            currentNote={findCurrentNote()}
            onNoteSelect={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor
              notes={notes}
              currentNote={findCurrentNote()}
              updateNotes={updateNotes}
              noteContent={noteContents[currentNoteId]} // Pass the note content
            />
          )}
        </Split>
      ) :  <div className="no-notes">
      <h1>You have no notes</h1>
      <button 
          className="first-note" 
          onClick={createNewNote}
      >
          Create one now
      </button>
       </div>
      }
    </main>
  );
}

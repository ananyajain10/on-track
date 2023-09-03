import React from "react";

export default function Sidebar(props) {
    console.log('Props in Slidebar:', props);
  const noteElements = props.notes.map((note, index) => {
    console.log('Note in map:', note); 
    // Check if note is defined and has an 'id' property
    if (note && note.id) {
      return (
        <div key={note.id}>
          <div
            className={`title ${
              note.id === props.currentNote.id ? "selected-note" : ""
            }`}
            onClick={() => props.onNoteSelect(note.id)}
          >
            <h4 className="text-snippet">
              {note.body ? note.body.split("\n")[0] : "No content"}
            </h4>
            <button
              className="delete-btn"
              onClick={(event) => props.deleteNote(event, note.id)}
            >
              <i className="gg-trash trash-icon"></i>
            </button>
          </div>
        </div>
      );
    }
    return null; // Skip rendering if note is undefined or lacks an 'id'
  });

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}

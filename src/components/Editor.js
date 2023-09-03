import React, { useState } from 'react';

export default function Editor(props) {
  const [noteText, setNoteText] = useState(props.noteContent || '');

  const handleNoteChange = (event) => {
    const newText = event.target.value;
    setNoteText(newText);
    props.updateNotes(newText);
  };

  return (
    <textarea
      className="pane editor"
      placeholder="Enter your note here..."
      value={noteText}
      onChange={handleNoteChange}
    ></textarea>
  );
}

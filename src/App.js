import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
  //lazy state initialization
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // puts the most recently modified note at the top
    setNotes((oldNotes) => {
      let newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        if (oldNotes[i].id === currentNoteId) {
          newArray.unshift({ ...oldNotes[i], body: text });
        } else {
          newArray.push(oldNotes[i]);
        }
      }
      return newArray;
    });

    // the below works, updated notes stay in place
    // setNotes((oldNotes) =>
    //   oldNotes.map((oldNote) => {
    //     return oldNote.id === currentNoteId
    //       ? { ...oldNote, body: text }
    //       : oldNote;
    //   })
    // );
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    // console.log("deleted", noteId);
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>Notes App</h1>
          <p className="intro">
            Notes are stored in local storage. This app makes use of a couple
            fancy node packages. Namely,{" "}
            <a href="https://github.com/andrerpena/react-mde#readme">
              react-mde
            </a>{" "}
            for the markdown editor and{" "}
            <a href="https://split.js.org/">react-split</a>.
          </p>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}

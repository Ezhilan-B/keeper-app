import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [noteList, setNoteList] = useState([]);

  function addNote(note) {
    setNoteList(prevNote => {
      return [...prevNote, note]
    });
  }

  function modifyNote(modifiedNote, id) {
    setNoteList(prevNote => {
      return prevNote.map((note, index) => {
        if (index === id) {
          note.title = modifiedNote.title;
          note.content = modifiedNote.content;
        }
        console.log(noteList)
        return note;
      })
    });
  }

  function deleteNote(id) {
    setNoteList(prevNote => {
      return prevNote.filter((note, index) => {
        return id !== index;
      })
    });
  }

  return (
    <div>
      <Header />
      <CreateArea clicked={addNote} />
      {noteList.map((noteContent, index) =>
        (<Note key={index} id={index} deleteButtonClicked={deleteNote} updateButton={modifyNote} title={noteContent.title} content={noteContent.content} />)
      )}
      <Footer />
    </div>
  );
}

export default App;
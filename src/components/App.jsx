import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import "../styles.css";

function App() {

  const [noteList, setNoteList] = useState([]);

  function addNote(note) {
    const updatedNoteList = [...noteList, note]
    setNoteList(updatedNoteList);
    let result = fetch(
      'http://localhost:5000/', {
      method: "post",
      body: JSON.stringify({ updatedNoteList }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  function modifyNote(modifiedNote, id) {
    setNoteList(prevNote => {
      return prevNote.map((note) => {
        if (note.id === id) {
          note.title = modifiedNote.title;
          note.content = modifiedNote.content;
        }
        return note;
      })
    });
  }

  function deleteNote(id) {
    console.log(id);
    setNoteList(prevNote => {
      return prevNote.filter((note) => {
        return note.id !== id;
      })
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addButtonClicked={addNote} />
      {noteList.map((noteDetails, index) => { return (<Note key={index} id={noteDetails.id} onDelete={deleteNote} updateButton={modifyNote} title={noteDetails.title} content={noteDetails.content} />) })}
      <Footer />
    </div>
  );
}

export default App;
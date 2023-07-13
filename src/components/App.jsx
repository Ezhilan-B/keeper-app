import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import "../styles.css";
import axios from "axios";

function App() {

  const [noteList, setNoteList] = useState([]);

  axios.get("https://keeper-app-backend-sci5.onrender.com/noteList").then(function (response) {
    // handle success
    const updatedNoteList = response.data;
    setNoteList(updatedNoteList);
  });

  function addNote(note) {
    const updatedNoteList = [...noteList, note]
    setNoteList(updatedNoteList);
    axios.post("https://keeper-app-backend-sci5.onrender.com/", { note });
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
    axios.delete("https://keeper-app-backend-sci5.onrender.com/", { params: { id: id } })
      .then(response => {
        console.log("Deleted post with ID ${" + id + "}");
      })
      .catch(error => {
        console.error(error);
      });

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
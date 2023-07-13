import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import "../styles.css";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="container-fluid">
        <CreateArea addButtonClicked={addNote} />
        <div className="row justify-content-around">

          {noteList.map((noteDetails, index) => { return (<Note key={index} id={noteDetails.id} onDelete={deleteNote} title={noteDetails.title} content={noteDetails.content} />) })}

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
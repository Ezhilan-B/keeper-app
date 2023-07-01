import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';

function Note(props) {

    const [fullNote, setFullNote] = useState({
        title: props.title,
        content: props.content
    });
    const [isModified, setIsModified] = useState(false);

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        setIsModified(true);

        setFullNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            }
        });
    }

    function addButtonClick() {
        props.updateButton(fullNote, props.id);
        setIsModified(false);
    }

    return (
        <div className="note">
            <input onChange={handleChange} name="title" value={fullNote.title} />
            <textarea onChange={handleChange} name="content" >{fullNote.content}</textarea>
            <Zoom in={true}>
                <Fab color="error" onClick={() => props.deleteButtonClicked(props.id)}><DeleteIcon /></Fab>
            </Zoom>
            <Zoom in={isModified}>
                <Fab color="success" onClick={addButtonClick}><AddIcon /></Fab>
            </Zoom>
        </div>
    );
}

export default Note;

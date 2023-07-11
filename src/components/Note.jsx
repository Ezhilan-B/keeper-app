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

    function deleteButton() {
        props.onDelete(props.id);

    }

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

    function editButtonClick() {
        props.updateButton(fullNote, props.id);
        setIsModified(false);
    }


    return (
        <div className="note">
            <input onChange={handleChange} name="title" value={props.title} />
            <textarea onChange={handleChange} name="content" value={props.content} />
            <Zoom in={true}>
                <Fab color="error" onClick={deleteButton}><DeleteIcon /></Fab>
            </Zoom>
            <Zoom in={isModified}>
                <Fab color="success" onClick={editButtonClick}><AddIcon /></Fab>
            </Zoom>
        </div>
    );
}

export default Note;

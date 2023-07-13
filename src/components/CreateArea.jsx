import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { v4 as uuidv4 } from 'uuid';
// import Popup from 'reactjs-popup';

function CreateArea(props) {

    const [inputNote, setInputNote] = useState({
        id: uuidv4(),
        title: "",
        content: ""
    });

    const [isExpanded, setIsExpanded] = useState(false);

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        setInputNote(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleAddClick(event) {
        if (inputNote.title !== "" && inputNote.content !== "") {
            props.addButtonClicked(inputNote);
            setInputNote({
                id: uuidv4(),
                title: "",
                content: ""
            });
        }
        event.preventDefault();
    }

    return (
        <div>
            <form className="create-note">
                <input onChange={handleChange} onClick={() => setIsExpanded(true)} value={inputNote.title} name="title" placeholder="Note title" required={true} />
                {isExpanded && <textarea onChange={handleChange} value={inputNote.content} name="content" placeholder="Take a note..." rows={isExpanded ? 3 : 1} />}
                <Zoom in={isExpanded}>
                    <Fab type="submit" onClick={handleAddClick}><AddIcon /></Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;

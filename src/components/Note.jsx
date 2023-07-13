// import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function Note(props) {

    function deleteButton() {
        props.onDelete(props.id);

    }

    return (
        <div className="note col-sm-5 col-lg-2">
            <h5 name="title">{props.title}</h5>
            <p name="content">{props.content}</p>
            <Zoom in={true}>
                <Fab color="error" onClick={deleteButton}><DeleteIcon /></Fab>
            </Zoom>
        </div>
    );
}

export default Note;

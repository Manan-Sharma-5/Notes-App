import React from "react";
import { useState } from "react";
import { useContext } from "react";
import {CredentialsContext} from "../App";

const InputArea = (props) => {

    const [credentials] = useContext(CredentialsContext);

    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }
    
    function addNote() {
        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
    }

    return (
        <div>
        <h1 className="greet">Welcome {credentials && credentials.username}</h1>
        <div className="content">
            <input type="text" onChange={handleChange} name="title" className="input-title" placeholder="Enter Title Here" value={note.title}/>
            <textarea className="input-content" onChange={handleChange} name="content" rows={5} placeholder="Enter Detail here" value={note.content}></textarea>
            <button  onClick={addNote}>Add</button>
        </div>
        </div>
    );
    }
    export default InputArea;
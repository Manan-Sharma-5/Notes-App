import React, {useState} from "react";

const ExpandedNotes = (props) => {

    function expandingNote() {
        props.onExpand(props.expandingIndex);
    }

    const [note, setNote] = useState({
        title: props.title,
        content: props.content
    });

    function handleChange(event) {
        const {name, value} = event.target;
        // props.onUpdate(props.expandingIndex, name, value);
        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        }
        );

    }

    function updateNote(e) {
        e.preventDefault();
        props.onUpdate(props.expandingIndex, note.title, note.content);
    }



    return(
        <div className="expanded-note">
        <form className="expanded-note-form">
            <div className="expanded-note-title">
                <label><u>Title:</u></label>
                <input type="text" name="title" className="expanded-note-text" value={note.title} onChange={handleChange}/>
            </div>
            <div className="expanded-note-content">
                <label><u>Content:</u></label>
                <textarea type="text" name="content" className="expanded-note-textArea" value={note.content} onChange={handleChange}/>
            </div>
            <div className="expanded-note-buttons">
                <button className="expanded-note-button" onClick={expandingNote}>Close</button>
                <button className="expanded-note-button" onClick={updateNote}>Update</button>
            </div>
        </form>
        </div>
    )
    }

export default ExpandedNotes;
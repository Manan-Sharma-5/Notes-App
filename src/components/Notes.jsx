import React from "react";

function Note(props) {

function expandingNote() {
    props.onExpand(props.expandingIndex);
}

    function handleClick() {
        props.onDelete(props.id);
    };
    
  return (
    <div className="note">
        <button className="delete" onClick={handleClick}>X</button>
    <div className="stored-notes" onClick={expandingNote}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      </div>
    </div>
  );
}

export default Note;

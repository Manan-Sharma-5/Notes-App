import React from "react";
import ParagraphWithCharacterLimit from './ParagraphReducer';

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
      <ParagraphWithCharacterLimit text={props.content} characterLimit={32} />
      </div>
    </div>
  );
}

export default Note;

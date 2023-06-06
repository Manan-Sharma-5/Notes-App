const ExpandedNotes = (props) => {

    function expandingNote() {
        props.onExpand(props.expandingIndex);
    }

    function handleChange(event) {
        const {name, value} = event.target;
        props.onUpdate(props.expandingIndex, name, value);
    }

    return(
        <div className="expanded-note">
        <form className="expanded-note-form">
            <div className="expanded-note-title">
                <label><u>Title:</u></label>
                <input type="text" name="title" className="expanded-note-text" value={props.title} onChange={handleChange}/>
            </div>
            <div className="expanded-note-content">
                <label><u>Content:</u></label>
                <textarea type="text" name="content" className="expanded-note-textArea" value={props.content} onChange={handleChange}/>
            </div>
        </form>
        </div>
    )
    }

export default ExpandedNotes;
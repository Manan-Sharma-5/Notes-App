import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import InputArea from './InputArea';
import ExpandedNotes from './ExpandedNotes';
import { useContext } from 'react';
import {CredentialsContext} from "../App";
import Notes from './Notes';

const Home = (props) => {
    const [notes, setNotes] = useState([]);
    const [expandedID, setExpandedID] = useState(null);
    const [credentials] = useContext(CredentialsContext);
  
    useEffect(() => {
      fetchNotes();// eslint-disable-next-line
    }, []); 
  
    function fetchNotes() {
      axios
        .get('https://api-call-notes.onrender.com/notes', {
          headers: {
            Authorization: `Basic ${credentials.username}:${credentials.password}`, 
          },
        })
        .then((response) => {
          setNotes(response.data);
        })
        .catch((error) => {
          console.error('Error fetching notes:', error);
        });
    }
  
    function addingNote(note) {
      if (note.title === '' || note.content === '') {
        alert('Please enter a title and content for your note.');
        return;
      }
      axios.post('https://api-call-notes.onrender.com/notes', note, {
        headers: {
          Authorization: `Basic ${credentials.username}:${credentials.password}`,
        },
      })
        .then(() => {
          fetchNotes(); 
        })
        .catch((error) => {
          console.error('Error creating note:', error);
        });
    }

    function updateNote (expandedID, title, content) {
      const noteId = notes[expandedID]._id; 
      axios.patch(`https://api-call-notes.onrender.com/notes/${noteId}`, {
        title,
        content,
      }, {
        headers: {
          Authorization: `Basic ${credentials.username}:${credentials.password}`,
        },
      })
        .then(() => {
          fetchNotes(); 
        })
        .then(() => {
          alert('Note updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating note:', error);
        });
      }
  
    function deleteNote(id) {
      const noteId = notes[id]._id; 
      axios.delete(`https://api-call-notes.onrender.com/notes/${noteId}`)
        .then(() => {
          fetchNotes(); 
          setExpandedID(null);
        })
        .catch((error) => {
          console.error('Error deleting note:', error);
        });
    }
  
    function expandNote (id) {
      setExpandedID(id);
    }
  
    if (expandedID === null) {
      return (
        <div className="App">
          <Header 
            setIsAuthenticated={props.setIsAuthenticated}
          />
          <InputArea onAdd={addingNote}/>
          <h1 className="heading">Stored Notes</h1>
          <div className="all-notes">
            {notes.map((noteItem, index) => (
              <Notes
                  key={index}
                  id={noteItem._id}
                  expandingIndex={index}
                  title={noteItem.title}
                  content={noteItem.content}
                  onDelete={() => deleteNote(index)}
                  onExpand={expandNote}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="Expanded-App">
          <Header 
            setIsAuthenticated={props.setIsAuthenticated}
          />
          <ExpandedNotes
            expandingIndex={expandedID}
            title={notes[expandedID].title}
            content={notes[expandedID].content}
            onExpand={() => setExpandedID(null)}
            onUpdate={updateNote}
          />

        </div>
      );
    }
  
}

export default Home;
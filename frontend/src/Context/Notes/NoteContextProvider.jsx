import url from "../../url";
import NoteContext from "./NoteContext";
import { useState } from "react";
import axios from "axios";
const NoteContextProvider = ({ children }) => {
  
  const notesInitail = [];

  const [notes, setNotes] = useState(notesInitail);

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };


const fetchAllNotes = async () => {
  try {
    const response = await axios.get(`${url}/api/notes/fetchallnotes`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    console.log("json:", response.data);
    setNotes(response.data);
  } catch (error) {
    console.error("Error fetching notes:", error);
   
  }
};

const addNote = async (title, description, tag) => {
  try {
    const response = await axios.post(`${url}/api/notes/addnote`, { title, description, tag }, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    setNotes(notes.concat(response.data));
  } catch (error) {
    console.error("Error adding note:", error);
    
  }
};

const deleteNote = async (id) => {
  try {
    await axios.delete(`${url}/api/notes/deletenote/${id}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  } catch (error) {
    console.error("Error deleting note:", error);
   
  }
};

  const updateNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${url}/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        updateNote,
        fetchAllNotes,
        alert,
        setAlert,
        showAlert,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;

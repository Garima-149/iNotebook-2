import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://localhost:3000"
  const [notes, setnotes] = useState([])


  //Fetch All Notes
  //Completed
  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem('token')
      },
    });
    const json = await response.json()
    // console.log(json)
    setnotes(json);
  }

  //Add Note
  //Completed
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    getnotes()

  }

  //Update Note
  const updatenote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json;
    setnotes(notes.concat(json))
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id == id) {
        newNotes[index].title = title;
        newNotes[index].description= description;
        newNotes[index].tag= tag;
        break;
      }
    }
    setnotes(newNotes);
  }

  //Delete Note
  // Completed
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem('token')
      },
    });
    const json = response.json;
    console.log(json)
    console.log("Delete note with ID" + id);
    const Newnotes = notes.filter((note) => { return note._id !== id })
    setnotes(Newnotes)
  }
  return (
    <NoteContext.Provider value={{ notes, setnotes, addnote, updatenote, deletenote, getnotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}


export default NoteState;
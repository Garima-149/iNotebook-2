import React, { useContext, useEffect, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
const NoteItem = (props) => {
  const context = useContext(NoteContext)
  const { deletenote } = context
  const { note, updateNote } = props;
  return (
    <div className='col-md-4'>
      <div className="card my-3" >
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <a className="btn btn-primary" onClick={() => { deletenote(note._id); props.showAlert("Note deleted successfully","success") }}>
            <i className="fa-solid fa-trash-can"></i>
          </a>
          <a className="btn btn-primary mx-3">
            <i className="fa-sharp fa-solid fa-file-pen" onClick={() => { updateNote(note) }}></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
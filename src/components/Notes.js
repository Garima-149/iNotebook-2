import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import {useNavigate} from 'react-router-dom'

const Notes = (props) => {
  let history=useNavigate()
  const context = useContext(NoteContext)
  const { notes, getnotes, updatenote } = context
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    if(sessionStorage.getItem('token'))
    getnotes()
    else{
      history("/login");
    }
  }, [])

  const onChange = (e) => {
    setNote({
      ...note, [e.target.name]: e.target.value
    })
  }
  const handleClick = async (e) => {
    refClose.current.click();
    // console.log("uspdating the note",note)
    updatenote(note.id, note.etitle, note.edescription, note.etag)
    props.showAlert("Updated successfully","success")
    // await updateNote(note.title, note.description, note.tag);
  }


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, id: currentNote._id })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Update Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Update Description</label>
                <textarea className="form-control" id="edescription" name="edescription" rows="3" value={note.edescription} onChange={onChange} minLength={5} required></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Edit Tags</label>
                <textarea className="form-control" id="etag" name="etag" rows="3" value={note.etag} onChange={onChange} ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>


      <div className='row my-3'>
        <h2>Your notes</h2>
        {notes.length === 0 ? <p>No notes to display</p> : ""}
        {notes.map((note) => {
          return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
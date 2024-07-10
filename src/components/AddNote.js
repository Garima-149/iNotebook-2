import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
const AddNote = (props) => {
    const [note, setNote] = useState({ title: "", description: "", tag: "default" })
    const context = useContext(NoteContext)
    const { addnote } = context
    const onChange = (e) => {
        setNote({
            ...note, [e.target.name]: e.target.value
        })
    }
    const handleClick = async (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        props.showAlert("Note added successfully","success")
        setNote({ title: "", description: "", tag: "default" })
    }

    return (
        <>
            <div className='container my-3'>
                <h1>Add notes</h1>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description"  value={note.description} rows="3" onChange={onChange} minLength={5} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tags</label>
                    <textarea className="form-control" id="tag" name="tag" rows="3"  value={note.tag} onChange={onChange} minLength={5} required></textarea>
                </div>
                <div className="my-2">
                    <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary mb-3" onClick={handleClick}>Save Note</button>
                </div>
            </div>
        </>
    )
}

export default AddNote
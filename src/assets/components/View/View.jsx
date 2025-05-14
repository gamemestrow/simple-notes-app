import React, { useContext, useEffect, useState } from "react";
import "./View.css";
import { notesContext } from "../../../App";
import { componentContext } from "../../../App";

const View = ({ keyOfNote, setkeyOfNote }) => {
  const [notes, setnotes] = useContext(notesContext);
  const setpage = useContext(componentContext);

  const notesAtKey = JSON.parse(localStorage.getItem("notes"));
  const [editedNotes, seteditedNotes] = useState({
    title: notesAtKey[keyOfNote].title,
    note: notesAtKey[keyOfNote].note,
  });

  useEffect(() => {
    seteditedNotes({
      title: notesAtKey[keyOfNote].title,
      note: notesAtKey[keyOfNote].note,
    });
  }, [keyOfNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setnotes({
      title: notesAtKey.title,
      note: notesAtKey.note,
    });
    notesAtKey[keyOfNote] = editedNotes;
    localStorage.setItem("notes", JSON.stringify(notesAtKey));
  };

  const deleteNote = (e) => {
    e.preventDefault();
    setnotes({
      title: "",
      notes: "",
    });
    setkeyOfNote(keyOfNote - 1);
    notesAtKey.splice([keyOfNote], 1);
    localStorage.setItem("notes", JSON.stringify(notesAtKey));
    if (notesAtKey.length == 0) {
      setpage("Create");
    }
  };

  const redirectCreate = () => {
    setpage("Create")
  }

  return (
    <div className="view-page">
      <form className="note-form">
        <label>Edit your notes !!!</label>
        <input
          type="text"
          placeholder="Your note name"
          onChange={(e) =>
            seteditedNotes({ ...editedNotes, title: e.target.value })
          }
          value={editedNotes.title}
        />
        <textarea
          name="textarea"
          id="textarea"
          className="textarea"
          placeholder="write it here"
          onChange={(e) =>
            seteditedNotes({ ...editedNotes, note: e.target.value })
          }
          value={editedNotes.note}
        ></textarea>
        <div className="buttons">
          <button type="submit" className="btn" onClick={redirectCreate}>
            Create
          </button>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
          <button type="submit" className="btn" onClick={deleteNote}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default View;

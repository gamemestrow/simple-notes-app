import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Create.css";
import { notesContext } from "../../../App";
import { componentContext } from "../../../App";

const Create = () => {
  const setpage = useContext(componentContext);
  const [notes, setnotes] = useContext(notesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (notes.title == null) {
      setnotes({ title: "" });
    } else if (notes.note == null) {
      setnotes({ note: "" });
    } else {
      const getprevNote = localStorage.getItem("notes") || "[]";
      const prevNotes = JSON.parse(getprevNote);
      const newNote = [...prevNotes, notes];
      localStorage.setItem("notes", JSON.stringify(newNote));
      setnotes({ title: "", note: "" });
    }
  };

  useEffect(() => {
    setpage("Create");
  }, []);

  return (
    <div>
      <form className="note-form">
        <label>Write your notes !!!</label>
        <input
          type="text"
          placeholder="Your note name"
          onChange={(e) => setnotes({ ...notes, title: e.target.value })}
          value={notes.title}
        />
        <textarea
          name="textarea"
          id="textarea"
          className="textarea"
          placeholder="write it here"
          onChange={(e) => setnotes({ ...notes, note: e.target.value })}
          value={notes.note}
        ></textarea>
        <button type="submit" className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;

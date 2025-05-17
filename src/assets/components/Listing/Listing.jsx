import React, { useContext, useEffect, useState } from "react";
import "./Listing.css";
import { componentContext, notesContext } from "../../../App";
import { SlArrowDown } from "react-icons/sl";

const Listing = ({ setkeyOfNote }) => {
  const [prevNotes, setprevNotes] = useState([]);
  const [filteredNotes, setfilteredNotes] = useState([]);
  const [notes, setnotes] = useContext(notesContext);
  const setpage = useContext(componentContext);
  const [filter, setfilter] = useState("");
  const [addCategory, setaddCategory] = useState(false);
  const [categoryname, setcategoryname] = useState("");
  const [category, setcategory] = useState([]);
  const [added, setadded] = useState(false);
  const [selectedCaregory, setselectedCaregory] = useState("");

  useEffect(() => {
    const rawdata = JSON.parse(localStorage.getItem("notes")) || [];
    setprevNotes(rawdata);
    setfilteredNotes(rawdata);
  }, [notes]);

  const handleClick = (itm, e) => {
    setpage("View");
    const index = prevNotes.findIndex(
      obj => obj.title === itm.title
    );
    setkeyOfNote(index);
  };

  const handleFilter = (e) => {
    setfilter(e.target.value);
    const rawdata = JSON.parse(localStorage.getItem("notes")) || [];
    setprevNotes(rawdata.filter((item) => item.title.includes(e.target.value)));
  };

  const handleCategory = (e) => {
    if (e == "done" && categoryname != null) {
      setaddCategory(!addCategory);
      const prevCategory = JSON.parse(localStorage.getItem("categories")) || [];
      const keys = [...prevCategory, { [categoryname]: [] }];
      localStorage.setItem("categories", JSON.stringify(keys));
      setadded(true);
    } else if (e == "done" && categoryname == null) {
      setaddCategory(!addCategory);
    } else {
      setaddCategory(!addCategory);
    }
  };

  const handleAddNoteToCategory = (e, itm) => {
    const localdata = JSON.parse(localStorage.getItem("categories")) || [];
    const found = localdata.find((obj) => e.target.value in obj);
    if (e.target.value === "remove") {
      localdata.forEach((element) => {
        const key = Object.keys(element)[0];
        element[key] = element[key].filter((item) => item != itm.title);
      });
      localStorage.setItem("categories", JSON.stringify(localdata));
    } else {
      found[e.target.value].push(itm.title);
      localStorage.setItem("categories", JSON.stringify(localdata));
    }
  };

  const handlechangeCategory = (e) => {
    const selected = e.target.value;
    setselectedCaregory(selected);

    if (selected === "all") {
      setfilteredNotes(prevNotes);
    } else {
      const localdata = JSON.parse(localStorage.getItem("categories")) || [];
      const found = localdata.find((obj) => selected in obj);

      if (found) {
        const titles = found[selected]; // Array of titles
        const filtered = prevNotes.filter((note) =>
          titles.includes(note.title)
        );
        setfilteredNotes(filtered);
      } else {
        setfilteredNotes([]); // No matching category
      }
    }
  };

  useEffect(() => {
    const getCategory = JSON.parse(localStorage.getItem("categories")) || [];
    setcategory(getCategory);
    setadded(false);
  }, [added]);

  return (
    <div className="Listing">
      <h3>Your past notes</h3>
      <input
        type="text"
        placeholder="Search"
        className="searchBar"
        onChange={handleFilter}
        value={filter}
      />
      <div className="cate">
        {addCategory ? (
          <>
            <input
              className="category"
              value={categoryname}
              onChange={(e) => {
                setcategoryname(e.target.value);
              }}
            />
            <button
              className="add-category"
              onClick={() => handleCategory("done")}
            >
              Done
            </button>
          </>
        ) : (
          <>
            <select
              className="category"
              placeholder="category"
              onChange={(e) => handlechangeCategory(e)}
            >
              <option value="all">all</option>
              {category.map((item, index) => {
                const key = Object.keys(item);
                return (
                  <option key={index} value={`${key}`}>
                    {key}
                  </option>
                );
              })}
            </select>
            <button
              className="add-category"
              onClick={() => handleCategory("add")}
            >
              +
            </button>
          </>
        )}
      </div>

      <div className="container">
        {filteredNotes.map((itm, index) => (
          <span
            className="List-itm"
            key={index}
            onClick={() => {
              handleClick(itm, index);
            }}
          >
            {itm.title}
            <select
              className="show"
              onChange={(e) => handleAddNoteToCategory(e, itm)}
            >
              <option value="remove">remove</option>
              {category.map((item, index) => {
                const key = Object.keys(item);
                return (
                  <option key={index} value={`${key}`}>
                    {key}
                  </option>
                );
              })}
            </select>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Listing;

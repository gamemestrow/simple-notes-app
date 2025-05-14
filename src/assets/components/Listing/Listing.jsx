import React, { useContext, useEffect, useState } from "react";
import "./Listing.css";
import { componentContext, notesContext } from "../../../App";

const Listing = ({ setkeyOfNote }) => {
  const [prevNotes, setprevNotes] = useState([]);
  const [notes, setnotes] = useContext(notesContext);
  const setpage = useContext(componentContext);
  const [filter, setfilter] = useState("");
  const [addCategory, setaddCategory] = useState(false);
  const [categoryname, setcategoryname] = useState("")
  const [category, setcategory] = useState({name:[]})
  const getCategory = JSON.parse(localStorage.getItem("Category")) || [];

  useEffect(() => {
    const rawdata = JSON.parse(localStorage.getItem("notes")) || [];
    setprevNotes(rawdata);
  }, [notes]);

  const handleClick = (e) => {
    setpage("View");
    setkeyOfNote(e);
  };

  const handleFilter = (e) => {
    setfilter(e.target.value);
    const rawdata = JSON.parse(localStorage.getItem("notes")) || [];
    setprevNotes(rawdata.filter((item) => item.title.includes(e.target.value)));
  };

  const handleCategory = (e) => {
    if(e == "done" && categoryname != null){
      setaddCategory(!addCategory);
      
      // const keyss = {"name":"whoo kares", "naam":"no one kares"}
      // const data = `[${keyss}]`
      localStorage.setItem("hay","data")
      console.log(typeof(notes))
      // localStorage.setItem("Category",categoryname)
    }
    else if(e == "done"&& categoryname == null){
      setaddCategory(!addCategory)
    }
    else{
      setaddCategory(!addCategory);
    }
  };

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
            <input className="category" value={categoryname} onChange={(e)=>{setcategoryname(e.target.value)}} />
            <button className="add-category" onClick={() => handleCategory("done")}>
              Done
            </button>
          </>
        ) : (
          <>
            <select className="category" placeholder="category">
              <option value="all">all</option>
              {getCategory.map((item,index)=>{
                <option value={`${item}`}>{item}</option>
              })}
            </select>
            <button className="add-category" onClick={() => handleCategory("add")}>
              +
            </button>
          </>
        )}
      </div>

      <div className="container">
        {prevNotes.map((itm, index) => (
          <span className="List-itm" key={index}>
            {itm.title}
            <button
              onClick={() => {
                handleClick(index);
              }}
            >
              View
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Listing;

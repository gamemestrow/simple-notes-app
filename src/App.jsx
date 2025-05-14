import { createContext, useEffect, useState } from "react";
import "./App.css";
import Create from "./assets/components/Create/Create";
import Listing from "./assets/components/Listing/Listing";
import View from "./assets/components/View/View";

export const notesContext = createContext();
export const componentContext = createContext();

function App() {
  const [notes, setnotes] = useState({ title: "", note: "" });
  const [page, setpage] = useState("");
  const [keyOfNote, setkeyOfNote] = useState()

  let currentPage;
  
    switch (page) {
      case "View":
        currentPage = <View keyOfNote={keyOfNote} setkeyOfNote={setkeyOfNote} />;
        break
      case "Create":
        currentPage = <Create />;
        break
      default:
        currentPage = <Create/>
        break
    }


  return (
    <notesContext.Provider value={[notes, setnotes]}>
      <componentContext.Provider value={setpage}>
        <div className="home">
          {currentPage}
          <Listing setkeyOfNote={setkeyOfNote}/>
        </div>
      </componentContext.Provider>
    </notesContext.Provider>
  );
}

export default App;

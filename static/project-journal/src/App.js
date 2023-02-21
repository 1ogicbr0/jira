import React, { Fragment, useEffect, useState } from "react";
import { view } from "@forge/bridge";
import { Router, Route, Routes, useNavigate } from "react-router";
import CreatePage from "";
import Home from "./components/Home";
let pages =[];

const createpage = (name,id) => {
  const data ={
    key:id,
    id,
    name,
    path:`/${id}`,
    element: <CreatePage pages={pages} name={name} key={id}/>
  }
  id = id +1;
  pages.push(data)
  return(pages)
}




function App() {
  const [history, setHistory] = useState(null);
  const navigate = useNavigate();
  const [ mypages, setPages ] = useState([])
  const location = useLocation();
  // console.log("Location", location);
  const createPageHandler = () => {
    const updated = createpage(`Project${pages.length}`,pages.length)
    setPages(updated)
    navigate(`/${updated.length-1}`)
    console.log(updated)
    console.log(updated.length-1)
  }
  useEffect(() => {
    view.createHistory().then((newHistory) => {
      setHistory(newHistory);
    });
  }, []);

  const [historyState, setHistoryState] = useState(null);

  useEffect(() => {
    if (!historyState && history) {
      setHistoryState({
        action: history.action,
        location: history.location,
      });
    }
  }, [history, historyState]);

  useEffect(() => {
    if (history) {
      history.listen((location, action) => {
        setHistoryState({
          action,
          location,
        });
      });
    }
  }, [history]);

  return (
    <div>
      {history && historyState ? (
    <>
    <div> 
       <button onClick={createPageHandler}>Create Project Journal</button> </div>
    <Routes>
      <Route path="/" element={<Home pages={mypages}/>}/>
      {pages.map( props => <Route path={props.path} element={props.element} />)}
    </Routes>
    </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
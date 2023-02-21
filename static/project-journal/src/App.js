import React, { Fragment, useEffect, useState } from "react";
import { view } from "@forge/bridge";
import { Router, Route, Routes, useNavigate, useLocation } from "react-router";

import Home from "./components/Home";






function App() {
  const [history, setHistory] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState([]);

  const [ mypages, setPages ] = useState([])
  const location = useLocation();
  // console.log("Location", location);

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
  
    <Routes>
      <Route path="/" element={<Home setNumberOfPages={setNumberOfPages}/>}/>
      {numberOfPages?.map( props => <Route path={props.path} element={props.element} />)}
    </Routes>
    </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;


import React, {  useEffect, useState } from "react";
import { view } from "@forge/bridge";
import {  Route, Routes } from "react-router";

import Home from "./pages/Home";

function App() {
  const [history, setHistory] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState([]);

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
          <Routes
            navigator={history}
            navigationType={historyState.action}
            location={historyState.location}
          >
            <Route
              path="/"
              element={<Home setNumberOfPages={setNumberOfPages} />}
            />
            {numberOfPages?.map((props,index) => (
              <Route key={index} path={props.path} element={props.element} />
            ))}
          </Routes>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;

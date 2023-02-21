import React, { Fragment, useEffect, useState } from "react";
import { view } from "@forge/bridge";
import { Router, Route, Routes, useNavigate } from "react-router";

function Link({ to, children }) {
  const navigate = useNavigate();

  return (
    <a
    style={{
      textDecoration: "none",
      color: "black",
      fontSize: "20px",
   
    }}
      href={to}
      onClick={(event) => {
        event.preventDefault();
        navigate(to);
      }}
    >
          <div
     style={{
        display: "flex",
      padding:"10px",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "40px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        marginTop:'10px'

      }}
    >
      {children}
      </div>
    </a>
  );
}

function Home() {
  return (
    <>

      <Link to="/page-with-path:id">Project Journal 1 </Link>
   
         <Link to="/page-with-path">Project Journal 2 </Link>
      
            <Link to="/page-with-path">Project Journal 3 </Link>
      </>
  );
}

function PageWithPath() {
  return <h2>Page with path</h2>;
}

function App() {
  const [history, setHistory] = useState(null);

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
        <Router
          navigator={history}
          navigationType={historyState.action}
          location={historyState.location}
        >
          <Routes>
            <Route path="/:id" element={<PageWithPath />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Router>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
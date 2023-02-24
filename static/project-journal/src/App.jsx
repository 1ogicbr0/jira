import React, {  useEffect, useState } from "react";
import { view } from "@forge/bridge";
import {  Router, Route, Routes, } from "react-router";
import PropTypes from "prop-types";

import { MyProvider } from "./context/useContext";
import Home from "./pages/Home";
import DetailsPage from  "./components/DetailsPage";


// function App() {
//   const [history, setHistory] = useState(null);
  // const [ setNumberOfPages] = useState([]);

//   useEffect(() => {
//     view.createHistory().then((newHistory) => {
//       setHistory(newHistory);
//     });
//   }, []);

//   const [historyState, setHistoryState] = useState(null);

//   useEffect(() => {
//     if (!historyState && history) {
//       setHistoryState({
//         action: history.action,
//         location: history.location,
//       });
//     }
//   }, [history, historyState]);

//   useEffect(() => {
//     if (history) {
//       history.listen((location, action) => {
//         setHistoryState({
//           action,
//           location,
//         });
//       });
//     }
//   }, [history]);

//   return (
//     <div>
//       {history && historyState ? (
//       <Router
//           navigator={history}
//           navigationType={historyState.action}
//           location={historyState.location}
//         >

//           <Routes>
//             <Route
//               path="/"
//               element={<Home setNumberOfPages={setNumberOfPages} />}
//             />
//              <Route path="/project/:id" element={<DetailsPage/>} />
//           </Routes>
//           </Router>
//       ) : (
//         "Loading..."
//       )}
//     </div>
//   );
// }

// export default App;


function App() {
  const [history, setHistory] = useState(null);
  const [ setNumberOfPages] = useState([]);

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
          <MyProvider>
          <Routes>
          <Route
              path="/"
              element={<Home setNumberOfPages={setNumberOfPages} />}
            />
             <Route path="/project/:id" element={<DetailsPage/>} />
          </Routes>
          </MyProvider>
        </Router>
      ) : (
        "Loading..."
      )}
      </div>
  );
}

export default App;

App.propTypes = {
  path: PropTypes.string,
  element: PropTypes.element,
  setPages: PropTypes.func,
  pages: PropTypes.array,
  key: PropTypes.number,
};

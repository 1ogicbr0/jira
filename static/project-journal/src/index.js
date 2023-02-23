import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MyProvider } from "./context/useContext";
import "@atlaskit/css-reset";

ReactDOM.render(
  <BrowserRouter>
    <MyProvider>
      <App />
    </MyProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

import React, { Fragment, useEffect, useState } from "react";
import { invoke, view, router } from "@forge/bridge";
import { Route, Routes, useLocation, Link, useNavigate } from "react-router-dom";
import CreatePage from "./components/CreatePages";
import Home from "./components/Home";

const pages = [];

function App() {
  console.log(view);
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
  return (<>
    <div>  <button onClick={createPageHandler}>Create Project Journal</button> </div>
    <Routes>
      <Route path="/" element={<Home pages={mypages}/>}/>
      {pages.map( props => <Route path={props.path} element={props.element} />)}
    </Routes>
    </>
  );
}

export default App;

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


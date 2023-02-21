import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes, useLocation, Link } from "react-router-dom";

const CreatePage =(props) => {
    const location = useLocation();
    const [mypages, setPages] = useState(props.pages)
    const page = mypages.find( item => item.path === location.pathname)
    return (
      <>
      <div
       style={{
        width:'100%',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        padding:'10px'

       }}
      >
      <Link 
         style={{
          color:'#fff',
          padding:'10px',
          fontSize: "15px",
          fontWeight: "bold",
          backgroundColor: "#0052CC",
          border:'none',
          textDecoration:'none'

  
  
         }}
      to="/">Back</Link>
      </div>
 
        {/* {
          mypages.map(item => 
            <div>  <Link to={item.path}>{item.name}</Link> </div>
          )
        } */}
        <h2>{page.name}</h2>
        {/* <h3>This is dynamic Page</h3> */}
      </>
    );
  }

  export default CreatePage;
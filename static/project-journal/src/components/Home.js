
import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes, useLocation, Link } from "react-router-dom";

function Home(props) {
    const [mypages, setPages] = useState(props.pages)
    return (
      <>
        {
          mypages.map(item => 
            <div><Link to={item.path}>{item.name}</Link></div>
          )
        }
        <h2>HOME</h2>
      </>
    );
  }

  export default Home;

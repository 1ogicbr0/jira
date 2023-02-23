import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const CreatePage =(props) => {
    const location = useLocation();
    const [mypages, setPages] = useState(props.pages)
    const page = mypages.find( item => item.path === location.pathname)
    return (
      <>
      <div
      >
      <Link 
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
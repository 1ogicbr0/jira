import React  from "react";
import {  Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {useContext} from "react";
import { MyContext } from "../context/useContext";
import Edit from "./Edit";
const DetailsPage = () => {
  const { data} = useContext(MyContext);
  const { id } = useParams();

const page = data.find((item) => item.id === id);
  return (
    <>
   
      <div>
        <Link to="/">Back</Link>
      </div>

 
      {page && <><h2>{page.name}</h2> 
      <Edit page={page}/></>}
    </>
  );
};

export default DetailsPage;

DetailsPage.propTypes = {
  setPages: PropTypes.func,
  pages: PropTypes.array,
  name: PropTypes.string,
  path: PropTypes.string,
  element: PropTypes.element,
  key: PropTypes.string,
  match: PropTypes.object,
  
};

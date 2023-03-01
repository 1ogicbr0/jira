import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { MyContext } from "../context/useContext";
import Edit from "./Modals/EditPageModal";
import Delete from "./Modals/DeletePageModal";
const DetailsPage = () => {
  const { id } = useParams();
  const { data } = useContext(MyContext);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const page = data.find((item) => item.id === id);
    setPage(page);
  }, [data]);
  console.log(page);

  return (
    <>
      <div>
        <Link to="/">Back</Link>
      </div>

      {page && (
        <>
          <h2>{page.name}</h2>
          <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gridGap: "10px",
      }}
    >
          <Edit page={page} setIsLoading={setIsLoading}  isLoading={isLoading}/>
          <Delete page={page} setIsLoading={setIsLoading}  isLoading={isLoading}/>
          </div>
        </>
      )}
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

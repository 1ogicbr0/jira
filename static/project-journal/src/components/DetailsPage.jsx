import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { invoke } from "@forge/bridge";
import { useParams } from "react-router-dom";
import { MyContext } from "../context/useContext";
import Edit from "./Edit";
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
          <Edit page={page}
           setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
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

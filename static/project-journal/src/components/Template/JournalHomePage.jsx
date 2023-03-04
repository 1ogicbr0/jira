import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import Edit from "../Modals/EditJournalModal";
import Delete from "../Modals/DeleteJournalModal";

import Loading from "../PageLoader";
import{ MyContext } from '../../context/useContext';
const DetailsPage = () => {
  const { id } = useParams();
  const { journals} = useContext(MyContext);
  const [project, setProject] = useState(null);
  // const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    journals.forEach((journal) => {
      if (journal.id === id) {
        setProject(journal);
      }
    }
    );
  }, []);

  return (
    <>
      <div>
        <Link to="/">Back</Link>
      </div>

      {project && (
        <>
          <h2>{project.name}</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gridGap: "10px",
            }}
          >
            <Edit
              page={project}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
            <Delete
              page={project}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          </div>
        </>
      )}
      {isLoading && <Loading />}
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

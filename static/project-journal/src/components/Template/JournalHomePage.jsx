import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { view } from "@forge/bridge";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import Edit from "../Modals/EditJournalModal";
import Delete from "../Modals/DeleteJournalModal";
import { getJournalById } from "../persistence/utils/StorageUtils";

const DetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projectKey, setProjectKey] = useState(null);
  // const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    view.getContext().then((data) => {
      const { key } = data.extension.project;
      setProjectKey(key);
      console.log("Project Key",projectKey)
    });
    if(projectKey){
      getJournalById(id,projectKey).then(data => {setProject(data)})
   }
  }, [projectKey]);


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
          <Edit page={project} setIsLoading={setIsLoading}  isLoading={isLoading}/>
          <Delete page={project} setIsLoading={setIsLoading}  isLoading={isLoading}/>
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

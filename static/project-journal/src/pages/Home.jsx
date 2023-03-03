import React, { useState, useEffect } from "react";
import Button from "@atlaskit/button";
import { view } from "@forge/bridge";
import { useNavigate } from "react-router-dom";
import Loading from "../components/PageLoader";
import CreatePageModal from "../components/Modals/CreateJournalModal";

import { getJournals } from "../components/persistence/utils/StorageUtils";

export default function Home() {
  //checking project id of the project
  const [projectKey, setProjectKey] = useState(null);
  const [projects, setProjects] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    view.getContext().then((data) => {
      const { key } = data.extension.project;
      setProjectKey(key);
    });
  }, [projectKey]);

  
  useEffect(() => {
    setIsLoading(true);
    getJournals(projectKey).then(data => {setProjects(data)})
    .then(() => setIsLoading(false));
  }, [projectKey]);

  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
        }}
      >
        <Loading size="xlarge" appearance="inherit" />
      </div>
    );
  }
  return (
    <>
      {/* <div>Home</div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button appearance="primary" onClick={() => setIsModalOpen(true)}>
          Create a Project
        </Button>
        <CreatePageModal
          isModalOpen={isModalOpen}
          ModalCloseHandler={() => setIsModalOpen(!isModalOpen)}
        />
      </div>

      {projects?.length > 0 ? (
        projects.map((project, index) => (
          <div
          key={project.id}
          style={{
            display: "flex",
            gap: "1rem",
          }}>
          <div
            key={project.id}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              margin: "0px 5px",
              fontSize: "20px",
              cursor: "pointer",
              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
              height: "300px",
              width: "200px",
            }}
            onClick={() => navigate(`/project/${project.id}`)}
          >
            {/* <div>{index + 1}.</div> */}
            <div>{project.name}</div>
          </div>
          </div>
        ))
      ) : (
        <div>No Projects</div>
      )}
    </>
  );
}

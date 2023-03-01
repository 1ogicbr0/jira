import React, { useState, useEffect } from "react";
import Button from "@atlaskit/button";
import { invoke, view } from "@forge/bridge";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Loading from "../components/Spinner";
import CreatePageModal from "../components/Modals/CreatePageModal";
import { MyContext } from "../context/useContext";
export default function Home() {

  //checking project id of the project
  const [projectId, setId] = useState(null);
  view.getContext().then((data) => {
    const {  id } = data.extension.project;
    setId(id);
  });

  const { data: projects, addData } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    invoke("getStorage", { key: "projectJournal" }).then((data) => {
      addData(data.filter(item => item.projectId===projectId));
      setIsLoading(false);
    }); 
  }, [projectId]);

  if(isLoading){
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
    )
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
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              margin: "0px 5px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <div>{index + 1}.</div>
            <div>{project.name}</div>
          </div>
        ))
      ) : (
        
        <div>No Projects</div>
      )}
    </>
  );
}

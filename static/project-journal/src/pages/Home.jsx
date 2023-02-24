import React, { useState } from "react";
import Button from "@atlaskit/button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import CustomModal from "../components/Modal";
import { MyContext } from "../context/useContext";

export default function Home() {
  const { data:projects } = useContext(MyContext);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div>Home</div>
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
        <CustomModal isModalOpen={isModalOpen} ModalCloseHandler={() => setIsModalOpen(!isModalOpen)}/>
      </div>

      {projects &&
        projects?.map((project) => (
          <div
            key={project.id}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              margin: "10px 5px",
              width: "100rem",
              fontSize: "20px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
            }}
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <div>{project.name}</div>
          </div>
        ))}
    </>
  );
}

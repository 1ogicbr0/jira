import React, { useState } from "react";
import Button from "@atlaskit/button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import CustomModal from "../components/Modal";
import { MyContext } from "../context/useContext";
import PieChart from "../components/piechart";
export default function Home() {
  const { data: projects } = useContext(MyContext);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await fetch('https://00362786-65a9-4ad0-9293-f73a9578cbda.hello.atlassian-dev.net/x1/eruLGhPpDbJyb5Ab_MEXHNlfE64');
    if (response.ok) {
      const data = await response.json();
      // handle the response data here
      console.log(data);
    } else {
      console.error('Error:', response.statusText);
    }
  }
  return (
    <>
      <div
       onClick={handleClick}
      >Home</div>
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
        <CustomModal
          isModalOpen={isModalOpen}
          ModalCloseHandler={() => setIsModalOpen(!isModalOpen)}
        />
      </div>

      {projects &&
        projects?.map((project, index) => (
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
        ))}
      <PieChart />
    </>
  );
}

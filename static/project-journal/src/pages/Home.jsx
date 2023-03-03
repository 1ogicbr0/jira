import React, { useState, useEffect } from "react";
import Button from "@atlaskit/button";
import { view } from "@forge/bridge";
import { useNavigate } from "react-router-dom";
import Loading from "../components/PageLoader";
import CreatePageModal from "../components/Modals/CreateJournalModal";

import { getJournals } from "../components/persistence/utils/StorageUtils";
import CustomDynamicTable from "../components/DynamicTable";

export default function Home() {
  //checking project id of the project
  const [projectKey, setProjectKey] = useState(null);
  const [journals, setProjects] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  useEffect(() => {
    view.getContext().then((data) => {
      const { key } = data.extension.project;
      setProjectKey(key);
    });
  }, [projectKey]);

  
  useEffect(() => {
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        <h2>Project Journals</h2>

        <CreatePageModal
          isModalOpen={isModalOpen}
          ModalCloseHandler={() => setIsModalOpen(!isModalOpen)}
        />
      {journals?.length > 0 ? <CustomDynamicTable journals={journals}/> :  <div>No Journals</div>}
      <Button appearance="primary" onClick={() => setIsModalOpen(true)}>
          Create a Journal
        </Button>
      </div>

    </>
  );
}

import React, { useState, useEffect, useContext } from "react";
import Button from "@atlaskit/button";
import { view, invoke } from "@forge/bridge";

import Loading from "../components/PageLoader";
import CreatePageModal from "../components/Modals/CreateJournalModal";

import { getJournals } from "../components/persistence/utils/StorageUtils";
import { MyContext } from "../context/useContext";
import CustomDynamicTable from "../components/DynamicTable";

export default function Home() {
  const { journals, addJournals } = useContext(MyContext);
  const [projectKey, setProjectKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    view.getContext().then((data) => {
      const { key } = data.extension.project;
      setProjectKey(key);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getJournals(projectKey).then((data) => {
      if (data) {
        addJournals(data);
      }
      setIsLoading(false);
    });
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
        {journals && journals.length > 0 && 
          <CustomDynamicTable journals={journals.length > 0 ? journals : []} />
        }
        {!journals && journals.length === 0 && <div>No Journals Found</div>}
        <Button appearance="primary" onClick={() => setIsModalOpen(true)}>
          Create a Journal
        </Button>
      </div>
    </>
  );
}

import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatePage from "../components/CreatePages";
import { v4 as uuidv4 } from "uuid";

import Button from "@atlaskit/button/standard-button";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
export const pages = [];

const createpage = (name, id) => {
  const data = {
    key: id,
    id,
    name,
    path: `/${id}`,
    element: <CreatePage pages={pages} name={name} key={id} />,
  };

  pages.push(data);
  return pages;
};
function Home(props) {
  const [mypages, setPages] = useState(pages);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  const createPageHandler = () => {
    const id = uuidv4();
    const updated = createpage(`${projectName}`, id);
    setPages(updated);
    navigate(`/${id}`)
    // console.log(updated)
    // console.log(updated.length-1)
  };
  props.setNumberOfPages(pages);
  return (
    <div>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal}>
            <ModalHeader>
              <ModalTitle>Create a Project</ModalTitle>
            </ModalHeader>
            <ModalBody>
              Please Enter the name of your project{" "}
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" onClick={closeModal}>
                Close
              </Button>
              <Button
                appearance="primary"
                onClick={() => {
                  createPageHandler();
                  closeModal();
                }}
                autoFocus
              >
                Done
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
      <h2>HOME</h2>
      <div></div>
      <div>
        <Button
          onClick={() => {
            openModal();
          }}
          appearance="primary"
        >
          Create Project Journal
        </Button>
      </div>

      {mypages.map((item,index) => (
        <Link key={index} to={item.path}>
          <div>
            <div>{item.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;

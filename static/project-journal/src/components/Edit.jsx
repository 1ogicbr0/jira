import React from "react";
import Button from "@atlaskit/button";
import { useContext } from "react";
import { MyContext } from "../context/useContext";
import PropTypes from "prop-types";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
export default function Edit({ page }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { changeData, deleteData } = useContext(MyContext);
  const [newData, setNewData] = React.useState("");
  const { id } = page;

  const handleEdit = () => {
    changeData(id, newData);
    setIsOpen(false);
  };

  const handleDelete = () => {
    deleteData(id);
    
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gridGap: "10px",
      }}
    >
      <ModalTransition>
        {isOpen && (
          <Modal onClose={close}>
            <ModalHeader>
              <ModalTitle>Edit Page</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <input
                type="text"
                placeholder={page.name}
                onChange={(e) => {
                  setNewData(e.target.value);
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button appearance="primary" autoFocus onClick={handleEdit}>
                Submit
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
      <Button
        appearance="primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Edit
      </Button>
      <Button appearance="danger" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}

Edit.propTypes = {
  page: PropTypes.object,
};

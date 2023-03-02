import React, { useEffect, useState } from "react";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";

import CustomForm from "../Forms/CreateJournalForm";

const CustomModal = ({
  isModalOpen,
  ModalCloseHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  


  const close = () => {
    setIsOpen(false);
    ModalCloseHandler();
  };

  useEffect(() => {
    setIsOpen(isModalOpen);
  }, [isModalOpen]);

  return (
    <ModalTransition>
      {isOpen && (
        <Modal onClose={close}>
          <ModalHeader>
            <ModalTitle>Create New Project Journal</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <CustomForm
              ModalHandler={() => {
                setIsOpen(false);
                ModalCloseHandler();
              }}
            />
          </ModalBody>
          <ModalFooter />
        </Modal>
      )}
    </ModalTransition>
  );
};

export default CustomModal;

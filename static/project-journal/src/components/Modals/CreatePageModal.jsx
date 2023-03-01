import React, { useEffect } from "react";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";

import CustomForm from "../Form";

const CustomModal = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const close = () => {
    setIsOpen(false);
    props.ModalCloseHandler();
  };

  useEffect(() => {
    setIsOpen(props.isModalOpen);

  }, [props]);

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
                props.ModalCloseHandler();
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

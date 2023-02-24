import React, { useContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalTransition } from "@atlaskit/modal-dialog";
import Button from "@atlaskit/button";

import { MyContext } from "../context/useContext";
import CustomForm from "./Form";


const CustomModal = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const close = () => {setIsOpen(false);props.ModalCloseHandler();}

  useEffect(() => {
    setIsOpen(props.isModalOpen)
    console.log(isOpen) 
  }, [props])


  return(
    <ModalTransition>
    {isOpen && (
      <Modal onClose={close}  >
        <ModalHeader>
          <ModalTitle>Create New Project Journal</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <CustomForm ModalHandler={() => {setIsOpen(false);props.ModalCloseHandler();}}/>
        </ModalBody>
        <ModalFooter/>
      </Modal>
    )}
  </ModalTransition>
  )
}


export default CustomModal;
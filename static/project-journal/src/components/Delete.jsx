import React, {  Fragment, useState, useContext } from "react";
import { invoke } from "@forge/bridge";
import { MyContext } from "../context/useContext";
import Loading from "./Spinner";
import PropTypes from "prop-types";
import ErrorIcon from '@atlaskit/icon/glyph/error'

import Button from "@atlaskit/button";
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
  } from "@atlaskit/modal-dialog";


const  Delete = ({ page, setIsLoading, isLoading }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const { deleteData, data } = useContext(MyContext);
  const { id } = page;


  const handleDelete = () => {
    setIsLoading(true);
    invoke("setStorage", {
      key: "projectJournal",
      data: data.filter((item) => item.id !== id),
    }).then(() => {
      deleteData(id);
      setIsOpenDelete(false);
      setIsLoading(false);
    });
  };


  return (
    <Fragment>
      <ModalTransition>
        {isOpenDelete && (
          <Modal onClose={close}>
            <ModalHeader>
              <ModalTitle>
              <h6> 
                <ErrorIcon primaryColor="red" size="medium" label=""/>
                 Delete {page.name}? </h6>
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
            <p>You&apos;re about to permanently delete this project journal page, and all of its data. If you&apos;re not sure, you can resolve or close this issue instead.</p>
            </ModalBody>
            <ModalFooter>
            <Button appearance="danger" autoFocus onClick={handleDelete}>
                {isLoading ? <Loading size="small" /> : "Yes"}
              </Button>
              <Button
                appearance="subtle"
                onClick={() => setIsOpenDelete(false)}
              >
                Cancel
              </Button>

            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
      <Button
        appearance="danger"
        onClick={() => {
          setIsOpenDelete(true);
        }}
      >
        Delete
      </Button>
    </Fragment>
  );
}

Delete.propTypes = {
  page: PropTypes.object,
};


export default Delete;
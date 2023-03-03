import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { view } from "@forge/bridge";
import Loading from "../PageLoader";
import PropTypes from "prop-types";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { deleteJournalById } from "../persistence/utils/StorageUtils";

import Button from "@atlaskit/button";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";

const Delete = ({ page, setIsLoading, isLoading }) => {
  const navigate = useNavigate();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const { id } = page;
  const [projectKey, setProjectKey] = useState(null);
  useEffect(() => {
    view.getContext().then((data) => {
      const { key } = data.extension.project;
      setProjectKey(key);
    });
  }, []);

  const handleDelete = () => {
    setIsLoading(true);
    if(projectKey){
      deleteJournalById(id,projectKey).then(() => {setIsOpenDelete(false);setIsLoading(false)}).then(() => navigate("/"));
    }
  };

  return (
    <Fragment>
      <ModalTransition>
        {isOpenDelete && (
          <Modal onClose={close}>
            <ModalHeader>
              <ModalTitle>
                <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gridGap: "10px",
                }}
                >
                  <ErrorIcon primaryColor="red" size="medium" label="" />
                  Delete {page.name}?{" "}
                </div>
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p>
                You&apos;re about to permanently delete this project journal
                page, and all of its data. If you&apos;re not sure, you can
                resolve or close this issue instead.
              </p>
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
};

Delete.propTypes = {
  page: PropTypes.object,
};

export default Delete;

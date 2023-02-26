import React, { Fragment, useState, useEffect } from "react";
import { invoke } from "@forge/bridge";
import { useContext } from "react";
import { MyContext } from "../context/useContext";
import PropTypes from "prop-types";
import Textfield from "@atlaskit/textfield";
import Loading from "./Spinner";
import Button, { ButtonGroup } from "@atlaskit/button";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  HelperMessage,
  ValidMessage,
} from "@atlaskit/form";

export default function Edit({ page, setIsLoading, isLoading }) {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const { changeData, deleteData, data } = useContext(MyContext);
  const [newData, setNewData] = useState(page.name);
  const { id } = page;

  function validate(value) {
    if (value === "") {
      return "EMPTY_FORM";
    }
    if (value.length < 3) {
      return "LESS_CHAR";
    }
    if (value === "working") {
      return "PROJECT_EXIST";
    }
    return undefined;
  }

  const handleEdit = () => {
    setIsLoading(true);
    invoke("setStorage", {
      key: "projectJournal",
      data: data.map((item) =>
        item.id === id ? { ...item, name: newData } : item
      ),
    }).then(() => {
      changeData(id, newData);
      setIsOpenEdit(false);
      setIsLoading(false);
    });
  };

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

  // const submitHandler = (formState) => {
  // setNewData(formState.name);
  // handleEdit();
  // };
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
        {isOpenEdit && (
          <Modal onClose={close}>
            <ModalHeader>
              <ModalTitle>Editing {page.name}</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleEdit}>
                {({ formProps }) => (
                  <form {...formProps} name="project-form">
                    <Field
                      label="Project Name"
                      name="name"
                      validate={validate}
                      defaultValue={newData}
                    >
                      {({ fieldProps, error, meta: { valid } }) => (
                        <Fragment>
                          <Textfield
                            {...fieldProps}
                            onChange={(e) => setNewData(e.target.value)}
                          />
                          {valid && (
                            <ValidMessage>Valid Project Name</ValidMessage>
                          )}
                          {error === "EMPTY_FORM" && (
                            <ErrorMessage>Project name is empty</ErrorMessage>
                          )}
                          {error === "LESS_CHAR" && (
                            <ErrorMessage>
                              Project name should be great than 3 characters
                            </ErrorMessage>
                          )}
                          {error === "PROJECT_EXIST" && (
                            <ErrorMessage>Project already exists</ErrorMessage>
                          )}
                        </Fragment>
                      )}
                    </Field>
                    <ModalFooter>
                      <FormFooter>
                        <ButtonGroup>
                          <Button
                            appearance="subtle"
                            onClick={() => setIsOpenEdit(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" appearance="primary">
                            {isLoading ? <Loading size="small" /> : "Submit"}
                          </Button>
                        </ButtonGroup>
                      </FormFooter>
                    </ModalFooter>
                  </form>
                )}
              </Form>
            </ModalBody>
          </Modal>
        )}
        {isOpenDelete && (
          <Modal onClose={close}>
            <ModalHeader>
              <ModalTitle>
                Are you sure you want to delete: {page.name}?
              </ModalTitle>
            </ModalHeader>

            <ModalFooter>
              <Button
                appearance="subtle"
                onClick={() => setIsOpenDelete(false)}
              >
                Cancel
              </Button>
              <Button appearance="danger" autoFocus onClick={handleDelete}>
                {isLoading ? <Loading size="small" /> : "Yes"}
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
      <Button
        appearance="primary"
        onClick={() => {
          setIsOpenEdit(true);
        }}
      >
        Edit
      </Button>
      <Button
        appearance="danger"
        onClick={() => {
          setIsOpenDelete(true);
        }}
      >
        Delete
      </Button>
    </div>
  );
}

Edit.propTypes = {
  page: PropTypes.object,
};

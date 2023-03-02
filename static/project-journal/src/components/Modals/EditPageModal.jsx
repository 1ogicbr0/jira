import React, { Fragment, useState,useContext, useEffect } from "react";
import { invoke ,view} from "@forge/bridge";
import { MyContext } from "../../context/useContext";
import PropTypes from "prop-types";
import Textfield from "@atlaskit/textfield";
import Loading from "../Spinner";
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
  ValidMessage,
} from "@atlaskit/form";

const  Edit = ({ page, setIsLoading, isLoading }) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const { changeData, data } = useContext(MyContext);
  const [newData, setNewData] = useState(page.name);
  const { id } = page;
  const [projectKey, setProjectKey] = useState(null);
  useEffect(() => {
    view.getContext().then((data) => {
      const { key } = data.extension.project;
      setProjectKey(key);
    });
  }, []);


  const handleEdit = () => {
    setIsLoading(true);
    invoke("setStorage", {
      key: projectKey,
      data: data.map((item) =>
        item.id === id ? { ...item, name: newData } : item
      ),
    }).then(() => {
      changeData(id, newData);
      setIsOpenEdit(false);
      setIsLoading(false);
    });
  };

  // const submitHandler = (formState) => {
  // setNewData(formState.name);
  // handleEdit();
  // };
  return (
    <Fragment>
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
      </ModalTransition>
      <Button
        appearance="primary"
        onClick={() => {
          setIsOpenEdit(true);
        }}
      >
        Edit
      </Button>
    </Fragment>
  );
}

Edit.propTypes = {
  page: PropTypes.object,
};


export default Edit;


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

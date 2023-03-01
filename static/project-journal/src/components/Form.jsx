import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/useContext";
import { v4 as uuid } from "uuid";
import { invoke, view } from "@forge/bridge";
import Textfield from "@atlaskit/textfield";
import Loading from "./Spinner";
import Button, { ButtonGroup } from "@atlaskit/button";
import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  ValidMessage,
} from "@atlaskit/form";

const CustomForm = (props) => {
  const navigate = useNavigate();
  const { updateData, addData } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const [projectId, setProjectId] = useState(null);
  view.getContext().then((data) => {
    const {  id } = data.extension.project;
    setProjectId(id);
  });


  const submitHandler = (formState) => {
    console.log(formState);
    setLoading(true);
    const id = uuid();
    invoke("getStorage", { key: "projectJournal" }).then((data) => {
      invoke("setStorage", {
        key: "projectJournal",
        data:
          data && data.length
            ? [...data, { ...formState, id: id, projectId: projectId }]
            : [{ ...formState, id: id, projectId: projectId }],
      }).then(() => {
        data && data.length
          ? updateData({ ...formState, id: id, projectId: projectId })
          : addData([{ ...formState, id: id, projectId: projectId }]);
        setLoading(false);
        props.ModalHandler();
        navigate(`/project/${id}`);
      });
    });
  };
  return (
    <Form onSubmit={submitHandler}>
      {({ formProps }) => (
        <form {...formProps} name="project-form">
          <Field
            label="Project Name"
            name="name"
            validate={validate}
            defaultValue=""
          >
            {({ fieldProps, error, meta: { valid } }) => (
              <Fragment>
                <Textfield {...fieldProps} />
                {valid && <ValidMessage>Valid Project Name</ValidMessage>}
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
          <FormFooter>
            <ButtonGroup>
              <Button appearance="subtle" onClick={() => props.ModalHandler()}>
                Cancel
              </Button>
              <Button type="submit" appearance="primary">
                {loading ? <Loading/>: "Submit"}
              </Button>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  );
};

export default CustomForm;

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

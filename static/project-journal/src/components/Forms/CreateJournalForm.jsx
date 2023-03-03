import React, { Fragment, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {  view } from "@forge/bridge";
import Textfield from "@atlaskit/textfield";
import Loading from "../PageLoader";
import Button, { ButtonGroup } from "@atlaskit/button";
import Form, {
  ErrorMessage,
  Field,
  FormFooter,
} from "@atlaskit/form";

import ProjectJournal from "../persistence/model/ProjectJournal";

const CustomForm = (props) => {
  const [loading, setLoading] = useState(false);

  const [projectId, setProjectId] = useState(null);
  useEffect(() => {
    view.getContext().then((data) => {
      const { key } = data.extension.project;
      setProjectId(key);
    });
  }, []);

  const submitHandler = ({name}) => {
    const id = uuid();
    setLoading(true);
    ProjectJournal(name,id,projectId).then(() => {
      setLoading(false);props.ModalHandler();
    });
  }
  return (
    <Form onSubmit={submitHandler}>
      {({ formProps }) => (
        <form {...formProps} name="project-form">
          <Field
            label="Project Name"
            name="name"
            validate={validate}
            isRequired
            defaultValue=""
          >
            {({ fieldProps, error }) => (
              <Fragment>
                <Textfield {...fieldProps} />
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
                {loading ? <Loading /> : "Submit"}
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

import React, { Fragment, useEffect, useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import { view } from "@forge/bridge";
import Textfield from "@atlaskit/textfield";
import Loading from "../PageLoader";
import Button, { ButtonGroup } from "@atlaskit/button";
import Form, { ErrorMessage, Field, FormFooter } from "@atlaskit/form";
import { MyContext } from "../../context/useContext";
import ProjectJournal from "../persistence/model/ProjectJournal";

const CustomForm = (props) => {
  const [loading, setLoading] = useState(false);
  const { updateJournals } = useContext(MyContext);
  const [projectKey, setProjectKey] = useState(null);
  useEffect(() => {
    view.getContext().then((data) => {
      const { key } = data.extension.project;
      setProjectKey(key);
    });
  }, []);

  const submitHandler = ({ name }) => {
    const id = uuid();
    setLoading(true);
    ProjectJournal(name, id, projectKey).then((data) => {
      setLoading(false);
      updateJournals({
        id: id,
        name: name,
        projectKey: projectKey,
      });

      props.ModalHandler();
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

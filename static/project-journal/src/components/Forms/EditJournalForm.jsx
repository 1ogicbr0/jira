import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/useContext";
import { v4 as uuid } from "uuid";
import { invoke, view } from "@forge/bridge";
import Textfield from "@atlaskit/textfield";
import Loading from "../PageLoader";
import Button, { ButtonGroup } from "@atlaskit/button";
import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  ValidMessage,
} from "@atlaskit/form";
import ProjectJournal from "../persistence/model/ProjectJournal";

const CustomForm = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [projectId, setProjectId] = useState(null);
  useEffect(() => {
    view.getContext().then((data) => {
      const { key } = data.extension.project;
      setProjectId(key);
    });
  }, []);

  const submitHandler = ({name}) => {
    // setIsLoading(true);
    console.log(name,projectId,id);
    const update = true
    
    ProjectJournal(name,id,projectId,update).then(() => {
      setIsOpenEdit(false);
      // setIsLoading(false);
      navigate("/");
    });
  }
  return (
    <Form onSubmit={submitHandler}>
      {({ formProps }) => (
        <form {...formProps} name="edit-form">
          <Field
            label="Project Name"
            name="name"
            validate={validate}
            defaultValue={props.page.name}
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

import React, { Fragment, useContext, useState, useEffect } from 'react';
import { MyContext } from "../context/useContext";
import { v4 as uuid } from "uuid";

import Textfield from '@atlaskit/textfield';

import Button, { ButtonGroup } from '@atlaskit/button';
import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  HelperMessage,
  ValidMessage,
} from '@atlaskit/form';

const CustomForm = (props) => {
  const { updateData } = useContext(MyContext);

    const submitHandler = (formState) => {
        console.log('form state', formState);
            updateData({ ...formState, id: uuid() });
            props.ModalHandler()
      };
  return ( <Form onSubmit={submitHandler}>
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
              {error === 'EMPTY_FORM' && (
                <ErrorMessage>
                  Project name is empty
                </ErrorMessage>
              )}
              {error === 'LESS_CHAR' && (
                <ErrorMessage>
                  Project name should be great than 3 characters
                </ErrorMessage>
              )}
              {error === 'PROJECT_EXIST' && (
                <ErrorMessage>
                  Project already exists
                </ErrorMessage>
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
            Submit
          </Button>
          </ButtonGroup>
        </FormFooter>
      </form>
    )}
  </Form>
);
}

export default CustomForm;


function validate(value) {
    if (value === '') {
      return 'EMPTY_FORM';
    }
    if (value.length < 3 ) {
        return 'LESS_CHAR';
      }
    if (value === "working") {
        return 'PROJECT_EXIST';
      }
    return undefined;
  }
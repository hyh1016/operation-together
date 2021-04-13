import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${(props) => props.theme.highlightColor};
`;

const Message = styled.p`
  color: red;
`;

interface Props {
  title?: string;
  message?: string;
}

const Form: React.FC<Props> = ({ title, children, message }) => {
  return (
    <>
      {title ? <h1>{title}</h1> : undefined}
      <FormWrapper>
        {children}
        {message ? <Message>{message}</Message> : undefined}
      </FormWrapper>
    </>
  );
};

export default Form;

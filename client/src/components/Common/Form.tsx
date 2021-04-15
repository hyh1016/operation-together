import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form<Props>`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: ${(props) =>
    props.title ? `1px solid ${props.theme.highlightColor}` : `none`};
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
      <FormWrapper title={title}>
        {children}
        {message ? <Message>{message}</Message> : undefined}
      </FormWrapper>
    </>
  );
};

export default Form;

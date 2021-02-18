import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  width: 80%;
  margin: 0.5rem;
  padding: 0.3rem;
  border: 1px solid ${(props) => props.color};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) =>
    props.color === props.theme.mainColor
      ? props.theme.highlightColor
      : props.theme.mainColor};
  color: ${(props) => props.color};
  font-size: 1.5rem;
  outline: none;
  cursor: pointer;

  transition: all ease 0.3s 0s;
  &:hover {
    opacity: 0.5;
  }
`;

interface Props {
  value: string;
  color: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<Props> = ({ value, color, onClick }) => {
  return (
    <div>
      <ButtonWrapper onClick={onClick} color={color}>
        {value}
      </ButtonWrapper>
    </div>
  );
};

export default Button;

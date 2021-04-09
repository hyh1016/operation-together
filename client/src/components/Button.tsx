import theme from '@/style/theme';
import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button<Props>`
  width: 80%;
  margin: 0.5rem;
  padding: 0.3rem;
  border: ${(props) => (props.border ? `1px solid ${props.color}` : 'none')};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.backgroundColor};
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
  id?: string;
  backgroundColor?: string;
  color?: string;
  border?: boolean;
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<Props> = ({
  id,
  backgroundColor,
  color,
  border,
  value,
  onClick,
}) => {
  return (
    <div>
      <ButtonWrapper
        id={id}
        onClick={onClick}
        backgroundColor={backgroundColor}
        color={color}
        border={border}
      >
        {value}
      </ButtonWrapper>
    </div>
  );
};

Button.defaultProps = {
  backgroundColor: theme.highlightColor,
  color: theme.mainColor,
  border: true,
};

export default Button;

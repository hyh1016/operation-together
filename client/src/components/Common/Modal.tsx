import theme from '@/style/theme';
import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  min-width: 350px;
  max-height: 500px;
  padding: 2rem;
  border-radius: 16px;
  background-color: #333;
  text-align: center;
  overflow: auto;

  #close {
    width: 10%;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ visible, setVisible, children }) => {
  if (!visible) return null;
  return (
    <>
      <ModalOverlay onClick={() => setVisible(!visible)} />

      <ModalWrapper>
        <Button
          id="close"
          value="X"
          backgroundColor="inherit"
          color={theme.highlightColor}
          border={false}
          onClick={() => setVisible(!visible)}
        />
        {children}
      </ModalWrapper>
    </>
  );
};

export default Modal;

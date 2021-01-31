import React from 'react';
import styled from 'styled-components';

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
  width: 400px;
  height: fit-content;
  padding: 2rem;
  border-radius: 16px;
  background-color: #333;
  text-align: center;
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
      <ModalWrapper>{children}</ModalWrapper>
    </>
  );
};

export default Modal;

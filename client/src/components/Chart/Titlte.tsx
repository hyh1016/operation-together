import React, { useState } from 'react';
import styled from 'styled-components';
import { Operation } from '@/interfaces';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import SaveOperationForm from '@/components/Common/SaveOperationForm';

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  text-align: center;

  @media (min-width: 400px) {
    padding: 0 2rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;

  Button {
    width: inherit;
  }
`;

interface Props {
  operation: Operation;
  setOperation: React.Dispatch<React.SetStateAction<Operation | undefined>>;
}

const Title: React.FC<Props> = ({ operation, setOperation }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TitleWrapper>
        <h1>{`#${operation.id} ${operation.title}`}</h1>
        <ButtonWrapper>
          <Button
            value="작전 수정"
            border={false}
            onClick={() => setVisible(!visible)}
          />
          <Button value="작전 탈퇴" border={false} backgroundColor="#FF92AC" />
        </ButtonWrapper>
      </TitleWrapper>
      <Modal visible={visible} setVisible={setVisible}>
        <SaveOperationForm
          isCreate={false}
          operation={operation}
          setOperation={setOperation}
          setVisible={setVisible}
        />
      </Modal>
    </>
  );
};

export default Title;

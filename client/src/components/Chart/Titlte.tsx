import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import SaveOperationForm from '@/components/Common/SaveOperationForm';
import { useUser } from '@/contexts/UserContext';
import { useOperation } from '@/contexts/OperationContext';
import LeaveOperationForm from './LeaveOperationForm';

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

const Title: React.FC = () => {
  const user = useUser();
  const operation = useOperation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [modifyOn, setModifyOn] = useState(false);
  const [leaveOn, setLeaveOn] = useState(false);

  useEffect(() => {
    setIsAdmin(user.id === operation.adminId);
  }, [operation]);

  const modifyModalEvent = () => {
    if (!isAdmin) {
      alert('관리자만 수정이 가능합니다.\n 관리자에게 문의하세요.');
      return;
    }
    setModifyOn(!modifyOn);
  };

  return (
    <>
      <TitleWrapper>
        <h1>{`#${operation.id} ${operation.title}`}</h1>
        <ButtonWrapper>
          <Button value="작전 수정" border={false} onClick={modifyModalEvent} />
          <Button
            value="작전 탈퇴"
            border={false}
            backgroundColor="#FF92AC"
            onClick={() => setLeaveOn(!leaveOn)}
          />
        </ButtonWrapper>
      </TitleWrapper>
      <Modal visible={modifyOn} setVisible={setModifyOn}>
        <SaveOperationForm isCreate={false} setVisible={setModifyOn} />
      </Modal>
      <Modal visible={leaveOn} setVisible={setLeaveOn}>
        <LeaveOperationForm setVisible={setLeaveOn} />
      </Modal>
    </>
  );
};

export default Title;

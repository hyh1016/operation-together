import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { sendDeleteRequest } from '@/utils/request';
import { ERROR } from '@/utils/message';
import Form from '@/components/Common/Form';
import Button from '@/components/Common/Button';
import { useUser, useUserDispatch } from '@/contexts/UserContext';
import { useOperation } from '@/contexts/OperationContext';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;

  Button {
    width: 100px;
  }
`;

interface Props {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeaveOperationForm: React.FC<Props> = ({ setVisible }) => {
  const operation = useOperation();
  const user = useUser();
  const userDispatch = useUserDispatch();
  const [message, setMessage] = useState('');
  const history = useHistory();

  const leaveOperationEvent = async () => {
    if (
      operation.users &&
      operation.users.length > 1 &&
      operation.adminId === user.id
    ) {
      alert(ERROR.ADMIN_CANT_LEAVE_OPERATION);
      setVisible(false);
      return;
    }
    const { result, error } = await sendDeleteRequest(
      `/operations/user/${operation.id}`,
    );
    if (error) {
      setMessage(ERROR.OPERATION_LEAVE_FAILED);
      return;
    }
    userDispatch({ type: 'DELETE_OPERATION', operationId: operation.id });
    history.push('/');
  };

  return (
    <Form message={message}>
      <h2>작전에서 탈퇴하시겠습니까?</h2>
      <ButtonWrapper>
        <Button
          value="예"
          onClick={async () => {
            await leaveOperationEvent();
          }}
        />
        <Button value="아니오" onClick={() => setVisible(false)} />
      </ButtonWrapper>
    </Form>
  );
};

export default LeaveOperationForm;

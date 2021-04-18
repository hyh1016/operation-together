import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { sendPutRequest } from '@/utils/request';
import { ERROR } from '@/utils/message';
import Form from '@/components/Common/Form';
import Button from '@/components/Common/Button';
import { useUserDispatch } from '@/contexts/UserContext';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;

  Button {
    width: 100px;
  }
`;

interface Props {
  operationId: number;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeaveOperationForm: React.FC<Props> = ({ operationId, setVisible }) => {
  const [message, setMessage] = useState('');
  const userDispatch = useUserDispatch();
  const history = useHistory();

  const leaveOperationEvent = async () => {
    const { result, error } = await sendPutRequest(
      `/operations/${operationId}/leave`,
    );
    if (error) {
      setMessage(ERROR.OPERATION_LEAVE_FAILED);
      return;
    }
    userDispatch({ type: 'DELETE_OPERATION', operationId });
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

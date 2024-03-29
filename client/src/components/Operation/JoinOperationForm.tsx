import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ERROR } from '@/utils/message';
import { sendPostRequest } from '@/utils/request';
import Form from '@/components/Common/Form';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useUserDispatch } from '@/contexts/UserContext';

const JoinOperationForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useUserDispatch();
  const [id, setId] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const joinOperationEvent = async () => {
    const { result, error } = await sendPostRequest('/operations/user', {
      id,
      code,
    });
    if (error) {
      setMessage(ERROR.NOT_VALID_OPERATION);
      return;
    }
    dispatch({ type: 'ADD_OPERATION', operation: result.operation });
    history.push(`/operations/${result.operation.id}`);
  };

  return (
    <Form title="작전 참여" message={message}>
      <Input
        type="text"
        value={id}
        placeholder="작전 코드를 입력해주세요."
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        type="text"
        value={code}
        placeholder="암호를 입력해주세요."
        onChange={(e) => setCode(e.target.value)}
      />
      <Button
        value="참여하기"
        onClick={async () => {
          await joinOperationEvent();
        }}
      />
    </Form>
  );
};

export default JoinOperationForm;

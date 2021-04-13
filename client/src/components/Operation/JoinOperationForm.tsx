import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ERROR } from '@/utils/message';
import { sendPutRequest } from '@/utils/request';
import Form from '@/components/Common/Form';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';

const JoinOperationForm: React.FC = () => {
  const history = useHistory();
  const [id, setId] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const joinOperationEvent = async () => {
    if (!localStorage.getItem('token')) {
      alert(ERROR.NOT_VALID_TOKEN);
      history.push('/login');
      return;
    }
    const { result, error } = await sendPutRequest('/operations/join', {
      id,
      code,
    });
    if (error) {
      setMessage(ERROR.NOT_VALID_OPERATION);
      return;
    }
    history.push(`/operations/${id}`);
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
        onClick={async (e) => {
          e.preventDefault();
          await joinOperationEvent();
        }}
      />
    </Form>
  );
};

export default JoinOperationForm;

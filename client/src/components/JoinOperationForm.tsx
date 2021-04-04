import { ERROR } from '@/utils/message';
import { sendPutRequest } from '@/utils/request';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const JoinOperationFormWrapper = styled.form`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${(props) => props.theme.highlightColor};
`;

const Input = styled.input`
  width: 80%;
  margin: 0.5rem;
  padding: 0.5rem;
  border: 3px solid #fff;
  border-radius: 16px;
  font-size: 1rem;
  outline: none;
  &:focus {
    border: 3px solid ${(props) => props.theme.highlightColor};
  }
  &[type='password'] {
    font-family: Arial, Helvetica, sans-serif;
  }
  &::placeholder {
    font-family: 'BMDOHYEON';
  }
`;

const Message = styled.p`
  color: red;
`;

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
    <>
      <h1>작전 참여</h1>
      <JoinOperationFormWrapper>
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
        <Message>{message}</Message>
      </JoinOperationFormWrapper>
    </>
  );
};

export default JoinOperationForm;

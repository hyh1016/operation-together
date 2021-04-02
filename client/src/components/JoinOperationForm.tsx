import React, { useState } from 'react';
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

const JoinOperationForm: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <h1>작전 참여</h1>
      <JoinOperationFormWrapper>
        <Input
          type="text"
          value={roomId}
          placeholder="작전 코드를 입력해주세요."
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Input
          type="text"
          value={password}
          placeholder="암호를 입력해주세요."
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button value="참여하기" />
      </JoinOperationFormWrapper>
    </>
  );
};

export default JoinOperationForm;

import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/style/theme';
import Button from './Button';

const JoinFormWrapper = styled.div`
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

const JoinForm: React.FC = () => {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [inspectPassword, setInspectPassword] = useState('');
  const [message, setMessage] = useState('');

  const joinEvent = () => {
    if (!isValidForm()) return false;
    // TODO: ajax - join
  };

  const isValidForm = (): boolean => {
    if (!isValidId(id)) {
      setMessage('잘못된 형식의 아이디입니다.');
      return false;
    }
    if (!isValidNickname(nickname)) {
      setMessage('잘못된 형식의 닉네임입니다.');
      return false;
    }
    if (!isValidPassword(password)) {
      setMessage('잘못된 형식의 비밀번호입니다.');
      return false;
    }
    if (!isEqualPassword(password, inspectPassword)) {
      setMessage('비밀번호가 틀렸습니다.');
      return false;
    }
    setMessage('');
    return true;
  };

  return (
    <>
      <h1>회원가입</h1>
      <JoinFormWrapper>
        <Input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디 (영문, 숫자 6~12자)"
        />
        <Input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임 (1~10자)"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 (8~12자)"
        />
        <Input
          type="password"
          value={inspectPassword}
          onChange={(e) => setInspectPassword(e.target.value)}
          placeholder="비밀번호 확인"
        />
        <Button color={theme.mainColor} value="가입하기" onClick={joinEvent} />
        <Message>{message}</Message>
      </JoinFormWrapper>
    </>
  );
};

const isValidId = (id: string) => {
  if (id.length < 6 || id.length > 12) return false;
  if (/[^\w]/.test(id)) return false;
  // TODO: 이미 가입되어있는 id인지 검사
  return true;
};

const isValidNickname = (nickname: string) => {
  if (nickname.length < 1 || nickname.length > 10) return false;
  return true;
};

const isValidPassword = (password: string) => {
  if (password.length < 8 || password.length > 12) return false;
  return true;
};

const isEqualPassword = (password: string, inspectPassword: string) => {
  if (password !== inspectPassword) return false;
  return true;
};

export default JoinForm;

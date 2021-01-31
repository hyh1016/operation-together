import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/style/theme';
import Button from './Button';

const LoginFormWrapper = styled.div`
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

const LoginForm: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const loginEvent = () => {
    if (!isValidForm()) return false;
    // TODO: ajax - login
  };

  const isValidForm = (): boolean => {
    // TODO: 아이디/비밀번호 불일치시 '잘못된 정보입니다.' 메시지
    setMessage('');
    return true;
  };

  return (
    <>
      <h1>로그인</h1>
      <LoginFormWrapper>
        <Input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력하세요."
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요."
        />
        <Button
          color={theme.mainColor}
          value="로그인하기"
          onClick={loginEvent}
        />
        <Message>{message}</Message>
      </LoginFormWrapper>
    </>
  );
};

export default LoginForm;

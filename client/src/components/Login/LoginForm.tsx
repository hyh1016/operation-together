import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import theme from '@/style/theme';
import { sendPostRequest } from '@/utils/request';
import { ERROR } from '@/utils/message';
import Button from '@/components/Common/Button';

const LoginFormWrapper = styled.form`
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
  const history = useHistory();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const loginEvent = async () => {
    const { result, error } = await sendPostRequest('/users/login', {
      id,
      password,
    });
    if (error) {
      setMessage(ERROR.NOT_VALID_USER);
      return;
    }
    localStorage.setItem('token', result.token);
    history.push('/');
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
          autoComplete="on"
        />
        <Button
          backgroundColor={theme.highlightColor}
          color={theme.mainColor}
          value="로그인하기"
          onClick={async (e) => {
            e.preventDefault();
            await loginEvent();
          }}
        />
        <Message>{message}</Message>
      </LoginFormWrapper>
    </>
  );
};

export default LoginForm;

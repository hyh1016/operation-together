import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { sendGetRequest, sendPostRequest } from '@/utils/request';
import { ERROR } from '@/utils/message';
import Form from '@/components/Common/Form';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useUserDispatch } from '@/contexts/UserContext';

const LoginForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useUserDispatch();
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
    await setUser();
    history.push('/');
  };

  const setUser = async () => {
    const { result, error } = await sendGetRequest('/users/me');
    if (error) return;
    dispatch({ type: 'SET_USER', user: result.me });
  };

  return (
    <Form title="로그인" message={message}>
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
        value="로그인하기"
        onClick={async () => {
          await loginEvent();
        }}
      />
    </Form>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { sendPostRequest } from '@/utils/request';
import { ERROR } from '@/utils/message';
import Form from '@/components/Common/Form';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';

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
        onClick={async (e) => {
          e.preventDefault();
          await loginEvent();
        }}
      />
    </Form>
  );
};

export default LoginForm;

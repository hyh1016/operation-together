import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { sendGetRequest, sendPostRequest } from '@/utils/request';
import { ERROR } from '@/utils/message';
import Form from '@/components/Common/Form';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';

const JoinForm: React.FC = () => {
  const history = useHistory();
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [inspectPassword, setInspectPassword] = useState('');
  const [message, setMessage] = useState('');

  const isValidId = () => {
    if (id.length < 6 || id.length > 12) return false;
    if (/[^\w]/.test(id)) return false;
    return true;
  };

  const isNotExistId = async () => {
    const { result } = await sendGetRequest(`/users/exist/${id}`);
    if (result.exist) {
      return false;
    }
    return true;
  };

  const isValidNickname = () => {
    if (nickname[0] === ' ') return false;
    if (nickname.length < 1 || nickname.length > 10) return false;
    return true;
  };

  const isValidPassword = () => {
    if (password.length < 8 || password.length > 12) return false;
    if (/[^\w]/.test(password)) return false;
    return true;
  };

  const isEqualPassword = () => {
    if (password !== inspectPassword) return false;
    return true;
  };

  const checkData = (func: () => boolean, errorMessage: string) => {
    const result = func();
    if (!result) {
      setMessage(errorMessage);
      return false;
    }
    setMessage('');
    return true;
  };

  const checkAsyncData = async (
    func: () => Promise<boolean>,
    errorMessage: string,
  ) => {
    const result = await func();
    if (!result) {
      setMessage(errorMessage);
      return false;
    }
    setMessage('');
    return true;
  };

  const isValidForm = async () => {
    if (!checkData(isValidId, ERROR.NOT_VALID_ID)) return false;
    if (!(await checkAsyncData(isNotExistId, ERROR.IS_EXIST_ID))) return false;
    if (!checkData(isValidNickname, ERROR.NOT_VALID_NICKNAME)) return false;
    if (!checkData(isValidPassword, ERROR.NOT_VALID_PASSWORD)) return false;
    if (!checkData(isEqualPassword, ERROR.NOT_EQUAL_PASSWORD)) return false;
    return true;
  };

  const joinEvent = async () => {
    if (!(await isValidForm())) return;
    const { result, error } = await sendPostRequest('/users/register', {
      id,
      nickname,
      password,
    });
    if (error) {
      setMessage(ERROR.JOIN_FAILED);
      return;
    }
    await loginEvent();
  };

  const loginEvent = async () => {
    const { result, error } = await sendPostRequest('/users/login', {
      id,
      password,
    });
    if (error) {
      setMessage(ERROR.LOGIN_FAILED);
      return;
    }
    localStorage.setItem('token', result.token);
    history.push('/');
  };

  return (
    <Form title="회원가입" message={message}>
      <Input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        onBlur={async () => {
          if (!checkData(isValidId, ERROR.NOT_VALID_ID)) return;
          await checkAsyncData(isNotExistId, ERROR.IS_EXIST_ID);
        }}
        placeholder="아이디 (영문, 숫자 6~12자)"
        maxLength={12}
      />
      <Input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        onBlur={() => {
          checkData(isValidNickname, ERROR.NOT_VALID_NICKNAME);
        }}
        placeholder="닉네임 (1~10자)"
        maxLength={10}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => {
          checkData(isValidPassword, ERROR.NOT_VALID_PASSWORD);
        }}
        placeholder="비밀번호 (8~12자)"
        maxLength={12}
      />
      <Input
        type="password"
        value={inspectPassword}
        onChange={(e) => setInspectPassword(e.target.value)}
        onBlur={() => {
          checkData(isEqualPassword, ERROR.NOT_EQUAL_PASSWORD);
        }}
        placeholder="비밀번호 확인"
        maxLength={12}
      />
      <Button
        value="가입하기"
        onClick={async () => {
          await joinEvent();
        }}
      />
    </Form>
  );
};

export default JoinForm;

import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/style/theme';
import { sendGetRequest } from '@/utils/request';
import { ERROR } from '@/utils/message';
import Button from './Button';

const JoinFormWrapper = styled.form`
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

  const isValidId = () => {
    if (id.length < 6 || id.length > 12) return false;
    if (/[^\w]/.test(id)) return false;
    return true;
  };

  const isNotExistId = async () => {
    const result = await sendGetRequest(`/users/exist/${id}`);
    if (result.data.exist) {
      return false;
    }
    return true;
  };

  const isValidNickname = () => {
    if (nickname.length < 1 || nickname.length > 10) return false;
    return true;
  };

  const isValidPassword = () => {
    if (password.length < 8 || password.length > 12) return false;
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
    if (!checkData(isValidId, ERROR.NOT_VALID_ID)) return;
    if (!(await checkAsyncData(isNotExistId, ERROR.IS_EXIST_ID))) return;
    if (!checkData(isValidNickname, ERROR.NOT_VALID_NICKNAME)) return;
    if (!checkData(isValidPassword, ERROR.NOT_VALID_PASSWORD)) return;
    checkData(isEqualPassword, ERROR.NOT_EQUAL_PASSWORD);
  };

  return (
    <>
      <h1>회원가입</h1>
      <JoinFormWrapper>
        <Input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onBlur={async () => {
            if (!checkData(isValidId, ERROR.NOT_VALID_ID)) return;
            await checkAsyncData(isNotExistId, ERROR.IS_EXIST_ID);
          }}
          placeholder="아이디 (영문, 숫자 6~12자)"
        />
        <Input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onBlur={() => {
            checkData(isValidNickname, ERROR.NOT_VALID_NICKNAME);
          }}
          placeholder="닉네임 (1~10자)"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => {
            checkData(isValidPassword, ERROR.NOT_VALID_PASSWORD);
          }}
          placeholder="비밀번호 (8~12자)"
        />
        <Input
          type="password"
          value={inspectPassword}
          onChange={(e) => setInspectPassword(e.target.value)}
          onBlur={() => {
            checkData(isEqualPassword, ERROR.NOT_EQUAL_PASSWORD);
          }}
          placeholder="비밀번호 확인"
        />
        <Button
          color={theme.mainColor}
          value="가입하기"
          onClick={async (e) => {
            e.preventDefault();
            await isValidForm();
          }}
        />
        <Message>{message}</Message>
      </JoinFormWrapper>
    </>
  );
};

export default JoinForm;

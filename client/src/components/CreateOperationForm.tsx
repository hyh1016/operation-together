import React, { useState } from 'react';
import styled from 'styled-components';
import { CirclePicker } from 'react-color';
import { ERROR } from '@/utils/message';
import { sendPostRequest } from '@/utils/request';
import { useHistory } from 'react-router-dom';
import Button from './Button';

const CreateOperationFormWrapper = styled.form`
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

const ColorPickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 0.5rem auto;
`;

const Message = styled.p`
  color: red;
`;

const CreateOperationForm: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [color, setColor] = useState('');
  const [message, setMessage] = useState('');

  const isValidTitle = () => {
    if (title.length < 1) return false;
    if (title[0] === ' ') return false;
    return true;
  };

  const isValidCode = () => {
    if (code[0] === ' ') return false;
    return true;
  };

  const isValidDate = () => {
    if (today > startDate || today > endDate) return false;
    if (startDate > endDate) return false;
    return true;
  };

  const isValidColor = () => {
    if (!color) return false;
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

  const isValidForm = () => {
    if (!checkData(isValidTitle, ERROR.NOT_VALID_TITLE)) return false;
    if (!checkData(isValidCode, ERROR.NOT_VALID_CODE)) return false;
    if (!checkData(isValidDate, ERROR.NOT_VALID_DATE)) return false;
    if (!checkData(isValidColor, ERROR.NOT_VALID_COLOR)) return false;
    return true;
  };

  const createOperationEvent = async () => {
    if (!isValidForm()) return;
    const { result, error } = await sendPostRequest('/operations', {
      title,
      code,
      startDate,
      endDate,
      color,
    });
    if (error) {
      alert('로그인 정보가 없습니다. 로그인 페이지로 이동합니다.');
      history.push('/login');
      return;
    }
    const { operationId } = result;
    history.push(`/operations/${operationId}`);
  };

  return (
    <>
      <h1>작전 생성</h1>
      <CreateOperationFormWrapper>
        <Input
          type="text"
          value={title}
          placeholder="작전명을 입력해주세요."
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => {
            checkData(isValidTitle, ERROR.NOT_VALID_TITLE);
          }}
          maxLength={20}
        />
        <Input
          type="text"
          value={code}
          placeholder="(선택) 암호를 설정해주세요."
          onChange={(e) => setCode(e.target.value)}
          onBlur={() => {
            checkData(isValidCode, ERROR.NOT_VALID_CODE);
          }}
          maxLength={8}
        />
        <h3>시작 날짜</h3>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          onBlur={() => {
            checkData(isValidDate, ERROR.NOT_VALID_DATE);
          }}
        />
        <h3>종료 날짜</h3>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          onBlur={() => {
            checkData(isValidDate, ERROR.NOT_VALID_DATE);
          }}
        />
        <h3>색상 선택</h3>
        <ColorPickerWrapper>
          <CirclePicker
            color={color}
            onChange={(value) => setColor(value.hex)}
          />
        </ColorPickerWrapper>
        <Button
          value="생성하기"
          onClick={async (e) => {
            e.preventDefault();
            await createOperationEvent();
          }}
        />
        <Message>{message}</Message>
      </CreateOperationFormWrapper>
    </>
  );
};

export default CreateOperationForm;

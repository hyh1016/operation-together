import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CirclePicker } from 'react-color';
import Select from 'react-select';
import { ERROR } from '@/utils/message';
import { sendPostRequest, sendPutRequest } from '@/utils/request';
import { useHistory } from 'react-router-dom';
import { Operation, User } from '@/interfaces';
import Button from './Button';

const SaveOperationFormWrapper = styled.form`
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

const SelectWrapper = styled.div`
  width: 80%;
  margin: 0.5rem auto;
  color: ${(props) => props.theme.mainColor};
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

interface Props {
  isCreate: boolean;
  operation?: Operation;
}

interface Option {
  value: string;
  label: string;
}

const SaveOperationForm: React.FC<Props> = ({ isCreate, operation }) => {
  const today = new Date().toISOString().split('T')[0];
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [color, setColor] = useState('');
  const [message, setMessage] = useState('');

  const [selected, setSelected] = useState<Option | undefined>(
    operation
      ? {
          value: operation.adminId,
          label: operation.adminId,
        }
      : undefined,
  );
  const options = operation
    ? operation.users?.map((user: User) => ({
        value: user.id,
        label: user.nickname,
      }))
    : undefined;

  useEffect(() => {
    if (!operation) return;
    setTitle(operation?.title);
    setCode(operation.code);
    setStartDate(operation.startDate);
    setEndDate(operation.endDate);
    setColor(operation.color);
  }, []);

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
    if (!localStorage.getItem('token')) {
      alert(ERROR.NOT_VALID_TOKEN);
      history.push('/login');
      return;
    }
    const { result, error } = await sendPostRequest('/operations', {
      title,
      code,
      startDate,
      endDate,
      color,
    });
    if (error) {
      setMessage(ERROR.OPERATION_CREATE_FAILED);
      return;
    }
    const { operationId } = result;
    history.push(`/operations/${operationId}`);
  };

  const updateOperationEvent = async () => {
    if (!isValidForm()) return;
    if (!localStorage.getItem('token')) {
      alert(ERROR.NOT_VALID_TOKEN);
      history.push('/login');
      return;
    }
    const { result, error } = await sendPutRequest(
      `/operations/${operation?.id}`,
      {
        title,
        code,
        startDate,
        endDate,
        color,
        adminId: selected?.value,
      },
    );
    if (error) {
      setMessage(ERROR.OPERATION_UPDATE_FAILED);
      return;
    }
    window.location.reload();
  };

  return (
    <>
      <h1>작전 {isCreate ? '생성' : '수정'}</h1>
      <SaveOperationFormWrapper>
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
        {!isCreate ? (
          <>
            <h3>관리자 변경</h3>
            <SelectWrapper>
              <Select
                options={options}
                value={selected}
                onChange={(value) => setSelected(value as Option)}
              />
            </SelectWrapper>
          </>
        ) : undefined}
        <h3>색상 선택</h3>
        <ColorPickerWrapper>
          <CirclePicker
            color={color}
            onChange={(value) => setColor(value.hex)}
          />
        </ColorPickerWrapper>
        <Button
          value={isCreate ? '생성하기' : '수정하기'}
          onClick={async (e) => {
            e.preventDefault();
            if (isCreate) await createOperationEvent();
            else await updateOperationEvent();
          }}
        />
        <Message>{message}</Message>
      </SaveOperationFormWrapper>
    </>
  );
};

export default SaveOperationForm;

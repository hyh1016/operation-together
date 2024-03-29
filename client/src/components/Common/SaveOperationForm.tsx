import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Select from 'react-select';
import { CirclePicker } from 'react-color';
import { ERROR } from '@/utils/message';
import { sendPostRequest, sendPutRequest } from '@/utils/request';
import { Operation, User } from '@/interfaces';
import Form from '@/components/Common/Form';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useUserDispatch } from '@/contexts/UserContext';
import {
  useOperation,
  useOperationDispatch,
} from '@/contexts/OperationContext';
import getToday from '@/utils/getToday';

const SelectWrapper = styled.div`
  width: 80%;
  margin: 0.5rem auto;
  color: ${(props) => props.theme.mainColor};
`;

const ColorPickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0.5rem auto;
`;

interface Props {
  isCreate: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Option {
  value: string;
  label: string;
}

const SaveOperationForm: React.FC<Props> = ({ isCreate, setVisible }) => {
  const today = getToday();
  const history = useHistory();
  const userDispatch = useUserDispatch();

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [color, setColor] = useState('');
  const [message, setMessage] = useState('');

  const operation = isCreate ? undefined : useOperation();
  const operationDispatch = isCreate ? undefined : useOperationDispatch();

  const [options, setOptions] = useState<Option[] | undefined>();
  const [selected, setSelected] = useState<Option | undefined>();

  useEffect(() => {
    if (isCreate || !operation) return;
    setTitle(operation.title);
    setCode(operation.code);
    setStartDate(operation.startDate);
    setEndDate(operation.endDate);
    setColor(operation.color);
    setOptions(
      operation.users?.map((user: User) => ({
        value: user.id,
        label: user.nickname,
      })),
    );
    const admin = operation.users?.filter(
      (user: User) => user.id === operation.adminId,
    )[0];
    setSelected({
      value: admin?.id as string,
      label: admin?.nickname as string,
    });
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
      setMessage(ERROR.OPERATION_CREATE_FAILED);
      return;
    }
    userDispatch({ type: 'ADD_OPERATION', operation: result.operation });
    history.push(`/operations/${result.operation.id}`);
  };

  const updateOperationEvent = async () => {
    if (!isValidForm()) return;
    if (!operation || !operationDispatch) return;
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
    const newOperation: Operation = {
      ...operation,
      title,
      code,
      startDate,
      endDate,
      color,
      adminId: selected?.value as string,
    };
    userDispatch({
      type: 'UPDATE_OPERATION',
      operation: newOperation,
    });
    operationDispatch({
      type: 'SET_OPERATION',
      operation: newOperation,
    });
    if (setVisible) setVisible(false);
  };

  return (
    <Form title={`작전 ${isCreate ? '생성' : '수정'}`} message={message}>
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
        <CirclePicker color={color} onChange={(value) => setColor(value.hex)} />
      </ColorPickerWrapper>
      <Button
        value={isCreate ? '생성하기' : '수정하기'}
        onClick={async () => {
          if (isCreate) await createOperationEvent();
          else await updateOperationEvent();
        }}
      />
    </Form>
  );
};

export default SaveOperationForm;

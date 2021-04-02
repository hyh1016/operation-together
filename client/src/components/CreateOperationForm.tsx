import theme from '@/style/theme';
import React, { useState } from 'react';
import styled from 'styled-components';
import { CirclePicker } from 'react-color';
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

const CreateOperationForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [color, setColor] = useState(theme.highlightColor);

  return (
    <>
      <h1>작전 생성</h1>
      <CreateOperationFormWrapper>
        <Input
          type="text"
          value={title}
          placeholder="작전명을 입력해주세요."
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          value={password}
          placeholder="암호를 설정해주세요. (필수 X)"
          onChange={(e) => setPassword(e.target.value)}
        />
        <h3>시작 날짜</h3>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <h3>종료 날짜</h3>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <h3>색상 선택</h3>
        <ColorPickerWrapper>
          <CirclePicker
            color={color}
            onChange={(value) => setColor(value.hex)}
          />
        </ColorPickerWrapper>
        <Button value="생성하기" />
      </CreateOperationFormWrapper>
    </>
  );
};

export default CreateOperationForm;

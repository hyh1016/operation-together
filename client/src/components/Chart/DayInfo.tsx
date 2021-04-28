import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import Form from '@/components/Common/Form';
import getKoDay from '@/utils/getKoDay';
import { sendGetRequest, sendPostRequest } from '@/utils/request';
import { useOperation } from '@/contexts/OperationContext';
import { useUser } from '@/contexts/UserContext';
import { ERROR } from '@/utils/message';
import getToday from '@/utils/getToday';

const DayInfoWrapper = styled.div`
  width: 80%;
  height: 70vh;
  background-color: rgba(30, 30, 30, 0.7);

  Button {
    width: 40%;
  }

  #check-button {
    margin-top: 3rem;
    @media (max-width: 700px) {
      width: 80%;
    }
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const DayInfoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckedUserWrapper = styled.ul`
  text-align: center;
  color: ${(props) => props.theme.highlightColor};

  p {
    font-size: 1rem;
  }
`;

const UserWrapper = styled.li<{ index: number }>`
  list-style-type: none;
  font-size: 2rem;
  color: ${(props) =>
    props.index === 0
      ? 'gold'
      : props.index === 1
      ? 'silver'
      : props.index === 2
      ? 'sienna'
      : undefined};
`;

const Medal = styled.span<{ index: number }>`
  display: inline-block;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 100%;
  background-color: ${(props) =>
    props.index === 0
      ? 'gold'
      : props.index === 1
      ? 'silver'
      : props.index === 2
      ? 'sienna'
      : undefined};
  color: ${(props) => props.theme.mainColor};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;

  Button {
    width: 100px;
  }
`;

interface Props {
  selectedDay: string;
  setSelectedDay: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface ChartData {
  id: string;
  nickname: string;
}

const DayInfo: React.FC<Props> = ({ selectedDay, setSelectedDay }) => {
  const operation = useOperation();
  const user = useUser();
  const [checkedUsers, setCheckedUsers] = useState<ChartData[] | undefined>();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (operation.id === 0) return;
    if (selectedDay > operation.endDate) {
      setSelectedDay(undefined);
      return;
    }
    const fetch = async () => {
      const { result, error } = await sendGetRequest(
        `/charts/${operation.id}/${selectedDay}`,
      );
      if (error) return;
      setCheckedUsers(result.users);
    };
    fetch();
  }, [operation]);

  const openCheckModalEvent = () => {
    if (!checkedUsers) return;
    if (checkedUsers.filter((v) => v.id === user.id).length > 0) {
      alert(ERROR.ALREADY_CHECKED);
      return;
    }
    setVisible(!visible);
  };

  const checkEvent = async () => {
    const { result, error } = await sendPostRequest('/charts/', {
      operationId: operation.id,
    });
    if (error) {
      setMessage(ERROR.CHECKED_ERROR);
      return;
    }
    checkedUsers?.push({ id: user.id, nickname: user.nickname });
    setVisible(false);
  };

  return (
    <>
      <DayInfoWrapper>
        <DayInfoTitle>
          <h2>{`${selectedDay} (${getKoDay(selectedDay)})`}</h2>
          <Button
            value="전체 일자 보기"
            onClick={() => setSelectedDay(undefined)}
          />
        </DayInfoTitle>
        <CheckedUserWrapper>
          {checkedUsers && checkedUsers.length > 0 ? (
            checkedUsers?.map((v, index) => (
              <UserWrapper key={index} index={index}>
                {index <= 2 ? (
                  <Medal index={index}>{index + 1}</Medal>
                ) : undefined}{' '}
                {v.nickname}
              </UserWrapper>
            ))
          ) : (
            <p>아직 아무도 작전을 완수하지 못했습니다.</p>
          )}
        </CheckedUserWrapper>
        {selectedDay === getToday() ? (
          <Button
            value="체크하기"
            id="check-button"
            onClick={openCheckModalEvent}
          />
        ) : undefined}
      </DayInfoWrapper>
      <Modal visible={visible} setVisible={setVisible}>
        <Form message={message}>
          <h2>오늘의 작전을 완수하시겠습니까?</h2>
          <ButtonWrapper>
            <Button
              value="예"
              onClick={async () => {
                await checkEvent();
              }}
            />
            <Button value="아니오" onClick={() => setVisible(!visible)} />
          </ButtonWrapper>
        </Form>
      </Modal>
    </>
  );
};

export default DayInfo;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/Common/Button';
import getKoDay from '@/utils/getKoDay';
import { sendGetRequest } from '@/utils/request';
import { useOperation } from '@/contexts/OperationContext';

const DayInfoWrapper = styled.div`
  width: 80%;
  background-color: rgba(30, 30, 30, 0.7);
`;

const DayInfoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  Button {
    width: 100%;
  }
`;

const CheckedUserWrapper = styled.ul`
  text-align: center;
  color: ${(props) => props.theme.highlightColor};
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
  width: 50px;
  height: 50px;
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

interface Props {
  selectedDay: string;
  setSelectedDay: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const DayInfo: React.FC<Props> = ({ selectedDay, setSelectedDay }) => {
  const operation = useOperation();
  const [checkedUsers, setCheckedUsers] = useState<string[] | undefined>();

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

  return (
    <>
      <DayInfoWrapper>
        <DayInfoTitle>
          <h2>{`${selectedDay} (${getKoDay(selectedDay)}) 작전 현황표`}</h2>
          <Button
            value="전체 일자 보기"
            onClick={() => setSelectedDay(undefined)}
          />
        </DayInfoTitle>
        <CheckedUserWrapper>
          {checkedUsers?.map((nickname, index) => (
            <UserWrapper key={index} index={index}>
              {index <= 2 ? (
                <Medal index={index}>{index + 1}</Medal>
              ) : undefined}{' '}
              {nickname}
            </UserWrapper>
          ))}
        </CheckedUserWrapper>
      </DayInfoWrapper>
    </>
  );
};

export default DayInfo;

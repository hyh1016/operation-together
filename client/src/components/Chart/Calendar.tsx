import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useOperation } from '@/contexts/OperationContext';
import Button from '@/components/Common/Button';
import getKoDay from '@/utils/getKoDay';
import getToday from '@/utils/getToday';

const CalendarWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  align-content: flex-start;
  width: 80%;
  height: 70vh;
  background-color: rgba(30, 30, 30, 0.7);
  color: ${(props) => props.theme.mainColor};
  list-style-type: none;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const DayTitle = styled.li`
  width: 14%;
`;

const DayList = styled.li`
  width: 14%;
  Button {
    width: 100%;
    border-radius: 0;
    * {
      font-size: 1rem;
    }
  }

  .empty-button {
    cursor: unset;
  }

  .day-button {
    height: 100%;
  }
`;

interface Props {
  setSelectedDay: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface Day {
  today: string;
  startFrom: number;
}

const Calendar: React.FC<Props> = ({ setSelectedDay }) => {
  const operation = useOperation();
  const [days, setDays] = useState<Day[] | undefined>();

  useEffect(() => {
    const { startDate, endDate } = operation;
    if (!startDate || !endDate) return;
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const diff = end.diff(start, 'day');
    const allDay = Array.from(Array(diff + 1).keys());
    setDays(
      allDay.map((v) => ({
        today: start.add(v, 'day').locale('ko').format('YYYY-MM-DD'),
        startFrom: v + 1,
      })),
    );
  }, [operation]);

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const emptySpace = days
    ? Array.from(Array(week.indexOf(getKoDay(days[0].today) as string)).keys())
    : undefined;
  return (
    <>
      <CalendarWrapper>
        {week.map((v) => (
          <DayTitle key={v}>{v}</DayTitle>
        ))}
        {emptySpace
          ? emptySpace.map((v) => (
              <DayList key={v}>
                <Button
                  className="empty-button"
                  backgroundColor="inherit"
                  border={false}
                />
              </DayList>
            ))
          : undefined}
        {days?.map((v) => (
          <DayList key={v.startFrom}>
            <Button
              className="day-button"
              backgroundColor={v.today === getToday() ? undefined : 'inherit'}
              color={v.today === getToday() ? '#222' : '#aaa'}
              value={
                <>
                  <p>{`${v.today} (${getKoDay(v.today)})`}</p>
                  <p>{`D-${v.startFrom}`}</p>
                </>
              }
              onClick={() => setSelectedDay(v.today)}
            />
          </DayList>
        ))}
      </CalendarWrapper>
    </>
  );
};

export default Calendar;

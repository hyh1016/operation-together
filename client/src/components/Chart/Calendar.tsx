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
  width: 80%;
  background-color: rgba(30, 30, 30, 0.7);
  color: ${(props) => props.theme.mainColor};
`;

const DayList = styled.li`
  width: 14%;
  list-style-type: none;

  Button {
    width: 100%;
    font-size: 1rem;
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

  return (
    <>
      <CalendarWrapper>
        {days?.map((v) => (
          <DayList key={v.startFrom}>
            <Button
              backgroundColor={v.today === getToday() ? undefined : '#ccc'}
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

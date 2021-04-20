import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useOperation } from '@/contexts/OperationContext';

const CalendarWrapper = styled.div`
  width: 80%;
  background-color: rgba(255, 255, 255, 0.6);
  color: ${(props) => props.theme.mainColor};
`;

interface Day {
  today: string;
  startFrom: number;
}

const Calendar: React.FC = () => {
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
        today: start.add(v, 'day').format('YYYY-MM-DD'),
        startFrom: v + 1,
      })),
    );
  }, [operation]);

  return (
    <>
      <CalendarWrapper>
        {days?.map((v) => (
          <div key={v.startFrom}>
            {v.today} Day {v.startFrom}
          </div>
        ))}
      </CalendarWrapper>
    </>
  );
};

export default Calendar;

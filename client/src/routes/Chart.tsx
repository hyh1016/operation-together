import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/Common/Header';
import Title from '@/components/Chart/Titlte';
import Calendar from '@/components/Chart/Calendar';
import UserList from '@/components/Chart/UserList';
import { OperationContextProvider } from '@/contexts/OperationContext';
import getToday from '@/utils/getToday';
import DayInfo from '@/components/Chart/DayInfo';

const ChartWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;

  & > * {
    max-height: 80vh;
    overflow: auto;
    padding: 1rem;
    text-align: center;
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Chart: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | undefined>(
    getToday(),
  );

  return (
    <>
      <OperationContextProvider>
        <Header />
        <ChartWrapper>
          <Title />
          <ContentWrapper>
            {selectedDay ? (
              <DayInfo
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            ) : (
              <Calendar setSelectedDay={setSelectedDay} />
            )}
            <UserList />
          </ContentWrapper>
        </ChartWrapper>
      </OperationContextProvider>
    </>
  );
};

export default Chart;

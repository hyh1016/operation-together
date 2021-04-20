import React from 'react';
import styled from 'styled-components';
import Header from '@/components/Common/Header';
import Title from '@/components/Chart/Titlte';
import Calendar from '@/components/Chart/Calendar';
import UserList from '@/components/Chart/UserList';
import { OperationContextProvider } from '@/contexts/OperationContext';

const ChartWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;

  & > * {
    padding: 1rem;
    text-align: center;
    /* color: ${(props) => props.theme.mainColor}; */
  }
`;

const Chart: React.FC = () => {
  return (
    <>
      <OperationContextProvider>
        <Header />
        <ChartWrapper>
          <Title />
          <ContentWrapper>
            <Calendar />
            <UserList />
          </ContentWrapper>
        </ChartWrapper>
      </OperationContextProvider>
    </>
  );
};

export default Chart;

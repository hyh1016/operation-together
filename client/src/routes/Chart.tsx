import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Operation } from '@/interfaces';
import Header from '@/components/Common/Header';
import Title from '@/components/Chart/Titlte';
import { sendGetRequest } from '@/utils/request';

const ChartWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

interface MatchParameter {
  id: string;
}

const Chart: React.FC = () => {
  const match = useRouteMatch<MatchParameter>();
  const { id } = match.params;

  const [operation, setOperation] = useState<Operation | undefined>();

  useEffect(() => {
    const fetch = async () => {
      const { result, error } = await sendGetRequest(`/operations/${id}`);
      if (error) return;
      setOperation(result.operation);
    };
    fetch();
  }, []);

  return (
    <>
      <Header />
      <ChartWrapper>
        {operation ? (
          <Title operation={operation} setOperation={setOperation} />
        ) : undefined}
      </ChartWrapper>
    </>
  );
};

export default Chart;

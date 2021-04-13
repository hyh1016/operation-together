import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Operation, User } from '@/interfaces';
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
  const history = useHistory();
  const match = useRouteMatch<MatchParameter>();
  const { id } = match.params;

  const [operation, setOperation] = useState<Operation | undefined>();
  const [me, setMe] = useState<User | undefined>();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.replace('/login');
      return;
    }
    const fetchOperation = async () => {
      const { result, error } = await sendGetRequest(`/operations/${id}`);
      if (!result) return;
      setOperation(result.operation);
    };
    const fetchMe = async () => {
      const { result, error } = await sendGetRequest('/users/me');
      if (!result) return;
      setMe(result.me);
    };
    fetchOperation();
    fetchMe();
  }, []);

  return (
    <>
      <Header />
      <ChartWrapper>
        {operation && me ? (
          <Title operation={operation} setOperation={setOperation} me={me} />
        ) : undefined}
      </ChartWrapper>
    </>
  );
};

export default Chart;

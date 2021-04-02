import { sendGetRequest } from '@/utils/request';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Operation from './Operation';

const ListWrapper = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 2rem;
`;

interface OperaitonProps {
  id: number;
  title: string;
  color: string;
}

const OperationList: React.FC = () => {
  const [operations, setOperations] = useState<OperaitonProps[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetch = async () => {
      if (!operations) {
        const { result } = await sendGetRequest('/operations');
        if (!result) return;
        setOperations(result.operations);
      }
    };
    fetch();
  }, []);

  return (
    <ListWrapper>
      <Title>작전 목록</Title>
      {operations &&
        operations.map((v) => (
          <Operation key={v.id} id={v.id} title={v.title} color={v.color} />
        ))}
    </ListWrapper>
  );
};

export default OperationList;

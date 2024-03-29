import React from 'react';
import styled from 'styled-components';
import { useUser } from '@/contexts/UserContext';
import OperationButton from './OperationButton';

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

const OperationList: React.FC = () => {
  const { operations } = useUser();

  return (
    <ListWrapper>
      <Title>작전 목록</Title>
      {operations
        ? operations.map((v) => (
            <OperationButton
              key={v.id}
              id={v.id}
              title={v.title}
              color={v.color}
            />
          ))
        : undefined}
    </ListWrapper>
  );
};

export default OperationList;

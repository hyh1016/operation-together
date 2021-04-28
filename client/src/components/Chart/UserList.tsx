import React from 'react';
import styled from 'styled-components';
import { useUser } from '@/contexts/UserContext';
import { useOperation } from '@/contexts/OperationContext';

const UserListWrapper = styled.div`
  width: 20%;
  background-color: rgba(255, 255, 255, 0.4);

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const UserTitle = styled.h2`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.mainColor};
`;

const UserWrapper = styled.li`
  margin: 1rem;
  list-style-type: none;
  color: ${(props) => props.theme.mainColor};
  font-size: 1.5rem;
`;

const Badge = styled.span`
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.highlightColor};
  padding: 0.3rem;
  border-radius: 12px;
`;

const UserList: React.FC = () => {
  const operation = useOperation();
  const me = useUser();

  return (
    <>
      <UserListWrapper>
        <UserTitle>작전 참여자</UserTitle>
        <ul>
          {operation.users?.map((user) => (
            <UserWrapper key={user.id}>
              {user.nickname}{' '}
              {user.id === me.id ? <Badge>me</Badge> : undefined}{' '}
              {operation.adminId === user.id ? <Badge>admin</Badge> : undefined}
            </UserWrapper>
          ))}
        </ul>
      </UserListWrapper>
    </>
  );
};

export default UserList;

import React from 'react';
import styled from 'styled-components';

const UserInfoWrapper = styled.div`
  width: 70%;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 3rem;
  color: ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.highlightColor};
  border: 20px solid ${(props) => props.theme.mainColor};
  border-radius: 60px;
  border-style: double;
  font-size: 2rem;
`;

const UserInfo: React.FC = () => {
  return (
    <UserInfoWrapper>
      <p>사용자 이름</p>
      <p>현재까지 참여한 작전 수</p>
      <p>또 뭐 넣지?</p>
    </UserInfoWrapper>
  );
};

export default UserInfo;

import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.highlightColor};
  text-align: center;
`;

const TitleButton = styled.button`
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.highlightColor};
  border: none;
  outline: none;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  position: absolute;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.highlightColor};
  margin: 0.5rem;
  left: 100%;
  transform: translate(-140%);
  border: none;
  outline: none;
  cursor: pointer;
`;

const Header: React.FC = () => {
  const history = useHistory();

  return (
    <HeaderWrapper>
      <TitleButton
        onClick={() => {
          if (history.location.pathname === '/main') return;
          if (history.location.pathname === '/') return;
          history.push('/main');
        }}
      >
        <h1>작전명 투게더</h1>
      </TitleButton>
      {localStorage.getItem('token') ? (
        <LogoutButton
          onClick={() => {
            localStorage.removeItem('token');
            history.push('/');
          }}
        >
          <h2>로그아웃</h2>
        </LogoutButton>
      ) : undefined}
    </HeaderWrapper>
  );
};

export default Header;

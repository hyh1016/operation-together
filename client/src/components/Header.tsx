import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.highlightColor};
  text-align: center;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <h1>작전명 투게더</h1>
    </HeaderWrapper>
  );
};

export default Header;

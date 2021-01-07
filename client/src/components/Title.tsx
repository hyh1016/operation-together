import React from 'react';
import styled from 'styled-components';
import theme from '../style/theme';
import Button from './Button';

const TitleWrapper = styled.div`
  width: 35%;
  min-width: 300px;
  margin: 5rem auto;
  text-align: center;
`;

const Logo = styled.div`
  width: 250px;
  height: 250px;
  margin: 2rem auto;
  padding: 120px 0;
  border-radius: 100%;
  background-color: #fff;
  color: ${(props) => props.theme.mainColor};
`;

const Title: React.FC = () => {
  return (
    <TitleWrapper>
      <Logo>여기에 로고 넣기</Logo>
      <Button value="회원가입" color={theme.mainColor} />
      <Button value="로그인" color={theme.highlightColor} />
    </TitleWrapper>
  );
};

export default Title;

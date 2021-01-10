import React from 'react';
import styled from 'styled-components';
import theme from '../style/theme';
import Button from './Button';
import logo from '../images/logo.png';

const TitleWrapper = styled.div`
  width: 35%;
  min-width: 300px;
  margin: 5rem auto;
  text-align: center;
`;

const LogoWrapper = styled.div`
  width: 250px;
  height: 250px;
  margin: 2rem auto;
  border-radius: 50%;
  background-color: #fff;
  color: ${(props) => props.theme.mainColor};
`;

const LogoImage = styled.img`
  width: 90%;
  height: 90%;
  background: none;
`;

const Title: React.FC = () => {
  return (
    <TitleWrapper>
      <LogoWrapper>
        <LogoImage src={logo} alt="logo" />
      </LogoWrapper>
      <Button value="회원가입" color={theme.mainColor} />
      <Button value="로그인" color={theme.highlightColor} />
    </TitleWrapper>
  );
};

export default Title;

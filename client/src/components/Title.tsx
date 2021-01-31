import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../style/theme';
import Button from './Button';
import Modal from './Modal';
import logo from '../images/logo.png';
import JoinForm from './JoinForm';
import LoginForm from './LoginForm';

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
  const [visible, setVisible] = useState(false);
  const [isJoin, setIsJoin] = useState(true);

  return (
    <>
      <TitleWrapper>
        <LogoWrapper>
          <LogoImage src={logo} alt="logo" />
        </LogoWrapper>
        <Button
          value="회원가입"
          color={theme.mainColor}
          onClick={() => {
            setVisible(!visible);
            setIsJoin(true);
          }}
        />
        <Button
          value="로그인"
          color={theme.highlightColor}
          onClick={() => {
            setVisible(!visible);
            setIsJoin(false);
          }}
        />
      </TitleWrapper>
      <Modal visible={visible} setVisible={setVisible}>
        {isJoin ? <JoinForm /> : <LoginForm />}
      </Modal>
    </>
  );
};

export default Title;

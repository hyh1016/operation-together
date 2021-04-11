import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/style/theme';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import logo from '@/images/logo.png';
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
          backgroundColor={theme.highlightColor}
          color={theme.mainColor}
          onClick={() => {
            setIsJoin(true);
            setVisible(!visible);
          }}
        />
        <Button
          value="로그인"
          backgroundColor={theme.mainColor}
          color={theme.highlightColor}
          onClick={() => {
            setIsJoin(false);
            setVisible(!visible);
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

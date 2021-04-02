import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import UserInfo from '@/components/UserInfo';
import OperationList from '@/components/OperationList';
import Button from '@/components/Button';
import theme from '@/style/theme';
import Modal from '@/components/Modal';
import JoinOperationForm from '@/components/JoinOperationForm';
import CreateOperationForm from '@/components/CreateOperationForm';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 80vh;
  margin: 0 auto;
  border-right: 1px solid ${(props) => props.theme.highlightColor};
  text-align: center;
`;

const ButtonWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const RightWrapper = styled.div`
  width: 50%;
  height: 80vh;
  margin: 0 auto;
  text-align: center;
`;

const Main: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  return (
    <>
      <Header />
      <ContentWrapper>
        <LeftWrapper>
          <UserInfo />
          <ButtonWrapper>
            <Button
              value="새 작전 만들기"
              onClick={() => {
                setIsJoin(false);
                setVisible(!visible);
              }}
            />
            <Button
              value="작전 참여하기"
              backgroundColor={theme.mainColor}
              color={theme.highlightColor}
              onClick={() => {
                setIsJoin(true);
                setVisible(!visible);
              }}
            />
          </ButtonWrapper>
        </LeftWrapper>
        <RightWrapper>
          <OperationList />
        </RightWrapper>
      </ContentWrapper>
      <Modal visible={visible} setVisible={setVisible}>
        {isJoin ? <JoinOperationForm /> : <CreateOperationForm />}
      </Modal>
    </>
  );
};

export default Main;

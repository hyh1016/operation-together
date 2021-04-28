import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/style/theme';
import Header from '@/components/Common/Header';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import UserCard from '@/components/Operation/UserCard';
import OperationList from '@/components/Operation/OperationList';
import JoinOperationForm from '@/components/Operation/JoinOperationForm';
import SaveOperationForm from '@/components/Common/SaveOperationForm';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 700px) {
    flex-direction: column;
  }
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

  @media (max-width: 700px) {
    width: 90%;
    height: fit-content;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.highlightColor};
  }
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

  @media (max-width: 700px) {
    width: 90%;
  }
`;

const Home: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  return (
    <>
      <Header />
      <ContentWrapper>
        <LeftWrapper>
          <UserCard />
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
        {isJoin ? <JoinOperationForm /> : <SaveOperationForm isCreate={true} />}
      </Modal>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import theme from '@/style/theme';
import { User } from '@/interfaces';
import { sendGetRequest } from '@/utils/request';
import Header from '@/components/Common/Header';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import UserCard from '@/components/Operation/UserCard';
import OperationList from '@/components/Operation/OperationList';
import JoinOperationForm from '@/components/Operation/JoinOperationForm';
import SaveOperationForm from '@/components/Operation/SaveOperationForm';

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

const Home: React.FC = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [me, setMe] = useState<User | undefined>();

  useEffect(() => {
    if (!localStorage.getItem('token')) history.replace('/login');
    const fetch = async () => {
      const { result, error } = await sendGetRequest('/users/me');
      if (error) {
        console.log(error);
        return;
      }
      setMe(result.me);
    };
    fetch();
  }, []);

  return (
    <>
      <Header />
      <ContentWrapper>
        <LeftWrapper>
          <UserCard me={me} setMe={setMe} />
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
          <OperationList operations={me?.operations} />
        </RightWrapper>
      </ContentWrapper>
      <Modal visible={visible} setVisible={setVisible}>
        {isJoin ? <JoinOperationForm /> : <SaveOperationForm isCreate={true} />}
      </Modal>
    </>
  );
};

export default Home;

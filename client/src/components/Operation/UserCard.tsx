import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { sendPutRequest } from '@/utils/request';
import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import { useUser, useUserDispatch } from '@/contexts/UserContext';

const CardWrapper = styled.div`
  width: 80%;
  height: fit-content;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  padding: 1rem;
  color: ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.highlightColor};
  border-radius: 24px;
  font-size: 1.5rem;
`;

const InformationWrapper = styled.div`
  margin: 1rem;
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin: 1rem 0;
  padding: 0 2rem;
  background-color: #fff;
  border-radius: 12px;
  Input {
    width: 50%;
    margin: 0;
    padding: 0;
    font-size: 1.5rem;

    @media (max-width: 1250px) {
      width: 100%;
    }
  }
  Button {
    width: fit-content;
    min-width: 60px;
    border: none;
    border-bottom: 1px solid black;
    border-radius: 0%;
    background-color: inherit;
  }

  @media (max-width: 1250px) {
    display: block;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const UserCard: React.FC = () => {
  const user = useUser();
  const userDispatch = useUserDispatch();
  const [isModify, setIsModify] = useState(false);
  const [nickname, setNickname] = useState<string>(user.nickname);

  useEffect(() => {
    setNickname(user.nickname);
  }, [user]);

  const isValidNickname = () => {
    if (nickname[0] === ' ') return false;
    if (nickname.length < 1 || nickname.length > 10) return false;
    return true;
  };

  const changeNickname = async () => {
    const { result, error } = await sendPutRequest('/users', { nickname });
    if (error) return;
    userDispatch({ type: 'SET_NICKNAME', nickname });
    setIsModify(false);
  };

  return (
    <CardWrapper>
      <h2>Member Card</h2>
      <InformationWrapper>
        <NameWrapper>
          {isModify ? (
            <>
              <Input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                autoFocus={true}
                maxLength={10}
              />
              <ButtonWrapper>
                <Button
                  value="취소"
                  onClick={() => {
                    setIsModify(false);
                    setNickname(user.nickname);
                  }}
                />
                <Button
                  value="변경"
                  onClick={async () => {
                    if (!isValidNickname()) return;
                    await changeNickname();
                  }}
                />
              </ButtonWrapper>
            </>
          ) : (
            <>
              <p>{user.nickname}</p>
              <Button value="변경하기" onClick={() => setIsModify(true)} />
            </>
          )}
        </NameWrapper>
        <p>Participated: {user.operations?.length}</p>
        <p>Rank: {getRank(user.operations?.length)}</p>
      </InformationWrapper>
    </CardWrapper>
  );
};

const getRank = (length: number | undefined) => {
  if (!length) return 'No Rank';
  if (length > 30) return 'Master';
  if (length > 20) return 'Expert';
  return 'Junior';
};

export default UserCard;

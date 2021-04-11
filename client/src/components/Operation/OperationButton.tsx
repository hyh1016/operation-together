import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@/components/Common/Button';

interface Props {
  id: number;
  title: string;
  color: string;
}

const OperationButton: React.FC<Props> = ({ id, title, color }) => {
  const history = useHistory();

  return (
    <Button
      backgroundColor={color}
      color={'black'}
      border={false}
      value={`#${id} ${title}`}
      onClick={() => {
        history.push(`/operations/${id}`);
      }}
    />
  );
};

export default OperationButton;

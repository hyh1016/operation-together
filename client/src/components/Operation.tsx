import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

interface OperationProps {
  id: number;
  title: string;
  color: string;
}

const Operation: React.FC<OperationProps> = ({ id, title, color }) => {
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

export default Operation;

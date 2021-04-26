import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '@/components/Common/Header';
import Title from '@/components/Login/Title';

const Login: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token')) history.replace('/main');
  }, []);

  return (
    <div>
      <Header />
      <Title />
    </div>
  );
};

export default Login;

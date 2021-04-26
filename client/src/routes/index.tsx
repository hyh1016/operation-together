import React from 'react';
import { Route } from 'react-router-dom';
import { UserContextProvider } from '@/contexts/UserContext';
import Login from './Login';
import Home from './Home';
import Chart from './Chart';

const Routes: React.FC = () => {
  return (
    <>
      <UserContextProvider>
        <Route exact path="/" component={Login} />
        <Route exact path="/main" component={Home} />
        <Route exact path="/operations/:id" component={Chart} />
      </UserContextProvider>
    </>
  );
};

export default Routes;

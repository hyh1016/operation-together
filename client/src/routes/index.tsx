import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

const Routes: React.FC = () => {
  return (
    <>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
    </>
  );
};

export default Routes;

import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Main from './Main';

const Routes: React.FC = () => {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/main" component={Main} />
    </>
  );
};

export default Routes;

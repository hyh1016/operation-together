import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';

const Routes: React.FC = () => {
  return (
    <>
      <Route exact path="/" component={Home} />
    </>
  );
};

export default Routes;

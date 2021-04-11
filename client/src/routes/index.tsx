import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Chart from './Chart';

const Routes: React.FC = () => {
  return (
    <>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/operations/:id" component={Chart} />
    </>
  );
};

export default Routes;

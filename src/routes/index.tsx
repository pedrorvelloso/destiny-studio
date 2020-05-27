import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from 'pages/Login';

import Dashboard from 'pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/login" component={Login} />
  </Switch>
);

export default Routes;

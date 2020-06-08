import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from 'pages/Login';

import Dashboard from 'pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/" component={Dashboard} />
  </Switch>
);

export default Routes;

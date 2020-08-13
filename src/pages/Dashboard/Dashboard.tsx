import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import PrivateRoute from 'routes/PrivateRoute';

import { Container } from './styles';
import Home from './pages/Home';
import Allocate from './pages/Allocate';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute exact path="/allocate/:id" component={Allocate} />
      </Switch>
    </Container>
  );
};

export default Dashboard;

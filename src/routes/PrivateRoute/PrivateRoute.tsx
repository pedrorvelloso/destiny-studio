import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'modules/AuthManager';

interface PrivateRouteProps {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component,
  path,
  exact = false,
}) => {
  const { user } = useAuth();

  if (!user) return <Redirect to="/" />;

  return <Route component={component} path={path} exact={exact} />;
};

export default PrivateRoute;

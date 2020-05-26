import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'store';

import { SocketProvider } from './SocketManager';

const AppProviders: React.FC = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <SocketProvider host="http://localhost:3333">{children}</SocketProvider>
    </ReduxProvider>
  );
};

export default AppProviders;

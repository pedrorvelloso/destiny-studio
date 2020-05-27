import React from 'react';

import { SocketProvider } from './SocketManager';

const AppProviders: React.FC = ({ children }) => {
  return (
    <SocketProvider host="http://localhost:3333">{children}</SocketProvider>
  );
};

export default AppProviders;

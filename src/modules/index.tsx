import React from 'react';

import { SocketProvider } from './SocketManager';
import { AuthProvider } from './AuthManager';

const AppProviders: React.FC = ({ children }) => {
  return (
    <SocketProvider host="http://localhost:3333">
      <AuthProvider>{children}</AuthProvider>
    </SocketProvider>
  );
};

export default AppProviders;

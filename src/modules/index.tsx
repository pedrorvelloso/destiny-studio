import React from 'react';

import { SocketProvider } from './SocketManager';
import { AuthProvider } from './AuthManager';
import { ToastProvider } from './ToastManager';

const AppProviders: React.FC = ({ children }) => {
  return (
    <SocketProvider host={`http://${process.env.REACT_APP_API}:3333`}>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </SocketProvider>
  );
};

export default AppProviders;

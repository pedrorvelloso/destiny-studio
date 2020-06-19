import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import destiny from 'services/destiny';

import { useAuth } from './AuthManager';
import { useToast } from './ToastManager';

interface DestinyError extends Error {
  response: {
    data: {
      status: 'error';
      message: string;
    };
    status: number;
    statusText: string;
  };
}

const DestinyManager: React.FC = ({ children }) => {
  const history = useHistory();
  const { signOut } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    destiny.interceptors.response.use(
      (response) => response,
      (error: DestinyError) => {
        if (error.response.status === 401) {
          signOut();
          history.push('/login');
          addToast({
            title: 'You must be logged in to perform this action',
            type: 'warn',
          });
        }

        return Promise.reject(error);
      },
    );
  }, [addToast, history, signOut]);

  return <>{children}</>;
};

export default DestinyManager;

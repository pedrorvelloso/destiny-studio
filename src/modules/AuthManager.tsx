import React from 'react';
import destiny from 'services/destiny';
import { STORAGE } from 'utils/localStorage';

interface AuthContextData {
  signIn(data: { email: string; password: string }): Promise<void>;
  signOut(): void;
  user: {
    name: string;
  };
}

interface AuthState {
  token: string;
  user: {
    name: string;
  };
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = React.useState<AuthState>(() => {
    const token = localStorage.getItem(STORAGE.JWT);
    const user = localStorage.getItem(STORAGE.USER);

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = React.useCallback(
    async (login: { email: string; password: string }) => {
      const { data: response } = await destiny.post('/auth', login);
      localStorage.setItem(STORAGE.JWT, response.token);
      localStorage.setItem(STORAGE.USER, JSON.stringify(response.user));

      destiny.defaults.headers.authorization = `Bearer ${response.token}`;

      setData({ token: response.token, user: response.user });
    },
    [],
  );

  const signOut = React.useCallback(() => {
    localStorage.removeItem(STORAGE.JWT);
    localStorage.removeItem(STORAGE.USER);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used inside AuthProvider');

  return context;
}

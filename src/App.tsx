import React from 'react';
import Login from 'pages/Login';
// import Dashboard from './pages/Dashboard';

import GlobalStyle from './styles/global';
import AppProviders from './modules';

const App: React.FC = () => {
  return (
    <AppProviders>
      <Login />
      <GlobalStyle />
    </AppProviders>
  );
};

export default App;

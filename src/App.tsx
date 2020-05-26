import React from 'react';
import GlobalStyle from './styles/global';
import Dashboard from './pages/Dashboard';

import AppProviders from './modules';

const App: React.FC = () => {
  return (
    <AppProviders>
      <Dashboard />
      <GlobalStyle />
    </AppProviders>
  );
};

export default App;

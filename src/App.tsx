import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import DestinyManager from 'modules/DestinyManager';

import Routes from './routes';

import GlobalStyle from './styles/global';
import AppProviders from './modules';

const App: React.FC = () => {
  return (
    <AppProviders>
      <Router>
        <DestinyManager>
          <Routes />
        </DestinyManager>
      </Router>
      <GlobalStyle />
    </AppProviders>
  );
};

export default App;

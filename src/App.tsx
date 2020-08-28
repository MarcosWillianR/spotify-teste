
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import GlobalStyles from './styles/global';

import AppProvider from './hooks';

declare global {
  interface Window { Spotify: any; }
}

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  );
};

export default App;

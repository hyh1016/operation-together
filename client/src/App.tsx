import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/global';
import './style/global-style.css';
import theme from './style/theme';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { AppStateProvider } from 'stores/App';
import theme from 'utils/theme';
import { GlobalStyle } from 'utils/theme';

import Home from 'views/Home';
import 'reset.css';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </AppStateProvider>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

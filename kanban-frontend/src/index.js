import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import { ThemeProvider } from './ThemeContext';  // Import ThemeProvider

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>  {/* Wrap the app with ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

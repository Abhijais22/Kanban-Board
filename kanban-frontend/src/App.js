import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskBoard from './components/TaskBoard';
import TaskDetails from './components/TaskDetails';
import { useTheme } from './ThemeContext';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Router>
        {/* Toggle Theme Button */}
        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: theme === 'light' ? '#007bff' : '#444',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Toggle Theme
        </button>

        <h1>{theme === 'light' ? 'Light Theme' : 'Dark Theme'}</h1>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/board" element={<TaskBoard />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

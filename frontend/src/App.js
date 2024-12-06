import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';

const App = () => {

  return (
    <div className="App" style={{ display: 'flex' }}>
      <Router>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;

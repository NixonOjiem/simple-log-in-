import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

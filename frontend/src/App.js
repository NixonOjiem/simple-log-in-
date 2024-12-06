import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';
import LeftNavigation from './components/LeftNavigation';
import RightNavigation from './components/RightNavigation';

const App = () => {
  const [content, setContent] = useState('Click on an item to display content here.');

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="App" style={{ display: 'flex' }}>
      <Router>
        <LeftNavigation onContentChange={handleContentChange} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<SignIn />} />
          </Routes>
          <RightNavigation content={content} />
        </div>
      </Router>
    </div>
  );
};

export default App;

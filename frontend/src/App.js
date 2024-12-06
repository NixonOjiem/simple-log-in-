import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';

const App= ()=> {

  const [content, setContent] = useState('Click on an item to display content here.'); 
  const handleContentChange = (newContent) => { setContent(newContent); };

  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/signin" element={<SignIn onContentChange= {handleContentChange}/>} />
        <Route path="/home" element={<HomePage onContentChange= {handleContentChange}/>} />
        <Route path="/" element={<SignIn onContentChange= {handleContentChange}/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

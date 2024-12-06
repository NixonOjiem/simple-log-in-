import Header from './Header';
import React, { useState } from 'react';
import LeftNavigation from './LeftNavigation'
import RightNavigation from './RightNavigation';

const HomePage = () => {

  const [content, setContent] = useState(<div> 
    <h1>QuizQuest</h1>
    <p>Enjoy Anime and Trivia questions, check the leader board to know your rank.</p>
    </div>);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className='Hompage-Container'>
      <Header />
      <LeftNavigation onContentChange={handleContentChange} />
      <RightNavigation content={content} />
    </div>
  );
};

export default HomePage;
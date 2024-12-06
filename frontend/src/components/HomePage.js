import Header from './Header';
import React, { useState } from 'react';
import LeftNavigation from './LeftNavigation'
import RightNavigation from './RightNavigation';

const HomePage = () => {

  const [content, setContent] = useState('Click on an item to display content here.');

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
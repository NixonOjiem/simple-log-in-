import React from 'react';
import Header from './Header';
import LeftNavigation from './LeftNavigation';
import RightNavigation from './RightNavigation';

const HomePage = () => {
  return (
    <div className='Hompage-Container'>
      <Header />
      <LeftNavigation />
      <RightNavigation />
    </div>
  );
};

export default HomePage;
import React from 'react';
import AnimeQuiz from './AnimeQuiz';
import RandomQuiz from './RandomQuiz';
import History from './History';
import UserRanking from './UserRanking';
import Scores from './Scores';

const LeftNavigation = ({ onContentChange }) => {
  // console.log('onContentChange:', onContentChange);
  return (
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox" />
      <div id="nav-header">
        <a id="nav-title">
          Q<i className="fab fa-codepen"></i>uizQuest
        </a>
        <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label>
        <hr />
      </div>
      <div id="nav-content">
        <div className="nav-button" onClick={() => onContentChange(<AnimeQuiz />)}>
          <i className="fas fa-palette"></i>
          <span>Anime Quiz</span>
        </div>
        <div className="nav-button" onClick={() => onContentChange(<RandomQuiz />)}>
          <i className="fas fa-thumbtack"></i>
          <span>Random Quiz</span>
        </div>
        <div className="nav-button" onClick={() => onContentChange(<History />)}>
          <i className="fas fa-images"></i>
          <span>History Quiz</span>
        </div>
        <hr />
        {/* <div className="nav-button" onClick={() => onContentChange('Content for quiz history')}>
          <i className="fas fa-heart"></i>
          <span>Quiz History</span>
        </div> */}
        <div className="nav-button" onClick={() => onContentChange(<UserRanking />)}>
          <i className="fas fa-chart-line"></i>
          <span>User Ranking</span>
        </div>
        <div className="nav-button" onClick={() => onContentChange(<Scores />)}>
          <i className="fas fa-fire"></i>
          <span>Scores</span>
        </div>
        <div className="nav-button" onClick={() => onContentChange('TBD content')}>
          <i className="fas fa-magic"></i>
          <span>TBD</span>
        </div>
        <hr />
        <div className="nav-button" onClick={() => onContentChange('Content by Nixon Ojiem')}>
          <i className="fas fa-gem"></i>
          <span>By Nixon Ojiem</span>
        </div>
        <div id="nav-content-highlight"></div>
      </div>
    </div>
  );
};

export default LeftNavigation;

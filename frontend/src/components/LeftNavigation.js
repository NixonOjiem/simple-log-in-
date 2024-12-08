import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnimeQuiz from './AnimeQuiz';
import RandomQuiz from './RandomQuiz';
import History from './History';
import UserRanking from './UserRanking';
import Scores from './Scores';
import { faOtter } from '@fortawesome/free-solid-svg-icons';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faShieldDog } from '@fortawesome/free-solid-svg-icons';
import AnimalQuiz from './AnimalQuiz';


const LeftNavigation = ({ onContentChange }) => {
  // console.log('onContentChange:', onContentChange);
  return (
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox" />
      <div id="nav-header">
        <a id="nav-title">
          QuizQuest
        </a>
        <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label>
        <hr />
      </div>
      <div id="nav-content">
        <div className="nav-button" onClick={() => onContentChange(<AnimeQuiz />)}>
        <FontAwesomeIcon icon={faOtter} className='LeftIcons'/>
          <span>Anime Quiz</span>
        </div>
        <div className="nav-button" onClick={() => onContentChange(<RandomQuiz />)}>
        <FontAwesomeIcon icon={faShuffle} className='LeftIcons' />
          <span>Random Quiz</span>
        </div>
        <div className="nav-button" onClick={() => onContentChange(<History />)}>
        <FontAwesomeIcon icon={faClockRotateLeft} className='LeftIcons' />
          <span>History Quiz</span>
        </div>
        
        <div className="nav-button" onClick={() => onContentChange(<AnimalQuiz />)}>
          <FontAwesomeIcon icon = {faShieldDog} className='LeftIcons' />
          <span>Animal Quiz</span>
        </div>
        <hr />
        <div className="nav-button" onClick={() => onContentChange(<UserRanking />)}>
         <FontAwesomeIcon icon={faRankingStar} className='LeftIcons' />
         <span>User Ranking</span>
        </div>
        <div className="nav-button" onClick={() => onContentChange(<Scores />)}>
          <FontAwesomeIcon icon={faStarHalfStroke} className='LeftIcons' />
          <span>Scores</span>
        </div>
        {/* <div className="nav-button" onClick={() => onContentChange('TBD content')}>
          <i className="fas fa-magic"></i>
          <span>TBD</span>
        </div> */}
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

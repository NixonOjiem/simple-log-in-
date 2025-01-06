import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
 // Make sure to import the CSS file

const UserRanking = () => {
  const storedUserId = localStorage.getItem('userId');
  const [historyRanking, setHistoryRanking] = useState([]);
  const [error, setError] = useState(null);
  const userName = localStorage.getItem('username');

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get('http://localhost:3001/history-ranking'); // Ensure this URL is correct
        setHistoryRanking(response.data);
      } catch (err) {
        setError('Error fetching ranking data');
        console.error('Error fetching ranking data:', err);
      }
    };

    if (storedUserId) {
      fetchRanking();
    }
  }, [storedUserId]);

  return (
    <div>
      <h1>User Ranking in History</h1>
      {console.log(userName)}
      {error && <p>{error}</p>}
      <ol>
        
        {historyRanking.map((user, index) => (
          <li
            key={index}
            className={user.user_id.toString() === storedUserId ? 'highlight' : ''}
          >
            {index+1}{/*user.user_id*/}: {user.score}
            
          </li>
        ))}
        
      </ol>
    </div>
  );
};

UserRanking.propTypes = {
  storedUserId: PropTypes.string,
};

export default UserRanking;
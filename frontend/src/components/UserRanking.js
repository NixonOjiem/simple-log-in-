import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserRanking = () => {
  const storedUserId = localStorage.getItem('userId');
  const [historyRanking, setHistoryRanking] = useState([]);

  useEffect(() => {
    if (storedUserId) {
      // Fetch ranking from history quiz
      axios.get('/hstory-ranking')
        .then(response => {
          setHistoryRanking(response.data);
        })
        .catch(error => {
          console.error('Error fetching ranking data:', error);
        });
    }
  }, [storedUserId]);

  return (
    <div>
      <h1>User Ranking</h1>
      <ul>
        {historyRanking.map((user, index) => (
          <li key={index}>
            {user.username}: {user.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRanking;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const UserRanking = () => {
  const storedUserId = localStorage.getItem('userId');
  const [historyRanking, setHistoryRanking] = useState([]);
  const [error, setError] = useState(null);

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
      <h1>User Ranking</h1>
      {error && <p>{error}</p>}
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

UserRanking.propTypes = {
  storedUserId: PropTypes.string,
};

export default UserRanking;
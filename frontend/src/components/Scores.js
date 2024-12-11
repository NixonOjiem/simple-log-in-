import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Scores = () => {
  const [data, setData] = useState([]);
  const storedUserId = localStorage.getItem('userId');

  useEffect(() => {
    console.log('Stored userId:', storedUserId); // Log the userId from localStorage

    if (storedUserId) {
      axios.get(`http://localhost:3001/animalquiz-results/${storedUserId}`)
        .then(response => {
          console.log('Data fetched:', response.data); // Log the data to check its structure
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [storedUserId]);

  return (
    <div>
      <h1>Scores</h1>
      <ul>
        {data.map(item => (
          <li key={item.test_id}>{item.score} - {item.time}</li> // Ensure test_id is unique
        ))}
      </ul>
    </div>
  );
};

export default Scores;
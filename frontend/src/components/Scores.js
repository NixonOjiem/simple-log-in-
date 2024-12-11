import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Scores = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/animalquiz-results')
      .then(response => {
        console.log('Data fetched:', response.data); // Log the data to check its structure
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
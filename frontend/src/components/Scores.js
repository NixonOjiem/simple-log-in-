import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Scores = () => {
  const [animalQuizData, setAnimalQuizData] = useState([]);
  const [randomQuizData, setRandomQuizData] = useState([]);
  const [historyQuizData, setHistoryQuizData] = useState([]);
  const storedUserId = localStorage.getItem('userId');

  useEffect(() => {
    console.log('Stored userId:', storedUserId); // Log the userId from localStorage
  
    if (storedUserId) {
      // Fetch Animal Quiz results
      axios.get(`http://localhost:3001/animalquiz-results/${storedUserId}`)
        .then(response => {
          console.log('Animal Quiz Data fetched:', response.data); // Log the data to check its structure
          setAnimalQuizData(response.data);
        })
        .catch(error => {
          console.error('Error fetching Animal Quiz data:', error);
        });
  
      // Fetch Random Quiz results
      axios.get(`http://localhost:3001/random-quiz-results/${storedUserId}`)
        .then(response => {
          console.log('Random Quiz Data fetched:', response.data); // Log the data to check its structure
          setRandomQuizData(response.data);
        })
        .catch(error => {
          console.error('Error fetching Random Quiz data:', error);
        });
      axios.get(`http://localhost:3001/history-quiz-results/${storedUserId}`)
      .then(response => {
        console.log('History Quiz Data fetched:', response.data); // Log the data to check its structure
        setHistoryQuizData(response.data);
      })
      .catch(error => {
        console.error('Error fetching History Quiz data:', error);
      });
    }
  }, [storedUserId]);

  return (
    <div>
      <h1>Scores for Animal Quiz</h1>
      <ul>
        {animalQuizData.map(item => (
          <li key={item.test_id}>{item.score} - {item.time}</li> // Ensure test_id is unique
        ))}
      </ul>
      <h1>Scores for Random Quiz</h1>
      <ul>
        {randomQuizData.map(item => (
          <li key={item.test_id}>{item.score} - {item.time}</li> // Ensure test_id is unique
        ))}
      </ul>
      <h1>Scores for History Quiz</h1>
      <ul>
        {historyQuizData.map(item => (
          <li key={item.test_id}>{item.score} - {item.time}</li> //Ensure test ID is unique
        ))}
      </ul>
    </div>
  );
};

export default Scores;
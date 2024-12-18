import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const AnimeQuiz =()=> {
  const myAPI = "https://opentdb.com/api.php?amount=10&category=31&difficulty=medium&type=multiple";
      const [questions, setQuestions] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const [userAnswers, setUserAnswers] = useState({});
      const [score, setScore] = useState(null);
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('username');

      useEffect(()=> {
        const fetchQuestions = async () => {
          try {
              console.log('Fetching questions...'); // Log fetching start
              const response = await axios.get(myAPI);
              console.log('API Response:', response.data); // Log the API response
              if (response.data && response.data.results) {
                  const shuffledQuestions = response.data.results.map((question, index) => {
                      console.log(`Processing question ${index + 1}:`, question); // Log each question
                      const choices = [...question.incorrect_answers, question.correct_answer];
                      const shuffledChoices = choices.sort(() => Math.random() - 0.5);
                      console.log('Shuffled Choices:', shuffledChoices); // Log shuffled choices
                      return { ...question, shuffledChoices };
                  });
                  setQuestions(shuffledQuestions);
                  localStorage.setItem('animalQuizQuestions', JSON.stringify(shuffledQuestions)); // Store in local storage
              } else {
                  throw new Error('Invalid response format');
              }
          } catch (err) {
              setError('Error fetching data');
              console.error(err);
          } finally {
              setLoading(false);
          }
      };
      })

  return (
    <div>
        <h1>AnimeQuiz Content</h1>
        <p>
            lorem
        </p>
    </div>
  )
}

export default AnimeQuiz;
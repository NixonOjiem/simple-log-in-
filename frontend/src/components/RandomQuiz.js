import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RandomQuiz = () => {
  const myAPI = 'https://opentdb.com/api.php?amount=12&difficulty=medium';
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('begin fetching questions');
        const response = await axios.get(myAPI);
        console.log(response.data.results);

        if (response.data.results) {
          const shuffledQuestions = response.data.results.map((question, index) => {
            console.log(`processing question: ${index + 1}:`, question);
            const choices = [...question.incorrect_answers, question.correct_answer];
            const shuffledChoices = choices.sort(() => Math.random() - 0.5);
            console.log(`the shuffled choices are: ${shuffledChoices}`);
            return { ...question, shuffledChoices };
          });
          setQuestions(shuffledQuestions);
          localStorage.setItem('randomQuizQuestions', JSON.stringify(shuffledQuestions));
          console.log(`The stored data is: ${JSON.stringify(shuffledQuestions)}`);
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

    const storedRandomQuestions = localStorage.getItem('randomQuizQuestions');
    if (storedRandomQuestions) {
      console.log(`The local storage has these questions: ${storedRandomQuestions}`);
      console.log('Loading questions from local storage...');
      const parsedQuestions = JSON.parse(storedRandomQuestions);
      if (Array.isArray(parsedQuestions) && parsedQuestions.every(q => q !== null)) {
        const shuffledQuestions = parsedQuestions.map((question, index) => {
          if (!question.shuffledChoices) {
            const choices = [...question.incorrect_answers, question.correct_answer];
            question.shuffledChoices = choices.sort(() => Math.random() - 0.5);
          }
          return question;
        });
        setQuestions(shuffledQuestions);
      } else {
        console.error('Invalid questions format in local storage');
        localStorage.removeItem('randomQuizQuestions'); // Clear invalid data
        fetchQuestions();
      }
      setLoading(false);
    } else {
      console.log('Fetching questions from API...');
      fetchQuestions();
    }
  }, []);

  return (
    <div>
      <h1>RandomQuiz</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <h2>{question.question}</h2>
              <ul>
                {question.shuffledChoices && question.shuffledChoices.map((choice, i) => (
                  <li key={i}>{choice}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RandomQuiz;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnimeQuiz = () => {
  const myAPI = "https://opentdb.com/api.php?amount=10&category=31&difficulty=medium&type=multiple";
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
        console.log('Fetching questions...');
        const response = await axios.get(myAPI);
        console.log('API Response:', response.data);
        if (response.data && response.data.results) {
          const shuffledQuestions = response.data.results.map((question, index) => {
            console.log(`Processing question ${index + 1}:`, question);
            const choices = [...question.incorrect_answers, question.correct_answer];
            const shuffledChoices = choices.sort(() => Math.random() - 0.5);
            console.log('Shuffled Choices:', shuffledChoices);
            return { ...question, shuffledChoices };
          });
          setQuestions(shuffledQuestions);
          localStorage.setItem('animeQuizQuestions', JSON.stringify(shuffledQuestions));
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

    const storedQuestions = localStorage.getItem('animeQuizQuestions');
    if (storedQuestions) {
      console.log('Loading from local storage...');
      const parsedQuestions = JSON.parse(storedQuestions);
      const shuffledQuestions = parsedQuestions.map((question, index) => {
        if (!question.shuffledChoices) {
          const choices = [...question.incorrect_answers, question.correct_answer];
          question.shuffledChoices = choices.sort(() => Math.random() - 0.5);
        }
        return question;
      });
      setQuestions(shuffledQuestions);
      setLoading(false);
    } else {
      console.log('Checked local storage for questions, none were found...');
      console.log('Fetching questions from API...');
      fetchQuestions();
    }
  }, []);

  const handleAnswerChange = (index, choice) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [index]: choice
    }));
  };

  const handleSubmit = async () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct_answer) {
            correctAnswers += 1;
        }
    });
    const percentageScore = (correctAnswers / questions.length) * 100;
    setScore(percentageScore);

     try{
          await axios.post('http://localhost:3001/anime-quiz-results',{
            userId: localStorage.getItem('userId'), // Assuming the userId is stored in localStorage
            score: percentageScore
            
          });
          alert('Results posted');
         }
         catch (error){
            console.error('Error submitting results:', error);
            alert('Failed to post results');
         }
};  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log('Questions:', questions);

  return (
    <div>
      <h1>Anime Quiz</h1>
      {questions.map((question, index) => (
        <div key={index} className='Question-Container'>
          <p className='Questions'><b>{index+1}. </b>{question.question}</p>
          {question.shuffledChoices.map((choice, i) => (
            <div key={i} className='Anime-Choice'>
              <input
                type="radio"
                name={`question-${index}`}
                value={choice}
                onChange={() => handleAnswerChange(index, choice)}
                className='Anime-choices'
              />
              {choice}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className='btn'>Submit</button>
      {score !== null && <p>Your score: {score.toFixed(2)}%</p>}
    </div>
  );
};

export default AnimeQuiz;
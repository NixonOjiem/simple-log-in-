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
                    localStorage.setItem('animeQuizQuestions', JSON.stringify(shuffledQuestions)); // Store in local storage
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

      //check local storage for questions
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
          console.log()
          setQuestions(shuffledQuestions);
          setLoading(false); // No need to show loading if we have data
      } else {
          console.log('Checked local storage for questions, none were found...');
          console.log('Fetching questions from API...');
          fetchQuestions();
      }
      }, []);

      const handleAnswerChange = ()=> {}
      setUserAnswers({
      
      });

      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error}</p>;
      
      console.log('Questions:', questions);

     return (
<div>
        <h1>Anime Quiz</h1>
        {questions.map((question, index) => (
            <div key={index}>
                <h2>{question.question}</h2>
                {question.shuffledChoices.map((choice, i) => (
                    <div key={i}>
                        <input
                            type="radio"
                            name={`question-${index}`}
                            value={choice}
                            onChange={() => handleAnswerChange(index, choice)}
                        />
                        {choice}
                    </div>
                ))}
            </div>
        ))}
    </div>
  )
}

export default AnimeQuiz;
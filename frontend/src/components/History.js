import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History=()=> {
  const myAPI = "https://opentdb.com/api.php?amount=12&category=23&difficulty=medium&type=multiple";
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
          console.log('Begin fetching of questions');
          const response = await axios.get(myAPI);
          console.log(response.data.results);

          if (response.data.results){
            const shuffledQuestions = response.data.results.map((question, index)=>{
              console.log(`processing question: ${index+1}: `, question);
              const choices = [...question.incorrect_answers, question.correct_answer];
              const shuffledChoices = choices.sort(() => Math.random() - 0.5);
              console.log(`the shuffled choices are: ${shuffledChoices}`);
              return{...question, shuffledChoices};
            });
            setQuestions(shuffledQuestions);
            localStorage.setItem('historyQuiz', JSON.stringify(shuffledQuestions));
            console.log(`The stored data is: ${JSON.stringify(shuffledQuestions)}`);
          }else{
            throw new Error('Invalid response format');
          }
        }catch (err){
          setError('Error fetching data');
          console.error(err);
        }finally{
          setLoading(false);
        }
      };

      const storedHistoryQuestions = localStorage.getItem('historyQuiz');
      if (storedHistoryQuestions) {
        console.log(`The local storage has these questions: ${storedHistoryQuestions}`);
        console.log('Loading questions from local storage...');
        const parsedQuestions = JSON.parse(storedHistoryQuestions);
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
        localStorage.removeItem('historyQuiz'); // Clear invalid data
        fetchQuestions();
        }
        setLoading(false);
      }else{
        console.log(`Fetching questions from API...`);
        fetchQuestions();
      }
    }, []); // Empty dependency array to run only once on mount
  return (
    <div>
      <h1>History of Quiz</h1>
      <p>Lorem</p>
      
    </div>
  )
}

export default History
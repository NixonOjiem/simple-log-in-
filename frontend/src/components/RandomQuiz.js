import axios from 'axios';
import React, { useEffect, useState } from 'react'

const RandomQuiz=()=> {
  const myAPI= 'https://opentdb.com/api.php?amount=12&difficulty=medium';
  const [questions, setQuestions] =useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username')

  useEffect (()=> {
    const fetchQuestions = async () =>{
      try {
        console.log('begin fetching questions');//log out to the console that we are about to start fetching questions
        const response = await axios.get(myAPI);
        console.log(response.data.results);
        //lets shuffle the choices in the multiple choice questions before displaying them
        if(response.data.results){
          const shuffledQuestions = response.data.results.map((question, index) => {
          console.log(`processing question: ${index +1}:`, question); //just logging each question
          const choices = [...question.incorrect_answers, question.incorrect_answers];//storing the correct and incorrect answer
          const shuffledChoices = choices.sort(() => Math.random() - 0.5);
          console.log(`the shuffled choices are: ${shuffledChoices}`);//log to the console the shuffled choices
        });
        setQuestions(shuffledQuestions);
        localStorage.setItem('randomQuizQuestions', JSON.stringify(shuffledQuestions)); // Store in local storage
      }else{
        throw new Error('Invalid response format');
        }
    }catch (err){
      setError('Error fetching data');
      console.error(err);
    } finally{
      setLoading(false);
    }
    
  };
  // Check local storage for questions
  const storedQuestions = localStorage.getItem('randomQuizQuestions');
  if (storedQuestions) {
      console.log('Loading questions from local storage...'); // Log loading from local storage
      const parsedQuestions = JSON.parse(storedQuestions);
      const shuffledQuestions = parsedQuestions.map((question, index) => {
          if (!question.shuffledChoices) {
              const choices = [...question.incorrect_answers, question.correct_answer];
              question.shuffledChoices = choices.sort(() => Math.random() - 0.5);
          }
          return question;
      });
      setQuestions(shuffledQuestions);
      setLoading(false); // No need to show loading if we have data
  } else {
      console.log('Fetching questions from API...'); // Log fetching from API
      fetchQuestions(); // Fetch from API if no data in local storage
  }
}, []);

  
  

  return (
    <div>
        <h1>RandomQuiz</h1>
        <p>Lorem</p>
    </div>
  )
}

export default RandomQuiz;
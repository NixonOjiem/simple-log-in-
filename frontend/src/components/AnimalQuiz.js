import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnimalQuiz = () => {
    const myAPI = 'https://opentdb.com/api.php?amount=12&category=27&type=multiple';
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username')

    useEffect(() => {
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

        // Check local storage for questions
        const storedQuestions = localStorage.getItem('animalQuizQuestions');
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

    const handleAnswerChange = (questionIndex, choice) => {
        setUserAnswers({
            ...userAnswers,
            [questionIndex]: choice,
        });
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
              await axios.post('http://localhost:3001/animal-results',{
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

    console.log('User ID:', userId);
    console.log(username);
    console.log('Questions:', questions); // Log questions

    return (
        <div>
            <h1>Animal Trivia Questions</h1>
            {questions.length > 0 ? (
                questions.map((question, index) => (
                    <div key={index} className='Question-Container'>
                        <p className='Questions'><b>{index + 1}. </b> {question.question}</p>
                        <ul className='multiple-choice'>
                            {question.shuffledChoices && question.shuffledChoices.map((choice, i) => (
                                <li key={i} className='List-of-Choices'>
                                    <input 
                                        type="radio" 
                                        name={`question-${index}`} 
                                        value={choice} 
                                        onChange={() => handleAnswerChange(index, choice)}
                                    />
                                    {choice}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No questions available</p>
            )}
            <button onClick={handleSubmit} className='btn'>Submit</button>
            {score !== null && <p>Your score: {score.toFixed(2)}%</p>}
        </div>
    );
};

export default AnimalQuiz;
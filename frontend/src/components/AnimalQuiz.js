import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnimalQuiz = () => {
    const myAPI = 'https://opentdb.com/api.php?amount=12&category=27&type=multiple';
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(myAPI);
                setQuestions(response.data.results);
                localStorage.setItem('animalQuizQuestions', JSON.stringify(response.data.results)); // Store in local storage
                console.log(response.data.results);
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        // Check local storage for questions
        const storedQuestions = localStorage.getItem('animalQuizQuestions');
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions)); // Load from local storage
            setLoading(false); // No need to show loading if we have data
        } else {
            fetchQuestions(); // Fetch from API if no data in local storage
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Animal Trivia Questions</h1>

            <ul className='List-Of-Questions'>
                {questions.map((question, index) => (
                    
                    <li key={index}>{question.question} {question.incorrect_answers}</li>
                       
                ))}
            </ul>
        </div>
    );
};

export default AnimalQuiz;
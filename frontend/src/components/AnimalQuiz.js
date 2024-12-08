import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnimalQuiz= ()=> {
    const myAPI = 'https://opentdb.com/api.php?amount=12&category=27&type=multiple';
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(myAPI);
                setQuestions(response.data);
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

  return (
    <div>
    <h1>Animal Questions</h1>
    <ul>
        {questions.map((question) => (
            <li key={question.id}>{question.text}</li>
        ))}
    </ul>
</div>
  )
}

export default AnimalQuiz;
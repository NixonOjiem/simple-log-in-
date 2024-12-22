console.log('Starting server...');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'testinstance',
  port: 3307 // Add this line to specify the port
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Sign-in endpoint
app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT id, username FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length > 0) {
      const user_id = results[0].id;
      res.status(200).json({ message: 'Sign in successful', userId: user_id });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Sign-up endpoint
app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;
  const checkUserSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserSql, [email], (err, results) => {
    if (err) {
      return res.status(500).send('Error checking email');
    }
    if (results.length > 0) {
      return res.status(400).send('Email already exists');
    }
    const insertUserSql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(insertUserSql, [username, password, email], (err, result) => {
      if (err) {
        return res.status(500).send('Error signing up');
      }
      res.send('User registered successfully');
    });
  });
});

// Post animal quiz endpoint
app.post('/animal-results', (req, res) => {
  const { userId, score } = req.body;
  console.log('Received userId:', userId); // Add this line
  const query = 'INSERT INTO animal_quiz_scores (user_id, score, date, time) VALUES (?, ?, CURDATE(), NOW())';
  db.query(query, [userId, score], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Results saved!');
  });
});

// Collecting data from animal_quiz table endpoint
app.get('/animalquiz-results/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  console.log('Fetching results for user_id:', user_id); // Add this line
  db.query('SELECT test_id, score, time FROM animal_quiz_scores WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

//post random questions results endpoint
app.post('/random-quiz-results', (req, res) => {
  const{userId, score} = req.body;
  const query = 'INSERT INTO random_quiz_scores (user_id, score, date, time) VALUES (?,?, CURDATE(), NOW())';
  db.query(query, [userId, score], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Results Saved!');
  });
});

// collecting data from random_quiz endpoint
app.get('/random-quiz-results/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  db.query('SELECT test_id, score, time FROM random_quiz_scores WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

//Posting data odf anime quiz endpoint
app.post('/anime-quiz-results', (req, res) => {
  const{userId, score} = req.body;
  const query = 'INSERT INTO anime_quiz_scores (user_id, score, date, time) VALUES (?,?, CURDATE(), NOW())';
  db.query(query, [userId, score], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Results Saved!');
  });
});

//collect question results of anime quiz
app.get('/anime-quiz-results', (req, res) => {
  const user_id = req.query.user_id;
  db.query('SELECT test_id, score, time FROM anime_quiz_scores WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).send('Error fetching data!');
      return;
    }
    res.json(results);
  });
});

//posting history quiz endpoint
app.post('/history-quiz-results', (req, res) => {
  const { userId, score } = req.body;
  const query = 'INSERT INTO history_quiz_scores (user_id, score, date, time) VALUES (?,?,CURDATE(), NOW())';
  db.query(query, [userId, score], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Results Saved!');
  });
});

//collecting history quiz results from server
app.get('/history-quiz-results/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  console.log('Fetching data for user_id: ', user_id)
  db.query('SELECT test_id, score, time FROM history_quiz_scores WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).send('Error fetching data!');
      return;
    }
    res.json(results);
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

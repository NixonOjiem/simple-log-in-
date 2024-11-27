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
    database: 'testinstance'
});

db.connect(err => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });
  
  app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.length > 0) {
        res.status(200).send('Sign in successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
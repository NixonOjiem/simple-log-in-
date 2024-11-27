const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;

// Middleware to parse JSON
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
    if (err) throw err;
    console.log('Connected to MySQL Database');
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
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}}`);
  });
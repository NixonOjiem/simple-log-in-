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
  

  //sign-in endpoint
  app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT id, username FROM users WHERE username = ? AND password = ?';

    
    db.query(query, [username, password], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.length > 0) {
        const user_id = results[0].id;
        // console.log(user_id);
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
        return res.status(400).send('email already exists');
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
  
  app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// MySQL connection (XAMPP)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Default XAMPP password is empty
  database: 'shoppingList' // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

/*app.post('/register', (req, res) => {

  const userName=req.body.userName
  const password=req.body.password

  db.query("INSERT INTO users (idUser, nameUser, passwordUser) VALUES ('5' ,?, ?) ", 
    [userName,password]
    ,(err, results) => {
    if (err) {
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});*/


app.post('/register', (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).send('Missing username or password');
  }

  const query= "INSERT INTO `users` (`idUser`, `nameUser`, `passwordUser`) VALUES (NULL,?, ?)";
  //const query1 = "INSERT INTO users (nameUser, passwordUser) VALUES (?, ?)";
  
  db.query(query, [userName, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Database error');
    }
    console.log("user add ")
    res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

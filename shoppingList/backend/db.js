const mysql = require('mysql');

// create Connection to db called appShoppingList
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appShoppingList'
});


//Connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = db;

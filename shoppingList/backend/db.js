const mysql = require('mysql2');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'appShoppingList'
// });
// const db = mysql.createConnection({
//   host: "gateway01.eu-central-1.prod.aws.tidbcloud.com",
//   port: 4000,
//   user: "2nNqDAEUMbKA84E.root",
//   password: "j0zjrPLadYeg4k3x",
//   database: "test", // זה הדאטה-בייס שנוצר לך אוטומטית
//   ssl: {
//     minVersion: 'TLSv1.2',
//     rejectUnauthorized: true
//   }
// });

// const db = mysql.createConnection({
//   host: "gateway01.eu-central-1.prod.aws.tidbcloud.com",
//   port: 4000,
//   user: "2nNqDAEUMbKA84E.root",
//   password: "j0zjrPLadYeg4k3x",
//   database: "test",
//   ssl: {
//     minVersion: 'TLSv1.2',
//     rejectUnauthorized: false // Change this to false temporarily to debug
//   },
//   connectTimeout: 10000 // Increase timeout to 10 seconds to give it more time
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err.stack);
//     return;
//   }
//   console.log('✅ Connected to MySQL database');
// });

const db = mysql.createPool({ 
  host: "gateway01.eu-central-1.prod.aws.tidbcloud.com",
  port: 4000,
  user: "2nNqDAEUMbKA84E.root",
  password: "j0zjrPLadYeg4k3x",
  database: "test",
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: false 
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// THIS BLOCK ONLY WORKS WITH createPool
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL database via Pool');
    connection.release(); 
  }
});


module.exports = db;

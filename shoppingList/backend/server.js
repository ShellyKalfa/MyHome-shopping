const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const db = require('./db');

const app = express();
const PORT = 5000;

const userRoutes = require('./routes/userRoutes');
const familyRoutes = require('./routes/familyRoutes');


// Middleware
app.use(cors());
app.use(express.json());


app.use('/Family', familyRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log("Server running at http://localhost:5000");
});

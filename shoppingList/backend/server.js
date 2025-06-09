const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const db = require('./db');

const app = express();
const PORT = 5000;

const userRoutes = require('./routes/userRoutes');
const familyRoutes = require('./routes/familyRoutes');
const shoppingRoutes = require('./routes/shoppingRoutes');
const WhatsAppRoutes = require('./routes/WhatsAppRoutes');


// Middleware
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/Family', familyRoutes);
app.use('/Shopping', shoppingRoutes);
app.use('/WhatsApp', WhatsAppRoutes);

app.listen(PORT, () => {
  console.log("Server running at http://localhost:5000");
});

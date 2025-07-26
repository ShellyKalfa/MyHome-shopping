// main server handles routing
const express = require('express'); //import Express.js framework
const mysql = require('mysql'); //mysql connection
const cors = require('cors');

const db = require('./db'); //database connection

const app = express(); // Create Express app
const PORT = 5000;  // Define port number for the server

// Route Modules
const userRoutes = require('./routes/userRoutes'); // Routes for user
const familyRoutes = require('./routes/familyRoutes'); // Routes for family 
const shoppingRoutes = require('./routes/shoppingRoutes');  // Routes for hopping
const WhatsAppRoutes = require('./routes/WhatsAppRoutes'); // Routes for WhatsApp


// Middleware Configuration
app.use(cors());
app.use(express.json());

// Route Handlers
app.use('/users', userRoutes);
app.use('/Family', familyRoutes);
app.use('/Shopping', shoppingRoutes);
app.use('/WhatsApp', WhatsAppRoutes);

//Start Server
app.listen(PORT, () => {
  console.log("Server running at http://localhost:5000");
});

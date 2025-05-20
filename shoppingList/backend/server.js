const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
const e = require('express');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection (example)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appShoppingList'
});

//--------------------------------- ADDED BY IDO -----------------------------------
db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL database');
});

// Get all items form item DB
app.get('/item', (req, res) => {
  db.query('SELECT * FROM item', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add a new fruit with quantity
app.post('/item', (req, res) => {
  const { itemName, quantity = 1, price = 0 } = req.body; // default quantity to 1 if not provided
  if (!itemName) return res.status(400).json({ error: 'Fruit itemName is required' });
  console.log("IDO");


  // Check for duplicates (case insensitive)
  db.query(
    'SELECT * FROM item WHERE LOWER(itemName) = LOWER(?)',
    [itemName],
    (err, results) => {
      if (err) {console.log(err);
      return res.status(500).json({ error: err });}
      if (results.length > 0) {
        return res.status(400).json({ error: 'Fruit already exists' });
      }

      // No duplicates found, insert new fruit
      db.query(
        'INSERT INTO item (itemName, quantity, price, listId) VALUES (?, ?, ?, 1)',
        [itemName, quantity, price],
        (err, result) => {
          if (err) {console.log(err);return res.status(500).json({ error: err });}
          res.json({ message: 'Fruit added!', itemId: result.insertItemId });
        }
      );
    }
  );
});


// Delete a fruit by itemId
app.delete('/item/:itemId', (req, res) => {
  const { itemId } = req.params;
  db.query('DELETE FROM item WHERE itemId = ?', [itemId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'item deleted!' });
  });
});

// Update fruit completed status by itemId
app.patch('/item/:itemId', (req, res) => {  
  const { itemId } = req.params;
  const { completed } = req.body;

  // Update the completed status for the fruit with the given itemId
  db.query('UPDATE item SET completed = ? WHERE itemId = ?', [completed, itemId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Fruit not found' });
    res.json({ message: 'Fruit updated successfully!' });
  });
});

// Receive number selection from dropdown
app.patch('/item/:itemId/quantity', (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  if (typeof quantity !== 'number') {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  db.query('UPDATE item SET quantity = ? WHERE itemId = ?', [quantity, itemId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Fruit not found' });
    res.json({ message: 'Quantity updated' });
  });
});


//--------------------------------- ADDED BY IDO FINISHED-----------------------------------


app.get('/users', (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Fetch users failed:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    return res.json({ success: true, users: data });
  });
});



// Login route
app.post('/login', (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  const values = [req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Login Failed:", err);
      return res.status(500).json("Login Failed");
    }

    if (data.length > 0) {
      console.log("✅ Login successful", data[0]);
      return res.json({ success: true, user: data[0] });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});



app.post('/signin', async (req, res) => {
  const { name, email, password } = req.body;

  // if (!name || !email || !password) {
  //   return res.status(400).json({ success: false, message: "All fields are required" });
  // }

  // Check if user already exists
  const checkUserSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserSql, [email], async (err, data) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (data.length > 0) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    try {

      // Insert new user
      const insertUserSql = "INSERT INTO users (userName, email, password) VALUES (?, ?, ?)";
      const values = [name, email, password ];

      db.query(insertUserSql, values, (err, result) => {
        if (err) {
          console.error("Error creating user:", err);
          return res.status(500).json({ success: false, message: "User creation failed" });
        }
          return res.status(201).json({
          success: true,
          message: "User registered successfully"
        });
      });
    } catch (error) {
      console.error("Hashing error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  });
});


app.post('/memberFamliy/:id', (req, res) => {
  const userId = req.params.id;
  const sql = `
    SELECT f.familyId, f.familyName 
    FROM memberFamily mf 
    JOIN family f ON mf.familyId = f.familyId 
    WHERE mf.userId = ?`;

  const values = [userId];
  console.log("userId",userId);
  db.query(sql, [userId], (err, data) => {
    if (err) {
      console.error("Login Failed:", err);
      return res.status(500).json("Login Failed");
    }

    if (data.length >= 0) {
      console.log(`✅ Login successful for member ID: ${userId}, data:`, data);
        console.log(`✅ Login successful for member ID: ${userId}`, data[0]);
        if(data.length > 0)
         {
              return res.json({ success: true, familyName: data });
         }
         else {
               return res.json({ success: true, familyName: null });
         }
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

app.post('/search', async (req, res) => {
  try {
    const response = await axios.post('https://www.rami-levy.co.il/api/catalog?', req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
    console.log(response.data);
  } catch (err) {
    res.status(500).send(err.message);
     console.log(err.message);
  }
});


app.post('/creatFamliy/:id', (req, res) => {
  const userId = req.params.id;
  const { nameFamliy, role } = req.body;

  const insertFamliySql = "INSERT INTO family (familyName) VALUES (?)";
  const insertFamliyValues = [nameFamliy];

  db.query(insertFamliySql, insertFamliyValues, (err, result) => {
    if (err) {
      console.error("Family Insert Failed:", err);
      return res.status(500).json({ success: false, message: "Family insert failed" });
    }

    const familyId = result.insertId;

    const insertMemberFamliySql = "INSERT INTO memberFamily (userId, familyId, role) VALUES (?, ?, ?)";
    const insertMemberFamliyValues = [userId, familyId, role || 'manager']; // default role

    db.query(insertMemberFamliySql, insertMemberFamliyValues, (err2) => {
      if (err2) {
        console.error("Member Insert Failed:", err2);
        return res.status(500).json({ success: false, message: "Member insert failed" });
      }

      return res.json({
        success: true,
        message: "Family and member created successfully",
        familyId,
        familyName: nameFamliy,
        userId,
        role: role || 'manager'
      });
    });
  });
});



app.listen(5001, () => {
    console.log("Server running at http://localhost:5001");
});

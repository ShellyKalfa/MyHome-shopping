const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
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



app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});

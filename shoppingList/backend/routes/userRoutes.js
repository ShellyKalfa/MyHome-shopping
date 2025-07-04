const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
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
router.post('/login', (req, res) => {
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

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

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
          const userId = result.insertId;
          return res.status(201).json({
          success: true,
          message: "User registered successfully",
          user: userId
        });
      });
    } catch (error) {
      console.error("Hashing error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  });
});

// google Auto2.0 login
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("460664212191-bnf64k7d5lok2kckohjdtafsr1egf7mf.apps.googleusercontent.com");

router.post('/google-login', (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ success: false, message: 'Missing email or name' });
  }

  // Check if user already exists
  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], (err, results) => {
    if (err) {
      console.error("Database error during Google login:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length > 0) {
      // User exists – return user
      return res.json({ success: true, user: results[0] });
    }

    // User does not exist – create a new one
    const insertSql = "INSERT INTO users (userName, email, password) VALUES (?, ?, ?)";
    const values = [name, email, "GOOGLE_AUTH"];

    db.query(insertSql, values, (err, insertRes) => {
      if (err) {
        console.error("Error inserting Google user:", err);
        return res.status(500).json({ success: false, message: "User creation failed" });
      }

      const newUser = {
        idUser: insertRes.insertId,
        userName: name,
        email: email,
        password: "GOOGLE_AUTH"
      };
      return res.json({ success: true, user: newUser });
    });
  });
});



module.exports = router;